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
      <p>Our story begins with {heroStats.Name}.</p>
      <br />
      <p>After a shooting star crashed down on earth, {heroStats.Name} <br /><br />
       set out with their faithful friend and ally, Emby, to <br /><br />
       
       </p>
    </div>
  );
}

export default StoryPage;
