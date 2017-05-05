import React from 'react';
import axios from 'axios';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tracks: [],
            isLoading: true
        }
    }

    millisToMinutesAndSeconds(millis) {
        let minutes = Math.floor(millis / 60000);
        let seconds = ((millis % 60000) / 1000).toFixed(0);
        return (seconds == 60 ? (minutes+1) + ":00" : minutes + ":" + (seconds < 10 ? "0" : "") + seconds);
    }

    getArtist(artist) {
        return axios.get(`https://api.spotify.com/v1/search?q=${artist}&type=artist`);
    }

    getArtists(artists) {
        return axios.all(artists.map(function(artist) {
            return this.getArtist(artist)
        }.bind(this))).then(function(info) {
            return info.map(function(artist) {
                return artist.data;
            })
        }).catch(function(error) {
            return ['false']
        })
    }

    getAlbums = function(artists) {
        let that = this;
        return axios.all(artists.map(function(artist) {
            return that.getAristsAlbums(artist.id)
        })).then(function(info) {
            let tracksInfo =  info
                .map(infoObj => infoObj.data.items)
                .reduce((prev, curr) => [...prev, ...curr], [])
                .map(album => that.getalbumTracks(album.id))

            that.getTracks(tracksInfo);
        })
    }

    getAristsAlbums(id) {
        return axios.get(`https://api.spotify.com/v1/artists/${id}/albums`);
    }

    getalbumTracks(id) {
        return axios.get(`https://api.spotify.com/v1/albums/${id}/tracks`);
    }

    getTracks(tracksInfo) {
        let tracks = tracksInfo.map((p) => {
            return p.then(function(obj) {
                return obj.data.items.map((tracksData) => {
                    let trackObj = {
                        "artist": tracksData.artists[0].name,
                        "trackName": tracksData.name,
                        "duration": tracksData.duration_ms
                    }
                    return trackObj
                })
            })
        })

        Promise.all(tracks).then((values) => {
            let totTracks = values.reduce((prev, curr) => [...prev, ...curr], [])
            let randomPlayList = this.getRandomTracks(100,totTracks);
            this.setState({
                isLoading: false,
                tracks:randomPlayList
            })
        })
    }

    getRandomTracks(num, tracks) {
	    const randomResults = [];
	    for(let i = 0; i < num; i++) {
		    randomResults.push(tracks[ Math.floor(Math.random() * tracks.length) ])
	    }
	    return randomResults;   
    }

    search(artists) {
        this.getArtists(artists)
            .then(function(artistsData) {   
                artists = artistsData.map(a => a.artists.items[0]);
                this.getAlbums(artists);
            }.bind(this))
            
    }

    render() {
        return (
            <div className="row">
                <div className="columns medium-6 large-4 small-centered">
                    {React.cloneElement(this.props.children, 
                                {search : this.search.bind(this), tracks: this.state.tracks, isLoading: this.state.isLoading})}
                </div>
            </div>
        )
    }
}

export default Main;