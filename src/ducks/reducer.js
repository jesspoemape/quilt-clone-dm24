const initialState = {
    something: ''
}
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case ADD_SET:
            console.log("in reducer", action.payload);
            break;
        default: return state;
    }
}

// ACTION CREATOR CONSTANTS
const ADD_SET = 'ADD_SET';


// action creators
export function addSet(newSet) {
    return {
        type: ADD_SET,
        payload: newSet
    }
}