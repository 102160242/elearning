const defaultState = {
    currentUser: {},
    api_url: process.env.REACT_APP_API_URL
}

export default function reducer(state = defaultState, action)
{
    switch (action.type) {
        case 'LOGIN_USER':
            //console.log(action.payload)
            return { ...state, currentUser: action.payload.data }
        default:
            return state;
    }
}