import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

//SAGA GET
function* getHeroInventory(action) {
    try {
        const inventoryList = yield axios.get('/api/herostats/inventory')
        console.log('itemList', inventoryList)

        yield put({ type: 'SET_HERO_INVENTORY', payload: inventoryList.data })
    } catch (error) {
        console.log('get request failed', error)
    }
}

//FOR ROOT SAGA
function* getHeroInventorySaga() {
    yield takeLatest('GET_HERO_INVENTORY', getHeroInventory)
}

export default getHeroInventorySaga;