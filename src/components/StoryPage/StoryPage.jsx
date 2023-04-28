import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

function StoryPage() {
  const dispatch = useDispatch()
  const heroStats = useSelector(store => store.heroStatsReducer)
  console.log('this is heroStats:', heroStats)

  useEffect(() => {
    dispatch({ type: "GET_HERO_STATS" }),
      dispatch({ type: 'GET_HERO_INVENTORY' }),
      dispatch({ type: 'GET_EQUIPMENT' })

    // if (document.querySelector('#cursor')) {
    //   gsap.fromTo('#cursor', { autoAlpha: 0, x: -20 }, { autoAlpha: 1, duration: 0.5, repeat: -1, ease: SteppedEase.config(1) });
    // }

    // if (document.querySelector('#text')) {
    //   gsap.to("#text", { text: { value: "this is a custom text written to show my easy approaches to make the typewriting easy!" }, duration: 5, delay: 1, ease: "none" });
    // }
  }, [])


  if (!heroStats.Name) {
    return null;
  }

  return (
    <div className="container">
      <br />
      <p className="line-1 anim-typewriter" style={{ lineHeight: 2 }}>On a fateful night, long ago, <u>{heroStats.Name}</u> looked up at the night
        sky, and saw the strangest sight- a flaming star falling from the heavens to the earth!  </p><br />
      <p style={{ lineHeight: 2 }}>With a background as a <u>{heroStats.Background}</u>, <u>{heroStats.Name}</u> set
        out with their faithful friend and ally, Emby, to investigate the crash. </p><br />
      <p style={{ lineHeight: 2 }}>They met strange and dangerous foes along the way, but after days of travel
        they made it to their destination: Starfall Academy.</p> <br />
      <p style={{ lineHeight: 2 }}>However, <u>{heroStats.Name}</u> and Emby found the Academy doors locked
        without a person in sight...</p><br />

        <Link className="navLink" to="/canvas">
          Play Game
        </Link>

    </div>
  );
}

export default StoryPage;
