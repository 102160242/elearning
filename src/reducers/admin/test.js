const defaultState = {
    data: {
        paginate: {},
        list: []
    },
    options: {
        categories: [],
        users: [],
    },
    test: {},
    status: "",
    message: "",
    redirect: false
}

export default function adminTestsReducer(state = defaultState, action)
{
    switch (action.type){
        case 'GET_OPTIONS_SUCCESSFULLY':
            return { ...state, options: action.options, status: action.status, redirect: false }
        case 'GET__INFO_SUCCESSFULLY': 
            return { ...state, test: action.data, status: action.status, redirect: false }
        case 'GET_LIST_SUCCESSFULLY':
            return { ...state, data: action.data, status: action.status, redirect: false }
        case 'CREATE_TEST_SUCCESSFULLY':
            return { ...state, message: action.message, status: action.status, redirect: true }
        case 'CREATE_TEST_FAILED':
        case 'GET_OPTIONS_FAILED':
        case 'ADMIN_GET_INFO_FAILED':
        case 'GET_LIST_FAILED':
            return { ...state, message: action.message, status: action.status, redirect: false }
        case 'CLEAR_RESPONSE':
            return { ...state, status: "", message: "", redirect: false }
        default:
            return state
    }
}