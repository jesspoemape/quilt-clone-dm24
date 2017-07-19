import axios from 'axios';

const initialState = {
    setInfo: {},
    cards: []
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
            console.log('in reducer')
            return Object.assign({}, {
                setInfo: action.payload.setRes[0]
            });
        case GET_SET + '_PENDING':
            console.log('loading get set');
            break;
        case GET_SET + '_REJECTED':
            console.log('get set rejected');
            break;
        default: return state;
    }
}

// ACTION CREATOR CONSTANTS
const ADD_SET = 'ADD_SET';
const GET_SET = 'GET_SET';


// action creators
export function addSet(newSet) {
    const url = '/api/add-set';
    const response = axios.post(url, newSet).then(response => response.data).catch(console.error, 'Error');

    return {
        type: ADD_SET,
        payload: response
    }
}

export function getSet(setId) {
    const setUrl = `/api/get-set-info/${setId}`;
    const setRes = axios.get(setUrl).then(response => response.data).catch(console.error, 'Error');

    // const cardsUrl = `/api/get-cards/${setId}`;
    // const cardsRes = axios.get(cardsUrl).then(response => response.data).catch(console.error, 'Error');

    return {
        type: GET_SET,
        payload: {setRes}
    }
}