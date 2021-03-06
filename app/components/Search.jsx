import React from 'react';
import {browserHistory} from 'react-router';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.onFormSubmit = this.onFormSubmit.bind(this)
    }
    onFormSubmit(e) {
        e.preventDefault();

        const artists = this.refs.artists.value.trim().split('\n');
        this.props.search(artists)
        browserHistory.push('/tracks');
        if(location.length > 0) {
            this.refs.artists.value = '';
            
        }
    }
    render() {
        return (
            <div className="row">
                <div className="columns medium-6 large-4 small-centered">
                    <form onSubmit={this.onFormSubmit}>
                        <div>
                            <h1 className="page-title">Track Generator</h1>
                            <label>
                                Enter artists whose track you want to generate
                                <textarea rows="5" placeholder="Enter artists on separate lines" ref="artists"></textarea>
                            </label>
                        </div>
                        <div>
                            <button className="button expanded">Generate</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default Search;