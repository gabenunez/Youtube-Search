import React, {Component} from 'react';
import _ from 'lodash';
import ReactDOM from 'react-dom';
import SearchBar from './components/search_bar';
import VideoDetail from './components/video_detail';
import VideoList from './components/video_list';
import YTSearch from 'youtube-api-search';

const API_KEY = '';

class App extends Component  {
    constructor(props) {
        super(props);

        // Sets the initial state
        this.state = { 
            videos: [],
            videoSelected: null
         }

        // Sets new state with new data, this works because it's auto-called in the constructor.
         this.videoSearch('pizza');
    }

    videoSearch(term) {
        YTSearch({key: API_KEY, term}, (videos) => {
            // this.SetState({videos: videos})
            this.setState({ 
                videos : videos,
                videoSelected : videos[0]
            });
        })
    }

    render() {
        // Limit how fast we can trigger a function, using Lodash!
        const searchForVideo = _.debounce( (term) => {this.videoSearch(term)}, 300 );

        return (
            // Provides components and sets props via videos={...}
            <div>
                <SearchBar 
                    onSearchChange={term => searchForVideo(term)}
                />
                <VideoDetail 
                    video={this.state.videoSelected}
                />
                <VideoList 
                    onVideoSelect={videoSelected => this.setState({videoSelected})}
                    videos={this.state.videos} 
                />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.querySelector('.container'));