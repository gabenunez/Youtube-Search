import React from 'react';
import VideoListItem from './video_list_item';

const VideoList = (props) => {

    // videoItems = For each video in props, go through and return us a new array.
    const videoItems = props.videos.map((video) => {
        return (
        <VideoListItem 
            key={video.etag} 
            video={video} 
            onVideoSelect={props.onVideoSelect}/>
        )
    });

    return (
        // In a class-based component, props are available as this.props
        <ul className="col-md-4 list-group">
            {videoItems}
        </ul>
    );
};

export default VideoList;