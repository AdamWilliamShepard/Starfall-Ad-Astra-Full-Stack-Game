const savePositionReducer = (state = {
    x: -950,
    y: -470
}, action) => {
    switch (action.type) {
        case 'SET_SAVE_POSITION':
            const lastItem = action.payload[action.payload.length - 1]; // get last item in array
            return { ...state, ...lastItem }; // spread properties of last item into new state object
        case 'GET_SAVE_POSITION':
            return state
        default:
            return state;
    }
};

export default savePositionReducer