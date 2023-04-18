import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

//SAGA PUT
function* changeProfileCreated(action) {
    try {
        console.log('this is action.payload', action.payload)
        yield axios.put(`/api/user/${action.payload}`)
        yield put({ type: 'SET_HERO_STATS'})
    } catch (error) {
        console.log('get request failed', error)
    }
}

//FOR ROOT SAGA
function* changeProfileCreatedSaga() {
    yield takeLatest('CHANGE_PROFILE_CREATED', changeProfileCreated)
}

export default changeProfileCreatedSaga;