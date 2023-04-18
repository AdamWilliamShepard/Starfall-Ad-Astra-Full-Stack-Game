import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

//SAGA POST
function* postHeroInfo(action) {
    try {
        console.log('This is action.payload', action.payload)
        yield axios.post('/api/herostats', action.payload)
        // yield put({ type: 'SET_HERO_INFO'})
    } catch (error) {
        console.log('get request failed', error)
    }
}

//FOR ROOT SAGA
function* postHeroInfoSaga() {
    yield takeLatest('POST_HERO_INFO', postHeroInfo)
}

export default postHeroInfoSaga;