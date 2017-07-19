import axios from 'axios';

const initialState = {
    something: ''
}
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case ADD_SET + '_FULFILLED':
            console.log("set post fulfilled", action.payload);
            break;
        case ADD_SET + '_PENDING':
            console.log('loading set post');
            break;
        case ADD_SET + '_REJECTED':
            console.log('set post rejected');
            break;
        case GET_SET + '_FULFILLED':
            console.log('get post fulfilled', action.payload)
            break;
        case GET_SET + '_PENDING':
            console.log('loading get post');
            break;
        case GET_SET + '_REJECTED':
            console.log('get post rejected');
            break;
        default: return state;
    }
}

// ACTION CREATOR CONSTANTS
const ADD_SET = 'ADD_SET';
const GET_SET = 'GET_SET';


// action creators
export function addSet(newSet) {
    const url = 'http://localhost:3001/api/add-set';
    const response = axios.post(url, newSet).then(response => response.data).catch(console.error, 'Error');

    return {
        type: ADD_SET,
        payload: response
    }
}

export function getSet(setId) {
    const url = `http://localhost:3001/api/get-set/${setId}`;
    const response = axios.get(url).then(response => response.data).catch(console.error, 'Error');

    return {
        type: GET_SET,
        payload: response
    }
}