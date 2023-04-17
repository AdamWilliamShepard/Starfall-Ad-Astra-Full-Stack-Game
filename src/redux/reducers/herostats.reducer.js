const heroStatsReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_HERO_STATS':
            return action.payload;
        default:
            return state;
    }
};

export default heroStatsReducer