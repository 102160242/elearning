const defaultState = {
    data: {
        paginate: {},
        list: []
    },
    question: {},
    options: {
        categories: [],
    },
    status: "",
    message: "",
    redirect: false
}

export default function adminQuestionsReducer(state = defaultState, action)
{
    switch (action.type){
        case 'GET__QUESTION_INFO_SUCCESSFULLY':
            return { ...state, question: action.data, status: action.status, redirect: false }
        case 'GET_OPTIONS_SUCCESSFULLY':
            return { ...state, options: action.options, status: action.status, redirect: false }
        case 'UPDATE_QUESTION_SUCCESSFULLY':
                return { ...state, status: action.status, redirect: true }
        case 'GET_LIST_SUCCESSFULLY':
            return { ...state, data: action.data, status: action.status, redirect: false }
        case 'CREATE_QUESTION_SUCCESSFULLY':
            return { ...state, message: action.message, status: action.status, redirect: true }
        case 'CREATE_QUESTION_FAILED':
        case 'GET__QUESTION_INFO_FAILED':
        case 'GET_OPTIONS_FAILED':
        case 'UPDATE_USER_FAILED':
        case 'GET_LIST_FAILED':
            return { ...state, message: action.message, status: action.status, redirect: false }
        case 'CLEAR_RESPONSE':
            return { ...state, status: "", message: "", redirect: false }
        default:
            return state
    }
}