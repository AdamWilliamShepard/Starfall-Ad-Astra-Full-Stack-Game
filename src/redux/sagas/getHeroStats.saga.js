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

//FOR ROOT SAGA
function* getHeroStatsSaga() {
    yield takeLatest('GET_HERO_STATS', getHeroStats)
}

export default getHeroStatsSaga;