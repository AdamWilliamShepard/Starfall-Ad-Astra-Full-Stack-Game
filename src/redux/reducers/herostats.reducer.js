const heroStats = (state = [], action) => {
    switch (action.type) {
        case 'GET_HERO_STATS':
            return action.payload;
        default:
            return state;
    }
};

export default heroStats