import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

export default function ProfileForm() {

  const dispatch =useDispatch()
  const history = useHistory()

  let [infoToAdd, setInfoToAdd] =useState({Name: '', Background:'', Avatar:''})

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
      dispatch ({
        type:"CHANGE_PROFILE_CREATED",
        payload: user.id
      }),
      dispatch({ type: "FETCH_USER" })
      window.location.reload()
  }
}

  return (
  <><div className="container" id="container1">
    <Card sx={{
      maxWidth: 500,
      backgroundColor: 'rgba(255, 255, 255, 0.1)',

    }}>
      <CardContent sx={{ width: '100%' }}>
        <div>
          Create Your Hero Profile! <br /><br />
          <FormControl sx={{ m: 1, minWidth: 120 }}>
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
              <MenuItem value={'Gold Knight'}>Gold Knight</MenuItem>
              <MenuItem value={'Dog Ninja'}>Dog Ninja</MenuItem>
              <MenuItem value={'Green Ninja'}>Green Ninja</MenuItem>
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