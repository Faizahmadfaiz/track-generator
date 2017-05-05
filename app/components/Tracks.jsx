import React from 'react';

class Tracks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            track: false,
            artist: true,
            duration: false,
            tracks: props.tracks,
            isLoading: props.isLoading
        }
    }

    millisToMinutesAndSeconds(millis) {
        let minutes = Math.floor(millis / 60000);
        let seconds = ((millis % 60000) / 1000).toFixed(0);
        return (seconds == 60 ? (minutes+1) + ":00" : minutes + ":" + (seconds < 10 ? "0" : "") + seconds);
    }

    sortAscending(arr, keyVal) {
        if(keyVal == 'duration') {
            arr.sort(function (a, b) {
                return a[keyVal] - b[keyVal];
            });
            return arr;
        }

        arr.sort(function(a, b) {
            const valA = a[keyVal].toUpperCase(); 
            const valB = b[keyVal].toUpperCase(); 
            if (valA < valB) {
                return -1;
            }
            if (valA > valB) {
                return 1;
            }
            return 0;
        });

        return arr;
    }

    sortDecending(arr, keyVal) {
        if(keyVal == 'duration') {
            arr.sort(function (a, b) {
                return b[keyVal] - a[keyVal];
            });
            return arr;
        }
        else {
            arr.sort(function(a, b) {
                const valA = a[keyVal].toUpperCase(); 
                const valB = b[keyVal].toUpperCase(); 
                if (valA < valB) {
                    return 1;
                }
                if (valA > valB) {
                    return -1;
                }
                return 0;
            });

            return arr;
        }
    }

    handleTrackClick(e) {
        e.preventDefault();
        let sortedTracks = this.state.tracks;
        let status = this.state.track;

        if(status) {
            sortedTracks = this.sortAscending(sortedTracks, 'trackName');
        } else {
            sortedTracks = this.sortDecending(sortedTracks, 'trackName');
        }
        this.setState({
            tracks: sortedTracks,
            track: !status
        });   
    }

    handleArtistClick(e) {
        e.preventDefault();
        let sortedTracks = this.state.tracks;
        let status = this.state.artist;

        if(status) {
            sortedTracks = this.sortAscending(sortedTracks, 'artist');
        } else {
            sortedTracks = this.sortDecending(sortedTracks, 'artist');
        }
        this.setState({
            tracks: sortedTracks,
            artist: !status
        });

    }

    handleDurationClick(e) {
        e.preventDefault();
        let sortedTracks = this.state.tracks;
        let status = this.state.duration;

        if(status) {
            sortedTracks = this.sortAscending(sortedTracks, 'duration');
        } else {
            sortedTracks = this.sortDecending(sortedTracks, 'duration');
        }
        this.setState({
            tracks: sortedTracks,
            duration: !status
        });

    }


    componentWillReceiveProps(nextProps){
        this.setState({
            tracks: nextProps.tracks,
            isLoading: nextProps.isLoading
        });
    }

    render() {
        let getRows = () => {
            return this.state.tracks.map((obj, index) => {
               return(
                    <tr key={index}>
                        <td>{index+1}</td>
                        <td>{obj.trackName}</td>
                        <td>{obj.artist}</td>
                        <td>{this.millisToMinutesAndSeconds(obj.duration)}</td>
                </tr>
               )
            })
        }
        if(this.state.isLoading) {
            return (
                <div className="row">
                    <div className="columns medium-6 large-4 small-centered">
                        <h4>Loading...</h4>
                    </div>
                </div>
            )
        }
        else{
            return (
                <div className="row">
                    <div className="columns large-8 small-centered">
                        <a href="/">Go Back</a>
                        <table className="hover">
                            <thead>
                                <tr>
                                    <th width="20">#</th>
                                    <th width="150"><a id="track" onClick={this.handleTrackClick.bind(this)}>Track</a></th>
                                    <th width="150"><a id="artist" onClick={this.handleArtistClick.bind(this)}>Artist</a></th>
                                    <th width="150"><a id="duration" onClick={this.handleDurationClick.bind(this)}>Duration</a></th>
                                </tr>
                            </thead>
                            <tbody>
                                {getRows()}
                            </tbody>
                        </table>
                    </div>
                </div>
            )
        }
    }
}

export default Tracks