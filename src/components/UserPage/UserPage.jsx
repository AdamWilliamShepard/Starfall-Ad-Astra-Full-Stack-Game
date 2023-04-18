import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import GoldKnight from '../img/GoldKnight.png'

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
  const heroStats = useSelector(store => store.heroStatsReducer)
  console.log('This is heroStats', heroStats)

  useEffect(() => {
    dispatch({ type: "GET_HERO_STATS" })
  }, [])


  return (
    <>
      <div className="container">
        <h2>Welcome, {user.username}!</h2>
        <p>Your ID is: {user.id}</p>
        <p>Here is your current hero!</p>

        {/* Need to add conditional rendering in the event that they have not yet created a hero! */}

        {/* Need to style this page! */}


      </div>

      <Box sx={{ width: '100%' }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            <Item>
            <img src={GoldKnight}  style={{ width: '15%', height: '15%' }} />
            </Item>
          </Grid>
          <Grid item xs={6}>
            <Item>
              Head Equip: COPPER HELMET❌<br />
              Body Equip: COPPER ARMOR❌<br />
              Weapon Equip: COPPER SWORD❌<br />
              Item 1 Equip: COPPER BRACELET❌<br />
              Item 2 Equip: COPPER NECKLACE❌<br />
            </Item>
          </Grid>
          <Grid item xs={6}>
            <Item>
              Name: {heroStats && heroStats.length > 0 ? heroStats[0].Name : "Loading"} ✅<br />
              Background:{heroStats && heroStats.length > 0 ? heroStats[0].Background : "Loading"}✅<br />
              HP: {heroStats && heroStats.length > 0 ? heroStats[0].HP : "Loading"}✅<br />
              Energy: {heroStats && heroStats.length > 0 ? heroStats[0].Energy : "Loading"}✅<br />
              Attack: {heroStats && heroStats.length > 0 ? heroStats[0].Attack : "Loading"}✅<br />
              Defense: {heroStats && heroStats.length > 0 ? heroStats[0].Defense : "Loading"}✅<br />
              EXP: {heroStats && heroStats.length > 0 ? heroStats[0].Exp : "Loading"}✅<br />
            </Item>
          </Grid>
          <Grid item xs={6}>
            <Item>
              Item 1: HEALING POTION ❌<br />
              Item 2: MANA POTION❌<br />
              Item 3: ATTACK POWER SEED❌<br />
              Item 4: DEFENSE POWER SEED❌<br />
              Item 5: HP UP SEED❌<br />
              Item 6: EXP SEED❌<br />
            </Item>
          </Grid>
        </Grid>
      </Box>
      <LogOutButton className="btn" />
    </>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
