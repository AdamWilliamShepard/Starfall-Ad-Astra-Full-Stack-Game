import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

//SAGA GET
function* getSaveData(action) {
    try {
        const saveCoords = yield axios.get('/api/save')
        console.log('itemList', saveCoords)

        yield put({ type: 'SET_SAVE_POSITION', payload: saveCoords.data })
    } catch (error) {
        console.log('get request failed', error)
    }
}

//SAGA POST 
function* postSaveData(action) {
    try {
        console.log('This is action.payload', action.payload)
        yield axios.post('/api/save', action.payload)
         yield put({ type: 'GET_SAVE_INFO'})
    } catch (error) {
        console.log('get request failed', error)
    }
}


//FOR ROOT SAGA
function* saveDataSaga() {
    yield takeLatest('GET_SAVE_INFO', getSaveData)
    yield takeLatest('POST_SAVE_INFO', postSaveData)
}

export default saveDataSaga;