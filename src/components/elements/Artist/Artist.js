import React from 'react';

const Artist = (props) => {

  return (
    <div className="sur-info-box">
      <div className="sur-artist-name">
        <h1>{props.artist}</h1>
      </div>
      <div className="sur-album-info">
        <p className="track">{props.track}</p>
        <p className="album">{props.albumtitle}</p>
      </div>
    </div>
  )
}

export default Artist;