import React from 'react';

class Tracks extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        console.log(this.props.isLoading);
        console.log(this.props.tracks);
        return (
            <div className="row">
                <div className="columns medium-6 large-4 small-centered">
                    <table>
                        <thead>
                            <tr>
                                <th width="20">#</th>
                                <th width="150">Track</th>
                                <th width="150">Artist</th>
                                <th width="150">Duration</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <td>100</td>
                            <td>This is longer content Donec</td>
                            <td>Content Goes Here</td>
                            <td>Content Goes Here</td>
                            </tr>
                            <tr>
                            <td>10</td>
                            <td>This is longer Content </td>
                            <td>Content Goes Here</td>
                            <td>Content Goes Here</td>
                            </tr>
                            <tr>
                            <td>88</td>
                            <td>This is longer Content Goes </td>
                            <td>Content Goes Here</td>
                            <td>Content Goes Here</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default Tracks