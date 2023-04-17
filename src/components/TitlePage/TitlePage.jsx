import React from 'react';
import StarfallAdAstra from '../img/StarfallAdAstra.png'
import { useHistory } from 'react-router-dom';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function TitlePage() {

const history = useHistory()

const handleClick = () => {
  history.push('/')
}

  return (
    <div className="container" style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}> 
      <img src={StarfallAdAstra} alt="Starfall Ad Astra" style={{ width: '80%', height: '100%', objectFit: 'cover' }} />
      <button style={{ position: 'absolute', top: '90%', left: '50%', transform: 'translate(-50%, -50%)' }} onClick={handleClick}> Start Your Adventure</button>
    </div>
  );
}

export default TitlePage;
