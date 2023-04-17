const equipmentReducer = (state = [], action) => {
    switch (action.type) {
        case 'GET_EQUIPMENT':
            return action.payload;
        default:
            return state;
    }
};

export default equipmentReducer