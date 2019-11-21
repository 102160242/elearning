const defaultState = {
    followersData: {
        paginate: {
            // current_page => 0,
            // previous_page =>0,
            // next_page: 0,
            // last_page: 0
        },
        list: []
    },
    followingData: {
        paginate: {

        },
        list: []
    },
    newsFeed: {
        timeline: [],
        user_info: {}
    },
    status: "",
    message: ""
}

export default function userReducer(state = defaultState, action)
{
    switch (action.type) {
        case 'GET_FOLLOWERS':
            return { ...state, followersData: action.followersData, status: action.status, message: action.message }
        case 'GET_FOLLOWING':
            return { ...state, followingData: action.followingData, status: action.status, message: action.message }
        case 'UPDATE_USER_SUCCESSFULLY':
            return { ...state, status: action.status, message: action.message }
        case 'UNFOLLOW_USER_SUCCESSFULLY':
            return {...state, status: action.status, message: action.message }
        case 'FOLLOW_USER_SUCCESSFULLY':
                return {...state, status: action.status, message: action.message }
        case 'GET_NEWS_FEED_SUCCESSFULLY':
            return {...state, status: action.status, newsFeed: action.newsFeed }
        case 'UPDATE_USER_FAILED':
        case 'UNFOLLOW_USER_FAILED':
        case 'FOLLOW_USER_FAILED':
        case 'GET_FOLLOWING_FAILED':
        case 'GET_NEWS_FEED_FAILED':
            return { ...state, status: action.status, message: action.message }
        default:
            return state;
    }
}