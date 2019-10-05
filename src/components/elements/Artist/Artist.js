import React from 'react';

const Artist = (props) => {

  return (
    <div>
      <h1>{props.artist}</h1>
      <p>{props.albumtitle}</p>
      <p>{props.track}</p>
    </div>
  )
}

export default Artist;