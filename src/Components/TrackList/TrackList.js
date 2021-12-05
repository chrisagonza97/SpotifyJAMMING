import React from 'react';
import ReactDOM from 'react-dom';
import {Track} from '../Track/Track'
import './TrackList.css'

export class TrackList extends React.Component {
    
    render() {
        console.log(typeof this.props.tracks)
        console.log(this.props.tracks+": tracks val")
        return (
            <div className="TrackList">
                {
                    
                    this.props.tracks.map(track =>{
                         return <Track onAdd={this.props.onAdd} isRemoval={this.props.isRemoval} onRemove={this.props.onRemove} track={track} key ={track.id}  />
                    })
                }
                
            </div>
        )
    }
}