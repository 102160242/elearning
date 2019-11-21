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
            return { ...state, data: action.data, status: action.status }
        case 'DELETE_CATEGORY_SUCCESSFULLY':
        case 'ADMIN_GET_LIST_FAILED':
        case 'DELETE_CATEGORY_FAILED':
            return { ...state, status: action.status, message: action.message }
        default:
            return state;
    }
}