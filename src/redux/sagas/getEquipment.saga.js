import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

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

//FOR ROOT SAGA
function* getEquipmentSaga() {
    yield takeLatest('GET_EQUIPMENT', getEquipment)
}

export default getEquipmentSaga;