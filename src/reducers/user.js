const defaultState = {
    followersList: {},
    followingList: {},
    status: "",
    message: ""
}

export default function userReducer(state = defaultState, action)
{
    switch (action.type) {
        case 'GET_FOLLOWERS':
            return { ...state, followersList: action.followersList, status: action.status, message: action.message }
        case 'GET_FOLLOWING':
            return { ...state, followingList: action.followingList, status: action.status, message: action.message }
        case 'GET_FOLLOWING_FAILED':
        case 'GET_FOLLOWING_FAILED':
            return { ...state, status: action.status, message: action.message }
        default:
            return state;
    }
}