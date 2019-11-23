const defaultState = {
    data: {
        paginate: {
            last_page: 1,
            first_page: 1,
            current_page: 1,
            previous_page: false,
            next_page: false
        },
        list: []
    },
    user: {},
    newsFeed: {
        timeline: [],
        user_info: {}
    },
    status: "",
    message: "",
    redirect: false,
}

export default function adminUsersReducer(state = defaultState, action)
{
    switch (action.type) {
        case 'GET__USER_INFO_SUCCESSFULLY':
            return { ...state, user: action.user, status: action.status, redirect: false }
        case 'UPDATE_USER_SUCCESSFULLY':
            return { ...state, status: action.status, redirect: true }
        case 'GET_LIST_SUCCESSFULLY':
            return { ...state, data: action.data, status: action.status, redirect: false }
        case 'CREATE_USER_SUCCESSFULLY':
            return { ...state, status: action.status, redirect: true }
        case 'GET_NEWS_FEED_SUCCESSFULLY':
            return {...state, status: action.status, newsFeed: action.newsFeed }
        case 'DELETE_USER_SUCCESSFULLY':
        case 'GET_LIST_FAILED':
        case 'CREATE_USER_FAILED':
        case 'UPDATE_USER_FAILED':
        case 'DELETE_USER_FAILED':
        case 'GET_USER_INFO_FAILED':
        case 'GET_NEWS_FEED_FAILED':
            return { ...state, status: action.status, message: action.message, redirect: false }
        case 'CLEAR_RESPONSE':
            return { ...state, status: "", message: "", redirect: false }
        default:
            return state;
    }
}