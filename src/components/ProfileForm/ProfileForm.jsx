import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { Box, TextField, Card, CardActions, CardContent, CardMedia, Button, Typography, InputLabel, MenuItem, FormHelperText, FormControl, Select } from '@mui/material';
import { useHistory } from 'react-router-dom';


export default function ProfileForm() {

  const dispatch = useDispatch()
  const history = useHistory()

  let [infoToAdd, setInfoToAdd] = useState({ Name: '', Background: '', Avatar: '' })

  const [Avatar, setAvatar] = useState('');
  const user = useSelector((store) => store.user);
  console.log('this is user.id', user.id)

  const handleChange = (event) => {
    setAvatar(event.target.value);
    setInfoToAdd({
      ...infoToAdd,
      Avatar: event.target.value,
    })
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log('This is infoToAdd', infoToAdd)
    setInfoToAdd({
      ...infoToAdd,
      [name]: value,
    })
  }

  const addInfo = (infoToAdd) => {
    event.preventDefault();
    console.log('Inside of addInfo function. Here is infoToAdd:', infoToAdd)
    if (infoToAdd.Name === '' || infoToAdd.Background === '' || infoToAdd.Avatar === '') {
      alert('You must complete all input fields!')
    }
    else {
      dispatch({
        type: 'POST_HERO_INFO',
        payload: infoToAdd
      }),
        dispatch({
          type: 'POST_HERO_STATS',
          payload: infoToAdd
        }),
        dispatch({
          type: "CHANGE_PROFILE_CREATED",
          payload: user.id
        }),
        dispatch({ type: "FETCH_USER" })

    }
    window.location.reload()
  }

  return (
    <><div className="container2" id="container1">
      <Card sx={{
        maxWidth: 500,
        minWidth: 400,
        backgroundColor: 'white',
      }}>
        <CardContent sx={{ width: '100%' }}>
          <div>
            Create Your Hero Profile! <br /><br />
            <FormControl sx={{ m: 1, minWidth: 3 }}>
              <InputLabel id="demo-simple-select-helper-label">Avatar</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={Avatar}
                label="Avatar"
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>

                <MenuItem value={'https://i.imgur.com/1bjWBOt.png'}>Young Hero</MenuItem>
                <MenuItem value={'https://i.imgur.com/3cvm9IY.png'}>Prime Student</MenuItem>
                <MenuItem value={'https://i.imgur.com/wy4RKGv.png'}>Gold Knight</MenuItem>
                <MenuItem value={'https://i.imgur.com/FgSII4v.png'}>Dog Ninja</MenuItem>

              </Select>
              <FormHelperText>Select an Avatar</FormHelperText>
            </FormControl>
          </div>
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
            onSubmit={(event) => addInfo(infoToAdd)}
          >
            <div>
              <TextField
                required
                id="outlined-required"
                label="Name"
                placeholder='Name'
                name='Name'
                onChange={handleInputChange}
              />
            </div>
            <div>
              <TextField
                required
                id="outlined-required"
                label="Background"
                placeholder='Background'
                name="Background"
                onChange={handleInputChange}
              />
            </div>
            <Button variant="contained" type="submit">Submit</Button>
          </Box>
        </CardContent>
        <CardActions sx={{ justifyContent: "center" }}>
        </CardActions>
      </Card>
    </div>
    </>
  );
}