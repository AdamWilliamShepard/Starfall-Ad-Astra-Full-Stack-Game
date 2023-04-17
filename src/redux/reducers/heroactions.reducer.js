const heroActionsReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_HERO_ACTIONS':
            return action.payload;
        default:
            return state;
    }
};

export default heroActionsReducer