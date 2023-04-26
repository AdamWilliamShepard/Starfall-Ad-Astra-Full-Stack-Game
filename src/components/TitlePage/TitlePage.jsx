import React from 'react';
import StarfallAdAstra from '../img/StarfallAdAstra.png'
import { useHistory } from 'react-router-dom';

function TitlePage() {

  const history = useHistory()

  const handleClick = () => {
    history.push('/home')
  }

  return (
    <div className="container black-page" style={{ display: 'flex', justifyContent: 'center', maxWidth: 1600 }}>
      <div style={{ width: '80%', height: '100%', objectFit: 'cover', position: 'relative', display: 'flex', justifyContent: 'center' }}>
        <img src={StarfallAdAstra} alt="Starfall Ad Astra" style={{ width: '80%', height: '100%', objectFit: 'cover' }} />
        <button className="adventureBtn" style={{ position: 'absolute', bottom: '5%', left: '50%', transform: 'translate(-50%, -50%)' }} onClick={handleClick}> Start Your Adventure</button>
      </div>
    </div>
  );
}

export default TitlePage;
