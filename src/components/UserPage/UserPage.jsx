import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import GoldKnight from '../img/GoldKnight.png'
import DisplayHeroInfo from '../DisplayHeroInfo/DisplayHeroInfo';
import ProfileForm from '../ProfileForm/ProfileForm';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


function UserPage() {

  const dispatch = useDispatch()
  const user = useSelector((store) => store.user);
  console.log('This is user', user)
  const heroStats = useSelector(store => store.heroStatsReducer)
  console.log('This is heroStats', heroStats)

  useEffect(() => {
    dispatch({ type: "GET_HERO_STATS" })
  }, [])


  return (
    <>
      <div className="container" id="container1">
        <h2>Welcome, {user.username}!</h2>
        {user.profileCreated ? <DisplayHeroInfo /> : <ProfileForm />}

      </div>
    </>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
