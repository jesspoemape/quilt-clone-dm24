import axios from 'axios';

const initialState = {
    setInfo: {},
    cards: [],
    studiedSets: [],
    studiedSetsInfo: [],
    searchRes: []
}



export default function reducer(state = initialState, action) {
    switch (action.type) {
        case ADD_SET + '_FULFILLED':
            console.log("set post fulfilled", action.payload);
            break;
        case GET_SET_INFO:
            return Object.assign({}, state, {setInfo: action.payload});
        case GET_CARDS:
            return Object.assign({}, state, {cards: action.payload});
        case GET_USER_SS:
            return Object.assign({}, state, {studiedSets: action.payload.studiedsets});
        case GET_SS_INFO:
            const thisTest = Object.assign({}, {studiedSetsInfo: [...state.studiedSetsInfo, action.payload]});
            function removeDupes(arrayOfObjects) {
                let newObj = new Set();
                arrayOfObjects.forEach(e => newObj.add(JSON.stringify(e)));
                let final = Array.from(newObj).map(e => JSON.parse(e));
                return final;
            }
            const cleaned = removeDupes(thisTest.studiedSetsInfo);
            return Object.assign({}, {studiedSetsInfo: cleaned}, {cards: state.cards}, {setInfo: state.setInfo} )
        case GET_SEARCH_RES:
            return Object.assign({}, {searchRes: action.payload});
        case CLEAN_SS_INFO:
            return Object.assign({}, {studiedSetsInfo: action.payload});
        case LOGOUT + '_FULFILLED':
            console.log('logged out');
            break;
        case LOGOUT + '_PENDING':
            console.log('logout pending');
            break;
        case LOGOUT +'_REJECTED':
            console.log('logout rejected');
            break;
        default: return state;
    }
}

// ACTION CREATOR CONSTANTS
const ADD_SET = 'ADD_SET';
const GET_SET_INFO = 'GET_SET_INFO';
const GET_CARDS = 'GET_CARDS';
const LOGOUT = 'LOGOUT';
const GET_USER_SS = 'GET_USER_SS';
const GET_SS_INFO = 'GET_SS_INFO';
const GET_SEARCH_RES = 'GET_SEARCH_RES';
const CLEAN_SS_INFO = 'CLEAN_SS_INFO';


// action creators
export function addSet(newSet) {
    const url = '/api/add-set';
    const response = axios.post(url, newSet).then(response => response.data).catch(console.error, 'Error');

    return {
        type: ADD_SET,
        payload: response
    }
}

export function getSetInfo(setRes) {
    return {
        type: GET_SET_INFO,
        payload: setRes[0]
    }
}
export function getCards(cardRes) {
    return {
        type: GET_CARDS,
        payload: cardRes
    }
}
export function getUserSS(userInfo) {
    return {
        type: GET_USER_SS,
        payload: userInfo
    }
}
export function getSSInfo(studiedSets) {
    return {
        type: GET_SS_INFO,
        payload: studiedSets[0]
    }
}

export function logout() {
    const url = '/auth/logout';
    const response = axios.get(url).then(response => response).catch(console.error, 'Error');

    return {
        type: LOGOUT,
        payload: response
    }
}
export function getSearchResults(sets) {
    return {
        type: GET_SEARCH_RES,
        payload: sets
    }
}
export function cleanSSInfo(ssinfo) {
    return {
        type: CLEAN_SS_INFO,
        payload: ssinfo
    }
}