const savePositionReducer = (state = {x: -955, y: -475}, action) => {
    switch (action.type) {
        case 'SET_SAVE_POSITION':
            const lastItem = action.payload[action.payload.length - 1]; // get last item in array
            // console.log('this is lastItem', lastItem)

            return {...state, ...lastItem}; // spread properties of last item into new state object
        case 'GET_SAVE_POSITION':
            return {...state, ...lastItem}
        default:
            return {...state, ...lastItem};
    }
};

export default savePositionReducer