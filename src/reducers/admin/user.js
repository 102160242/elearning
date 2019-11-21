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
    status: "",
    message: ""
}

export default function adminUsersReducer(state = defaultState, action)
{
    switch (action.type) {
        case 'GET_LIST_SUCCESSFULLY':
            return { ...state, data: action.data, status: action.status }
        case 'CREATE_USER_SUCCESSFULLY':
        case 'DELETE_USER_SUCCESSFULLY':
        case 'GET_LIST_FAILED':
        case 'CREATE_USER_FAILED':
        case 'DELETE_USER_FAILED':
            return { ...state, status: action.status, message: action.message }
        case 'CLEAR_RESPONSE':
            return { ...state, status: "", message: "" }
        default:
            return state;
    }
}