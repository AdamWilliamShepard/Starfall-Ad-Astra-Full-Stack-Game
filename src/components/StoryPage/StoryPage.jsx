import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

function StoryPage() {
  const dispatch = useDispatch()
  const heroStats = useSelector(store => store.heroStatsReducer)
  console.log('this is heroStats:', heroStats)

  useEffect(() => {
    dispatch({ type: "GET_HERO_STATS" }),
      dispatch({ type: 'GET_HERO_INVENTORY' }),
      dispatch({ type: 'GET_EQUIPMENT' })
  }, [])

  if (!heroStats.Name) {
    return null; // return null until heroStats.Name exists
  }

  return (
    <div className="container">
      <br />
      <p style={{lineHeight: 2}}>On a fateful night, long ago, <u>{heroStats.Name}</u> looked up at the night
      sky, and saw the strangest sight- a flaming star falling from the heavens to the earth!   </p><br />
       <p style={{lineHeight: 2}}>With a background as a <u>{heroStats.Background}</u>, <u>{heroStats.Name}</u> set
       out with their faithful friend and ally, Emby, to investigate the crash. </p><br />
       <p style={{lineHeight: 2}}>They met strange and dangerous foes along the way, but after days of travel 
        they made it to their destination: Starfall Academy.</p> <br />
        <p style={{lineHeight: 2}}>However, <u>{heroStats.Name}</u> and Emby found the Academy doors locked 
        without a person in sight...</p><br />

    </div>
  );
}

export default StoryPage;
