import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

function StoryPage() {
  const dispatch = useDispatch()
  const heroStats = useSelector(store => store.heroStatsReducer)
  const storyImage = require('../img/StarfallStoryImage.png')
  console.log('this is heroStats:', heroStats)

  useEffect(() => {
    dispatch({ type: "GET_HERO_STATS" }),
      dispatch({ type: 'GET_HERO_INVENTORY' }),
      dispatch({ type: 'GET_EQUIPMENT' })

  }, [])

  const tl = gsap.timeline()
 tl.from('#storyImg', {
    opacity: 0,
    duration: 15,
  })
  .to('#storyImg', {
    opacity: 0,
    duration: 15,
  });


  if (!heroStats.Name) {
    return null;
  }

  return (
    <div className="container">
      <br />
      <div style={{ display: 'flex', position: 'relative', justifyContent: 'center'}}>
        <div id="storyImg">
        <img src={storyImage} style={{width: 1000}}></img>
        </div>
        <div className="storyText" style={{position: 'absolute', margin: '15' }}>
          <p className="storyText" style={{ lineHeight: 2 }}>One night, <u>{heroStats.Name}</u> looked up at the night
            sky, and saw a flaming star falling from the heavens to the earth!  </p><br />
          <p className="storyText" style={{ lineHeight: 2 }}>With a background as a <u>{heroStats.Background}</u>, <u>{heroStats.Name}</u> set
            out with their faithful friend and ally, Emby, to investigate the crash. </p><br />
          <p className="storyText" style={{ lineHeight: 2 }}>They met strange and dangerous foes along the way, but after days of travel
            they made it to their destination: Starfall Academy.</p> <br />
          <p className="storyText" style={{ lineHeight: 2 }}>However, <u>{heroStats.Name}</u> and Emby found the Academy doors locked
            without a person in sight...</p><br />
            </div>
      </div>
    </div>
  );
}

export default StoryPage;
