import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function ProfileDetail() {

  const dispatch = useDispatch()
  const user = useSelector((store) => store.user);
  const heroStats = useSelector(store => store.heroStatsReducer)
  console.log('This is heroStats', heroStats)

  const heroInventory = useSelector((store => store.heroInventoryReducer))
  console.log('This is heroInventory', heroInventory)

  const equipment = useSelector((store => store.equipmentReducer))
  console.log('This is equipment', equipment)

  const history = useHistory()

  useEffect(() => {
    dispatch({ type: "GET_HERO_STATS" }),
      dispatch({ type: 'GET_HERO_INVENTORY' }),
      dispatch({ type: 'GET_EQUIPMENT' })
  }, [])

  const specialAvatar = heroStats && heroStats.length > 0 ? heroStats[0].Avatar : null;

  return (
    <>
      <div className="container black-page" id="container1" >
        <h2>Here is your current Hero!</h2>

        <Box sx={{ width: '100%' }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            <Item>
              {specialAvatar && <img src={specialAvatar} alt="Avatar" height='100' />}<br />
              Name: {heroStats && heroStats.length > 0 ? heroStats[0].Name : "Loading"} <br />
              Background:{heroStats && heroStats.length > 0 ? heroStats[0].Background : "Loading"}<br />
            </Item>
          </Grid>
          <Grid item xs={6}>
            <Item>
              <h3>Equipment</h3>
              <img src="" alt="" />
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {equipment.map((item) => (
                      <TableRow
                        key={item.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell align="right"><img src={item.EquipIcon} height="50" /></TableCell>
                        <TableCell align="right">{item.Slot}</TableCell>
                        <TableCell align="right">{item.EquipName}</TableCell>
                        <TableCell align="right">{item.EquipDescrip}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Item>
          </Grid>
          <Grid item xs={6}>
            <Item>
              <h3>Stats</h3>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                  </TableHead>
                  <TableBody>

                      <TableRow>
                        <TableCell align="left">HP: {heroStats && heroStats.length > 0 ? heroStats[0].HP : "Loading"}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align="left"> Energy: {heroStats && heroStats.length > 0 ? heroStats[0].Energy : "Loading"}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align="left"> Attack: {heroStats && heroStats.length > 0 ? heroStats[0].Attack : "Loading"}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align="left">Defense: {heroStats && heroStats.length > 0 ? heroStats[0].Defense : "Loading"}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align="left">EXP: {heroStats && heroStats.length > 0 ? heroStats[0].Exp : "Loading"}</TableCell>
                      </TableRow>

                  </TableBody>
                </Table>
              </TableContainer>
            </Item>
          </Grid>
          <Grid item xs={6}>
            <Item>
              <h3>Inventory</h3>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                  </TableHead>
                  <TableBody>
                    {heroInventory.map((item) => (
                      <TableRow
                        key={item.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell align="right"><img src={item.ItemIcon} height="50" /></TableCell>
                        <TableCell align="right">{item.ItemQuantity}</TableCell>
                        <TableCell align="right">{item.ItemName}</TableCell>
                        <TableCell align="right">{item.ItemDescrip}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Item>
          </Grid>
        </Grid>
      </Box>
      < br />

      <Link to="/login">
      <LogOutButton className="btn" />
      </Link>
      </div>
    </>
  );
}

// this allows us to use <App /> in index.js
export default ProfileDetail;
