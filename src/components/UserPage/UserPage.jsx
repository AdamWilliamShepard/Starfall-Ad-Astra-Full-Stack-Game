import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import DisplayHeroInfo from '../DisplayHeroInfo/DisplayHeroInfo';
import ProfileForm from '../ProfileForm/ProfileForm';

function UserPage() {

  const dispatch = useDispatch()
  const user = useSelector((store) => store.user);

  useEffect(() => {
    dispatch({ type: "GET_HERO_STATS" })
  }, [])


  return (
    <>
      <div className="container black-page" id="container1">
        <h2>Welcome, {user.username}!</h2>
        {user.profileCreated ? <DisplayHeroInfo /> : <ProfileForm />}
      </div>
    </>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
