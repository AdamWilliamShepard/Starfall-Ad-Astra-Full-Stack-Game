//Monsters need to be imported here from the DB
const monstersReducer = (state = {
}, action) => {
    switch (action.type) {
        case 'GET_MONSTERS':
            return state;
        default:
            return state;
    }
};

export default monstersReducer