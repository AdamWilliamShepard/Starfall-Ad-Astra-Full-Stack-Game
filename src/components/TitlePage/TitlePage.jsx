import React from 'react';
import StarfallAdAstra from '../img/StarfallAdAstra.png'

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function TitlePage() {

  return (
    <div className="container">
      <div>
      <img src={StarfallAdAstra} alt="Starfall Ad Astra"  style={{width: '80%', height: '100%', objectFit: 'cover'}}/>
      </div>
    </div>
  );
}

export default TitlePage;
