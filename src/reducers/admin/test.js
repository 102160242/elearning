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
    switch (action.type) {
        case 'UPDATE_TEST_SUCCESSFULLY':
            return { ...state, status: action.status, redirect: true }
        case 'GET__INFO_SUCCESSFULLY': 
            return { ...state, test: action.data, status: action.status, redirect: false }
        case 'GET_LIST_SUCCESSFULLY':
            return { ...state, data: action.data, status: action.status, redirect: false }
        case 'CREATE_TEST_SUCCESSFULLY':
            return { ...state, status: action.status, message: action.message, redirect: true }
        case 'DELETE_TEST_SUCCESSFULLY':
            return { ...state, status: action.status, message: action.message, redirect: false }
        case 'GET_LIST_FAILED':
        case 'CREATE_TEST_FAILED':
        case 'UPDATE_TEST_FAILED':
        case 'ADMIN_GET_INFO_FAILED':
        case 'DELETE_TEST_FAILED':
            return { ...state, status: action.status, message: action.message, redirect: false }
        case 'CLEAR_RESPONSE':
            return { ...state, status: "", message: "", redirect: false }
        default:
            return state;
    }
}