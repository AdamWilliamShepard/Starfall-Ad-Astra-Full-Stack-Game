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

//SAGA GET
function* getEquipment(action) {
    try {
        const equipList = yield axios.get('/api/herostats/equipment')
        console.log('itemList', equipList)

        yield put({ type: 'SET_EQUIPMENT', payload: equipList.data })
    } catch (error) {
        console.log('get request failed', error)
    }
}

function* deleteHeroInventory(action) {
    try {
        yield axios.delete(`/api/herostats/delete/${action.payload}`)
        yield put({ type: 'GET_HERO_INVENTORY'})
    } catch (error) {
        console.log('get request failed', error)
    }
}

//FOR ROOT SAGA
function* getHeroInventorySaga() {
    yield takeLatest('GET_HERO_INVENTORY', getHeroInventory),
    yield takeLatest('DELETE_HERO_INVENTORY', deleteHeroInventory)
    yield takeLatest('GET_EQUIPMENT', getEquipment)
}

export default getHeroInventorySaga;