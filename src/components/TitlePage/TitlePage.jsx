import React from 'react';
import StarfallAdAstra from '../img/StarfallAdAstra.png'
import { useHistory } from 'react-router-dom';

function TitlePage() {

const history = useHistory()

const handleClick = () => {
  history.push('/home')
}

  return (
    <div className="container black-page" style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}> 
      <img src={StarfallAdAstra} alt="Starfall Ad Astra" style={{ width: '80%', height: '100%', objectFit: 'cover' }} />
      <button style={{ position: 'absolute', top: '80%', left: '50%', transform: 'translate(-50%, -50%)' }} onClick={handleClick}> Start Your Adventure</button>
    </div>
  );
}

export default TitlePage;
