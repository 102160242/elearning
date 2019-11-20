const defaultState = {
    data: {
        paginate: {},
        list: []
    },
    status: "",
    message: ""
}

export default function categoriesReducer(state = defaultState, action)
{
    switch (action.type) {
        case 'RETURN_LIST':
            return { ...state, data: action.data, status: action.status }
        case 'GET_LIST_FAILED':
            return { ...state, status: action.status, message: action.message }
        default:
            return state;
    }
}