const defaultState = {
    data: {
        paginate: {},
        category_name: "",
        list: []
    },
    status: "",
    message: ""
}

export default function wordsReducer (state = defaultState, action)
{
    switch (action.type){
        case 'RETURN_LIST':
            return { ...state, data: action.data, status: action.status }
        case 'RETURN_MY_WORD':
            return { ...state, data: action.data, status: action.status }
        case 'GET_LIST_FAILED':
            return { ...state, status: action.status, message: action.message }
        case 'LEARNT_SUCCESSFULLY':
            return { ...state, message: action.message, status: action.status }
        case 'UNLEARNT_SUCCESSFULLY':
            return { ...state, message: action.message, status: action.status }
        case 'UNLEARNT_FAILED':
        case 'LEARNT_FAILED':
            return { ...state, message: action.message, status: action.status }
        default:
            return state
    }
}