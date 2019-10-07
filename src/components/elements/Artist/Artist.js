import React from 'react';

const Artist = (props) => {

  return (
    <div>
      <div className="sur-artist-name">
        <h1>{props.artist}</h1>
      </div>
      <div className="sur-album-info">
        <p>{props.track}</p>
        <p>{props.albumtitle}</p>
      </div>
    </div>
  )
}

export default Artist;