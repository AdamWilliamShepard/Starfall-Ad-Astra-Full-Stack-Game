import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
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
            999
          </td>
        </tr>
        <tr>
          <td>
            Energy:
          </td>
          <td>
            999
          </td>
        </tr>
        <tr>
          <td>
            Attack:
          </td>
          <td>
            999
          </td>
        </tr>
        <tr>
          <td>
            Defense:
          </td>
          <td>
            999
          </td>
        </tr>
        <tr>
          <td>
            EXP:
          </td>
          <td>
            999
          </td>
        </tr>
      </table>
      <LogOutButton className="btn" />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
