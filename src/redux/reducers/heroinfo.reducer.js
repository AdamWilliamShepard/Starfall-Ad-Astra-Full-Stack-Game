const heroInfoReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_HERO_INFO':
            return action.payload;
        default:
            return state;
    }
};

export default heroInfoReducer