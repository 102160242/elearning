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
    message: ""
}

export default function adminCategoriesReducer(state = defaultState, action)
{
    switch (action.type) {
        case 'GET_LIST_SUCCESSFULLY':
        case 'UPDATE_CATEGORY_SUCCESSFULLY':
        case 'GET_INFO_SUCCESSFULLY': 
            return { ...state, data: action.data, status: action.status }
        case 'CREATE_CATEGORY_SUCCESSFULLY':
        case 'DELETE_CATEGORY_SUCCESSFULLY':
            return { ...state, status: action.status, message: action.message }
        case 'GET_LIST_FAILED':
        case 'CREATE_CATEGORY_FAILED':
        case 'UPDATE_CATEGORY_FAILED':
        case 'ADMIN_GET_INFO_FAILED':
        case 'DELETE_CATEGORY_FAILED':
            return { ...state, status: action.status, message: action.message }
        case 'CLEAR_RESPONSE':
            return { ...state, status: "", message: "" }
        default:
            return state;
    }
}