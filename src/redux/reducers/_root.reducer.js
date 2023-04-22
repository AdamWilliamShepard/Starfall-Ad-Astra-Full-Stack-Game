import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import collisionReducer from './collision.reducer';
import equipmentReducer from './equipment.reducer';
import heroActionsReducer from './heroactions.reducer';
import heroInfoReducer from './heroinfo.reducer';
import heroInventoryReducer from './heroinventory.reducer';
import savePositionReducer from './saveposition.reducer';
import heroStatsReducer from './herostats.reducer';
import editInfo from './editinfo.reducer';
import battleZonesReducer from './battlezone.reducer';
import attacksReducer from './attacks.reducer';
import monstersReducer from './monsters.reducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  collisionReducer,
  equipmentReducer,
  heroActionsReducer,
  heroInfoReducer,
  heroInventoryReducer,
  savePositionReducer,
  heroStatsReducer,
  editInfo,
  battleZonesReducer,
  attacksReducer,
  monstersReducer
});

export default rootReducer;
