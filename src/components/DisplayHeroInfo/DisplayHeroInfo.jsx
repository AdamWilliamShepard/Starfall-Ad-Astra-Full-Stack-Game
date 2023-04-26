import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Paper, Card, CardActions, CardContent, CardMedia, Typography, styled } from '@mui/material';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function DisplayHeroInfo() {

  const dispatch = useDispatch()
  const history = useHistory()
  const heroStats = useSelector(store => store.heroStatsReducer)

  useEffect(() => {
    dispatch({ type: "GET_HERO_STATS" }),
      dispatch({ type: 'GET_HERO_INVENTORY' }),
      dispatch({ type: 'GET_EQUIPMENT' })
  }, [])

  const specialAvatar = heroStats && heroStats.length > 0 ? heroStats[0].Avatar : null;

  const showDetails = () => {
    history.push(`/details/${heroStats[0].id}`)
  }

  return (
    <>
      <h2>Here is your current Hero!</h2>
      <div className="container2" id="container1">
        <Card sx={{
          maxWidth: 700,
          width: '75%',
          backgroundColor: 'white',
          cursor: 'grab',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            backgroundColor: 'rgba(32, 119, 212, 0.6)',
            boxShadow: '0px 0px 20px 5px rgba(0,0,0,0.5)',
            transform: 'scale(1.05)'
          },
          display: 'flex',
          justifyContent: 'center'
        }} onClick={showDetails}>
          <CardMedia
            sx={{ height: 150, width: 300, justifyContent: "center" }}
            image={specialAvatar}
            component='img'
          />
          <CardContent sx={{ width: '100%', alignItems: "center" }}>
            <br /><br />
            Name: {heroStats && heroStats.length > 0 ? heroStats[0].Name : "Loading"} <br />
            Background:{heroStats && heroStats.length > 0 ? heroStats[0].Background : "Loading"}<br />

          </CardContent>
          <CardActions sx={{ justifyContent: "center" }}>
          </CardActions>
        </Card>
      </div>
      < br />
      <LogOutButton className="btn" />
    </>
  );
}

// this allows us to use <App /> in index.js
export default DisplayHeroInfo;
