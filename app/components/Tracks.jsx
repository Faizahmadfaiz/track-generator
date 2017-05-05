import React from 'react';

class Tracks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            track: false,
            artist: true,
            duration: false,
            tracks: props.tracks
        }
    }

    clickHandler(e) {
        console.log(e.target.id)
        if(e.target.id == 'track') {
            if(this.state.track) {
                !this.state.track;
            }
        }
    }

    render() {
        let getRows = () => {
            return this.state.tracks.map((obj, index) => {
               return(
                    <tr key={index}>
                        <td>{index+1}</td>
                        <td>{obj.trackName}</td>
                        <td>{obj.artist}</td>
                        <td>{obj.duration}</td>
                </tr>
               )
            })
        }
        console.log(this.props.isLoading);
        console.log(this.state.tracks);
        if(this.props.isLoading) {
            return (
                <div className="row">
                    <div className="columns medium-6 large-4 small-centered">
                        <h4>Loading...</h4>
                    </div>
                </div>
            )
        }
        return (
            <div className="row">
                <div className="columns large-8 small-centered">
                    <table className="hover">
                        <thead>
                            <tr>
                                <th width="20">#</th>
                                <th width="150"><a id="track" onClick={this.clickHandler.bind(this)}>Track</a></th>
                                <th width="150"><a id="artist" onClick={this.clickHandler.bind(this)}>Artist</a></th>
                                <th width="150"><a id="duration" onClick={this.clickHandler.bind(this)}>Duration</a></th>
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

export default Tracks