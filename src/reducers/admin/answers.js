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
    status: "",
    message: "",
    redirect: false
}

export default function adminAnswersReducer(state = defaultState, action)
{
    switch (action.type) {
        case 'GET_LIST_SUCCESSFULLY':
        case 'UPDATE_ANSWER_SUCCESSFULLY':
        case 'GET_INFO_SUCCESSFULLY': 
            return { ...state, data: action.data, status: action.status, redirect: false }
        case 'CREATE_ANSWER_SUCCESSFULLY':
            return { ...state, status: action.status, message: action.message, redirect: true }
        case 'DELETE_ANSWER_SUCCESSFULLY':
            return { ...state, status: action.status, message: action.message, redirect: false }
        case 'GET_LIST_FAILED':
        case 'CREATE_ANSWER_FAILED':
        case 'UPDATE_ANSWER_FAILED':
        case 'ADMIN_GET_INFO_FAILED':
        case 'DELETE_ANSWER_FAILED':
            return { ...state, status: action.status, message: action.message, redirect: false }
        case 'CLEAR_RESPONSE':
            return { ...state, status: "", message: "", redirect: false }
        default:
            return state;
    }
}