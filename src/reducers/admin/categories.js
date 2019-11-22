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
    category: [],
    status: "",
    message: "",
    redirect: false
}

export default function adminCategoriesReducer(state = defaultState, action)
{
    switch (action.type) {
        case 'UPDATE_CATEGORY_SUCCESSFULLY':
            return { ...state, status: action.status, redirect: true }
        case 'GET_INFO_SUCCESSFULLY': 
            return { ...state, category: action.data, status: action.status, redirect: false }
        case 'GET_LIST_SUCCESSFULLY':
            return { ...state, data: action.data, status: action.status, redirect: false }
        case 'CREATE_CATEGORY_SUCCESSFULLY':
            return { ...state, status: action.status, message: action.message, redirect: true }
        case 'DELETE_CATEGORY_SUCCESSFULLY':
            return { ...state, status: action.status, message: action.message, redirect: false }
        case 'GET_LIST_FAILED':
        case 'CREATE_CATEGORY_FAILED':
        case 'UPDATE_CATEGORY_FAILED':
        case 'ADMIN_GET_INFO_FAILED':
        case 'DELETE_CATEGORY_FAILED':
            return { ...state, status: action.status, message: action.message, redirect: false }
        case 'CLEAR_RESPONSE':
            return { ...state, status: "", message: "", redirect: false }
        default:
            return state;
    }
}