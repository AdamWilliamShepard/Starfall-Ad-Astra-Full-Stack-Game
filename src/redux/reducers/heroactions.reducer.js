const heroActionsReducer = (state = [], action) => {
    switch (action.type) {
        case 'GET_HERO_ACTIONS':
            return action.payload;
        default:
            return state;
    }
};

export default heroActionsReducer