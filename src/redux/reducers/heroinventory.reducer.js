const heroInventoryReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_HERO_INVENTORY':
            return action.payload;
        default:
            return state;
    }
};

export default heroInventoryReducer