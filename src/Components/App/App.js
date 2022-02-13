import React from 'react';
import ReactDOM from 'react-dom';

import './App.css';
import { Playlist } from '../Playlist/Playlist'
import { SearchBar } from '../SearchBar/SearchBar'
import { SearchResults } from '../SearchResults/SearchResults'
import Spotify from '../../util/Spotify'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchResults: [],
      playlistName: "Playlist Name",
      playlistTracks: []

    }
    this.addTrack = this.addTrack.bind(this)
    this.removeTrack = this.removeTrack.bind(this)
    this.updatePlaylistName = this.updatePlaylistName.bind(this)
    this.savePlaylist = this.savePlaylist.bind(this)
    this.search = this.search.bind(this)
  }
  updatePlaylistName(name) {
    this.setState({
      playlistName: name
    })
  }
  search(term) {
    Spotify.search(term).then(searchResults => {
      this.setState({
        searchResults: searchResults
      })
    })
  }
  savePlaylist() {
    const trackUris = this.state.playlistTracks.map(playlistTrack => playlistTrack.uri);
    if(this.state.playlistTracks.length==0){
      return
    }
    Spotify.savePlaylist(this.state.playlistName, trackUris).then(() => {
      this.setState({
        playlistTracks: []
      })
      this.updatePlaylistName('New Playlist')
    })
  }
  addTrack(track) {
    /*if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }
    
    this.setState({
      
      playlistTracks: this.state.playlistTracks.push(track)
    })
    */
    if (!this.state.playlistTracks.find(playlistTrack => playlistTrack.id === track.id)) {
      this.setState(prevState => ({
        playlistTracks: [...prevState.playlistTracks, track]
      }));
    }
  }
  removeTrack(track) {
    const newPlay = this.state.playlistTracks.filter(song => song.id != track.id)

    this.setState = ({
      playlistTracks: newPlay
    })
  }
  render() {
    return (
      <div>
        <h1>Spotify <span className="highlight">Play</span>list Creator</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults onAdd={this.addTrack} searchResults={this.state.searchResults} />
            <Playlist  onSave={this.savePlaylist} onNameChange={this.updatePlaylistName} onRemove={this.removeTrack} playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} />
          </div>
        </div>
      </div>
    )
  }
}

export default App;
