const initialState = {
    something: ''
}
export default function reducer(state = initialState, action) {
    return state;
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