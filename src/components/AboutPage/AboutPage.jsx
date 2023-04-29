import React from 'react';
import { Paper, Card, CardActions, CardContent, CardMedia, Typography, styled, Grid, Box } from '@mui/material';
import gsap from '../img/gsap-greensock.svg'
import howler from '../img/howler.png'
import midjourney from '../img/Midjourney_Emblem.png'
import tiled from '../img/tiled-logo-header.png'

function AboutPage() {

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <h2>Acknowledgements:</h2>
      </div>

      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Item >
            <span>My instructors Key, Emma, and all of the staff of Prime Digital Academy</span>
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item>
          <span>The students of Prime- my amazing Aquamarine cohort and our senior cohort Amethyst!</span>
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item>
          <span>My friends and family- and especially my lovely wife Ashlyn!</span>
          </Item>
        </Grid>

      </Grid>
<br /><br /><br />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <h3>Technologies Used:</h3>
      </div>

      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Item >
            <a href="https://developer.mozilla.org/en-US/docs/Web/CSS">
              <Card sx={{
                maxWidth: 250,
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
              }}>
                <CardMedia
                  sx={{ width: 75, justifyContent: "center" }}
                  image='https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg'
                  component='img'
                />
                <CardContent sx={{ width: '100%', alignItems: "center" }}>
                  CSS
                </CardContent>
              </Card>
            </a>
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item>
            <a href="https://developer.mozilla.org/en-US/docs/Web/HTML">
              <Card sx={{
                maxWidth: 250,
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
              }}>
                <CardMedia
                  sx={{ width: 75, justifyContent: "center" }}
                  image="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg"
                  component='img'
                />
                <CardContent sx={{ width: '100%', alignItems: "center" }}>
                  HTML
                </CardContent>
              </Card>
            </a>
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item>
            <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript">
              <Card sx={{
                maxWidth: 250,
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
              }}>
                <CardMedia
                  sx={{ width: 75, justifyContent: "center" }}
                  image='https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg'
                  component='img'
                />
                <CardContent sx={{ width: '100%', alignItems: "center" }}>
                  Javascript
                </CardContent>
              </Card>
            </a>
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item>
            <a href="https://material-ui.com/">
              <Card sx={{
                maxWidth: 250,
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
              }}>
                <CardMedia
                  sx={{ width: 75, justifyContent: "center" }}
                  image='https://raw.githubusercontent.com/devicons/devicon/master/icons/materialui/materialui-original.svg'
                  component='img'
                />
                <CardContent sx={{ width: '100%', alignItems: "center" }}>
                  MUI
                </CardContent>
              </Card>
            </a>
          </Item>
        </Grid>

        <Grid item xs={4}>
          <Item>
            <a href="https://nodejs.org/en/">
              <Card sx={{
                maxWidth: 250,
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
              }}>
                <CardMedia
                  sx={{ width: 75, justifyContent: "center" }}
                  image='https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg'
                  component='img'
                />
                <CardContent sx={{ width: '100%', alignItems: "center" }}>
                  NodeJS
                </CardContent>
              </Card>
            </a>
          </Item>
        </Grid>

        <Grid item xs={4}>
          <Item>
            <a href="https://www.postgresql.org/">
              <Card sx={{
                maxWidth: 250,
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
              }}>
                <CardMedia
                  sx={{ width: 75, justifyContent: "center" }}
                  image='https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg'
                  component='img'
                />
                <CardContent sx={{ width: '100%', alignItems: "center" }}>
                  Postgres
                </CardContent>
              </Card>
            </a>
          </Item>
        </Grid>

        <Grid item xs={4}>
          <Item>
            <a href="https://reactjs.org/">
              <Card sx={{
                maxWidth: 250,
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
              }}>
                <CardMedia
                  sx={{ width: 75, justifyContent: "center" }}
                  image='https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg'
                  component='img'
                />
                <CardContent sx={{ width: '100%', alignItems: "center" }}>
                  React
                </CardContent>
              </Card>
            </a>
          </Item>
        </Grid>

        <Grid item xs={4}>
          <Item>
            <a href="https://redux.js.org/">
              <Card sx={{
                maxWidth: 250,
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
              }}>
                <CardMedia
                  sx={{ width: 75, justifyContent: "center" }}
                  image='https://raw.githubusercontent.com/devicons/devicon/master/icons/redux/redux-original.svg'
                  component='img'
                />
                <CardContent sx={{ width: '100%', alignItems: "center" }}>
                  Redux
                </CardContent>
              </Card>
            </a>
          </Item>
        </Grid>

        <Grid item xs={4}>
          <Item>
            <a href="https://greensock.com/gsap/">
              <Card sx={{
                maxWidth: 250,
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
              }}>
                <CardMedia
                  sx={{ width: 65, justifyContent: "center" }}
                  image={gsap}
                  component='img'
                />
                <CardContent sx={{ width: '100%', alignItems: "center" }}>
                  GSAP
                </CardContent>
              </Card>
            </a>
          </Item>
        </Grid>

        <Grid item xs={4}>
          <Item>
            <a href="https://howlerjs.com/">
              <Card sx={{
                maxWidth: 250,
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
              }}>
                <CardMedia
                  sx={{ width: 75, justifyContent: "center" }}
                  image={howler}
                  component='img'
                />
                <CardContent sx={{ width: '100%', alignItems: "center" }}>
                  HowlerJS
                </CardContent>
              </Card>
            </a>
          </Item>
        </Grid>

        <Grid item xs={4}>
          <Item>
            <a href="https://www.midjourney.com/">
              <Card sx={{
                maxWidth: 250,
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
              }}>
                <CardMedia
                  sx={{ width: 75, justifyContent: "center" }}
                  image={midjourney}
                  component='img'
                />
                <CardContent sx={{ width: '100%', alignItems: "center" }}>
                  Midjourney
                </CardContent>
              </Card>
            </a>
          </Item>
        </Grid>

        <Grid item xs={4}>
          <Item>
            <a href="https://www.mapeditor.org/">
              <Card sx={{
                maxWidth: 250,
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
              }}>
                <CardMedia
                  sx={{ width: 75, justifyContent: "center" }}
                  image={tiled}
                  component='img'
                />
                <CardContent sx={{ width: '100%', alignItems: "center" }}>
                  Tiled
                </CardContent>
              </Card>
            </a>
          </Item>
        </Grid>

      </Grid>

    </div>
  );
}

export default AboutPage;
