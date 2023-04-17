import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

function UserPage() {
  const dispatch = useDispatch()
  const user = useSelector((store) => store.user);
  const heroStats = useSelector(store => store.heroStatsReducer)
  console.log('This is heroStats', heroStats)

  useEffect (() => {
    dispatch({type: "GET_HERO_STATS"})
  }, [])

  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      <p>Here is your current hero!</p>
      <table>
        <tr>
          <td>
            Name:
          </td>
          <td>
            HERO
          </td>
        </tr>
        <tr>
          <td>
            Background:
          </td>
          <td>
            TRAGIC
          </td>
        </tr>
        <tr>
          <td>
            HP:
          </td>
          <td>
            {heroStats[0].HP}
          </td>
        </tr>
        <tr>
          <td>
            Energy:
          </td>
          <td>
          {heroStats[0].Energy}
          </td>
        </tr>
        <tr>
          <td>
            Attack:
          </td>
          <td>
          {heroStats[0].Attack}
          </td>
        </tr>
        <tr>
          <td>
            Defense:
          </td>
          <td>
          {heroStats[0].Defense}
          </td>
        </tr>
        <tr>
          <td>
            EXP:
          </td>
          <td>
          {heroStats[0].Exp}
          </td>
        </tr>
      </table>
      <LogOutButton className="btn" />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
