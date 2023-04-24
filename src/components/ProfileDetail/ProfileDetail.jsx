import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box, Paper, Grid, styled } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function ProfileDetail() {

  const dispatch = useDispatch()
  const heroStats = useSelector(store => store.heroStatsReducer)
  const heroInventory = useSelector((store => store.heroInventoryReducer))
  const equipment = useSelector((store => store.equipmentReducer))

  const [editState, setEditState] = useState(false)

  const reducerHeroToEdit = useSelector((store => store.editInfo))
  console.log('this is reducerHeroToEdit', reducerHeroToEdit)

  useEffect(() => {
    dispatch({ type: "GET_HERO_STATS" }),
      dispatch({ type: 'GET_HERO_INVENTORY' }),
      dispatch({ type: 'GET_EQUIPMENT' })
  }, [])
  const specialAvatar = heroStats && heroStats.length > 0 ? heroStats[0].Avatar : null;

  function handleChange(event) {
    dispatch({
      type: 'EDIT_ONCHANGE',
      payload: {
        property: 'Name',
        value: event.target.value
      }
    });
  }

  function handleBackgroundChange(event) {
    dispatch({
      type: 'EDIT_ONCHANGE',
      payload: {
        property: 'Background',
        value: event.target.value
      }
    });
  }

  function handleEditClick() {
    dispatch({ type: 'SET_EDIT_INFO', payload: heroStats[0] })
    setEditState(true)
  }

  function handleSubmitChange() {
    axios.put(`/api/heroStats/${reducerHeroToEdit.id}`, reducerHeroToEdit)
      .then(response => {
        dispatch({ type: 'EDIT_CLEAR' }),
          dispatch({ type: "GET_HERO_STATS" })
      }).catch(error => {
        console.log('error on put', error)
      })
    setEditState(false)
  }

  function handleDelete(itemId) {
    dispatch({ type: 'DELETE_HERO_INVENTORY', payload: itemId })
    dispatch({ type: 'GET_EQUIPMENT' })
  }

  return (
    <>
      <div className="container black-page" id="container1" >
        <h2>Here is your current Hero!</h2>
        <Box sx={{ width: '100%' }}>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={6}>
              {editState ? <Item>
                {specialAvatar && <img src={specialAvatar} alt="Avatar" height='100' />}<br />
                Name:<input
                  onChange={(event) => handleChange(event)}
                  type='text'
                  size="30"
                  name='Name'
                  placeholder={heroStats[0].Name}
                  value={reducerHeroToEdit.Name}
                ></input><br />
                Background: <input
                  onChange={(event) => handleBackgroundChange(event)}
                  type='text'
                  size="30"
                  name='Background'
                  placeholder={heroStats[0].Background}
                  value={reducerHeroToEdit.Background}
                ></input> <br />
                <button onClick={handleSubmitChange}>Submit Changes</button>
              </Item>
                :
                <Item>
                  {specialAvatar && <img src={specialAvatar} alt="Avatar" height='100' />}<br />
                  <h5>Name: {heroStats && heroStats.length > 0 ? heroStats[0].Name : "Loading"} <br />
                  Background:{heroStats && heroStats.length > 0 ? heroStats[0].Background : "Loading"}<br /></h5>
                  <button onClick={handleEditClick}>Edit Your Hero</button>
                </Item>
              }
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
                {specialAvatar && <img src='https://i.imgur.com/LLP2aTE.png' alt="Avatar" height='100' />}<br />
                <h5>Ally Name: Emby <br />
                  Type: Fire
                </h5> <br />
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
                          <TableCell align="right"><button onClick={() => handleDelete(item.id)}>Delete</button></TableCell>
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

export default ProfileDetail;
