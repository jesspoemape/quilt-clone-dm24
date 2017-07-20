import axios from 'axios';

const initialState = {
    setInfo: {
        "id": "415",
        "title": "U.S. State Capitals",
        "creatorname": "asuth",
        "creatorid": "1",
        "numofterms": 50,
        "description": "All the US states and their capitals"
    },
    cards: [
    {
        "id": "413281845",
        "setid": "415",
        "term": "Arizona",
        "definition": "Phoenix",
        "imageurl": null
    },
    {
        "id": "413281846",
        "setid": "415",
        "term": "Arkansas",
        "definition": "Little Rock",
        "imageurl": null
    },
    {
        "id": "413281847",
        "setid": "415",
        "term": "California",
        "definition": "Sacramento",
        "imageurl": null
    },
    {
        "id": "413281848",
        "setid": "415",
        "term": "Colorado",
        "definition": "Denver",
        "imageurl": null
    },
    {
        "id": "413281849",
        "setid": "415",
        "term": "Connecticut",
        "definition": "Hartford",
        "imageurl": null
    },
    {
        "id": "413281850",
        "setid": "415",
        "term": "Delaware",
        "definition": "Dover",
        "imageurl": null
    },
    {
        "id": "413281851",
        "setid": "415",
        "term": "Florida",
        "definition": "Tallahassee",
        "imageurl": null
    },
    {
        "id": "413281852",
        "setid": "415",
        "term": "Georgia",
        "definition": "Atlanta",
        "imageurl": null
    },
    {
        "id": "413281853",
        "setid": "415",
        "term": "Hawaii",
        "definition": "Honolulu",
        "imageurl": null
    },
    {
        "id": "413281854",
        "setid": "415",
        "term": "Idaho",
        "definition": "Boise",
        "imageurl": null
    },
    {
        "id": "413281855",
        "setid": "415",
        "term": "Illinois",
        "definition": "Springfield",
        "imageurl": null
    },
    {
        "id": "413281856",
        "setid": "415",
        "term": "Indiana",
        "definition": "Indianapolis",
        "imageurl": null
    },
    {
        "id": "413281857",
        "setid": "415",
        "term": "Iowa",
        "definition": "Des Moines",
        "imageurl": null
    },
    {
        "id": "413281858",
        "setid": "415",
        "term": "Kansas",
        "definition": "Topeka",
        "imageurl": null
    },
    {
        "id": "413281859",
        "setid": "415",
        "term": "Kentucky",
        "definition": "Frankfort",
        "imageurl": null
    },
    {
        "id": "413281860",
        "setid": "415",
        "term": "Louisiana",
        "definition": "Baton Rouge",
        "imageurl": null
    },
    {
        "id": "413281861",
        "setid": "415",
        "term": "Maine",
        "definition": "Augusta",
        "imageurl": null
    },
    {
        "id": "413281862",
        "setid": "415",
        "term": "Maryland",
        "definition": "Annapolis",
        "imageurl": null
    },
    {
        "id": "413281863",
        "setid": "415",
        "term": "Massachusetts",
        "definition": "Boston",
        "imageurl": null
    },
    {
        "id": "413281864",
        "setid": "415",
        "term": "Michigan",
        "definition": "Lansing",
        "imageurl": null
    },
    {
        "id": "413281865",
        "setid": "415",
        "term": "Minnesota",
        "definition": "St. Paul",
        "imageurl": null
    },
    {
        "id": "413281866",
        "setid": "415",
        "term": "Mississippi",
        "definition": "Jackson",
        "imageurl": null
    },
    {
        "id": "413281867",
        "setid": "415",
        "term": "Missouri",
        "definition": "Jefferson City",
        "imageurl": null
    },
    {
        "id": "413281868",
        "setid": "415",
        "term": "Montana",
        "definition": "Helena",
        "imageurl": null
    },
    {
        "id": "413281869",
        "setid": "415",
        "term": "Nebraska",
        "definition": "Lincoln",
        "imageurl": null
    },
    {
        "id": "413281870",
        "setid": "415",
        "term": "Nevada",
        "definition": "Carson City",
        "imageurl": null
    },
    {
        "id": "413281871",
        "setid": "415",
        "term": "New Hampshire",
        "definition": "Concord",
        "imageurl": null
    },
    {
        "id": "413281872",
        "setid": "415",
        "term": "New Jersey",
        "definition": "Trenton",
        "imageurl": null
    },
    {
        "id": "413281873",
        "setid": "415",
        "term": "New Mexico",
        "definition": "Santa Fe",
        "imageurl": null
    },
    {
        "id": "413281874",
        "setid": "415",
        "term": "New York",
        "definition": "Albany",
        "imageurl": null
    },
    {
        "id": "413281875",
        "setid": "415",
        "term": "North Carolina",
        "definition": "Raleigh",
        "imageurl": null
    },
    {
        "id": "413281876",
        "setid": "415",
        "term": "North Dakota",
        "definition": "Bismarck",
        "imageurl": null
    },
    {
        "id": "413281877",
        "setid": "415",
        "term": "Ohio",
        "definition": "Columbus",
        "imageurl": null
    },
    {
        "id": "413281878",
        "setid": "415",
        "term": "Oklahoma",
        "definition": "Oklahoma City",
        "imageurl": null
    },
    {
        "id": "413281879",
        "setid": "415",
        "term": "Oregon",
        "definition": "Salem",
        "imageurl": null
    },
    {
        "id": "413281880",
        "setid": "415",
        "term": "Pennsylvania",
        "definition": "Harrisburg",
        "imageurl": null
    },
    {
        "id": "413281881",
        "setid": "415",
        "term": "Rhode Island",
        "definition": "Providence",
        "imageurl": null
    },
    {
        "id": "413281882",
        "setid": "415",
        "term": "South Carolina",
        "definition": "Columbia",
        "imageurl": null
    },
    {
        "id": "413281883",
        "setid": "415",
        "term": "South Dakota",
        "definition": "Pierre",
        "imageurl": null
    },
    {
        "id": "413281884",
        "setid": "415",
        "term": "Tennessee",
        "definition": "Nashville",
        "imageurl": null
    },
    {
        "id": "413281885",
        "setid": "415",
        "term": "Texas",
        "definition": "Austin",
        "imageurl": null
    },
    {
        "id": "413281886",
        "setid": "415",
        "term": "Utah",
        "definition": "Salt Lake City",
        "imageurl": null
    },
    {
        "id": "413281887",
        "setid": "415",
        "term": "Vermont",
        "definition": "Montpelier",
        "imageurl": null
    },
    {
        "id": "413281888",
        "setid": "415",
        "term": "Virginia",
        "definition": "Richmond",
        "imageurl": null
    },
    {
        "id": "413281889",
        "setid": "415",
        "term": "Washington",
        "definition": "Olympia",
        "imageurl": null
    },
    {
        "id": "413281890",
        "setid": "415",
        "term": "West Virginia",
        "definition": "Charleston",
        "imageurl": null
    },
    {
        "id": "413281891",
        "setid": "415",
        "term": "Wisconsin",
        "definition": "Madison",
        "imageurl": null
    },
    {
        "id": "413281892",
        "setid": "415",
        "term": "Wyoming",
        "definition": "Cheyenne",
        "imageurl": null
    },
    {
        "id": "842513565",
        "setid": "415",
        "term": "Alaska",
        "definition": "Juneau",
        "imageurl": null
    },
    {
        "id": "1277349735",
        "setid": "415",
        "term": "Alabama",
        "definition": "Montgomery",
        "imageurl": null
    }
]
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
const GET_SET = 'GET_SET';
const LOGOUT = 'LOGOUT';


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

export function logout() {
    const url = '/auth/logout';
    const response = axios.get(url).then(response => response).catch(console.error, 'Error');

    return {
        type: LOGOUT,
        payload: response
    }
}