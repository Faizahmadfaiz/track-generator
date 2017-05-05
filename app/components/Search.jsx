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
            <div>
                <form onSubmit={this.onFormSubmit}>
                    <div>
                        <label>
                            Enter artists whose track you want to generate(atmost 5)
                            <textarea rows="5" placeholder="Enter artists on separate lines" ref="artists"></textarea>
                        </label>
                    </div>
                    <div>
                        <button className="button expanded">Generate</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default Search;