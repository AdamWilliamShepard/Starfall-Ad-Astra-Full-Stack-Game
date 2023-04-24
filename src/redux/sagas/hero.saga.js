import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

//SAGA GET
function* getHeroStats() {
    try {
        const itemList = yield axios.get('/api/herostats')
        console.log('itemList', itemList)

        yield put({ type: 'SET_HERO_STATS', payload: itemList.data })
    } catch (error) {
        console.log('get request failed', error)
    }
}

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

//SAGA POST
function* postHeroStats(action) {
    try {
        console.log('This is action.payload', action.payload)
        yield axios.post('/api/herostats/stats', action.payload)
        // yield put({ type: 'SET_HERO_INFO'})
    } catch (error) {
        console.log('get request failed', error)
    }
}

//FOR ROOT SAGA
function* heroSaga() {
    yield takeLatest('GET_HERO_STATS', getHeroStats)
    yield takeLatest('POST_HERO_INFO', postHeroInfo)
    yield takeLatest('POST_HERO_STATS', postHeroStats)
}

export default heroSaga;