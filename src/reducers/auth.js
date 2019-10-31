const defaultState = {
    requestResponse: {
        status: "",
        message: ""
    },
    currentUser: {}
    //api_url: process.env.REACT_APP_API_URL
}

export default function authReducer(state = defaultState, action)
{
    switch (action.type) {
        case 'LOGIN_USER':
            return { ...state, requestResponse: action.requestResponse, currentUser: action.currentUser }
        case 'REGISTRATION_FAILED':
            return { ...state, requestResponse: action.requestResponse }
        default:
            return state;
    }
}