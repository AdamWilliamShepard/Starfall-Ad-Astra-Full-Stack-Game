const attacksReducer = (state = {
    Tackle: {
        name: 'Tackle',
        damage: 10,
        type: 'Normal',
        color: 'black'
    },
    Fireball: {
        name: 'Fireball',
        damage: 25,
        type: 'Fire',
        color: 'red'
    }
}, action) => {
    switch (action.type) {
        case 'GET_ATTACKS':
            return state;
        default:
            return state;
    }
};

export default attacksReducer