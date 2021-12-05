import React from 'react';
import './Track.css'

export class Track extends React.Component {
    constructor(props){
        super(props)
        this.addTrack=this.addTrack.bind(this)
        this.removeTrack=this.removeTrack.bind(this)
    }
    addTrack(){
        this.props.onAdd(this.props.track)
    }
    removeTrack(){
        this.props.onRemove(this.props.track)
    }
    render() {
        let button;  
        if(this.props.isRemoval){
            button= <button onClick={this.removeTrack} className="Track-action">-</button>;
        }
        else{
            button = <button onClick={this.addTrack} className="Track-action">+</button>;
        }
        return (
            <div className="Track">
                <div className="Track-information">
                    <h3>{this.props.track.name}</h3>
                    <p>{this.props.track.artist} | {this.props.track.album}</p>
                </div>
                {button}
                
            </div>
        )
    }
}