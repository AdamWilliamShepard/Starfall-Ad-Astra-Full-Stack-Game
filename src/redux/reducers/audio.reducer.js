//Monsters need to be imported here from the DB
const audioReducer = (state = { 
    Map: new Howl({
        src: require('../../components/Audio/map.wav'),
        html5: true
    })
}, action) => {
    switch (action.type) {
        case 'GET_AUDIO':
            return state;
        default:
            return state;
    }
};

export default audioReducer