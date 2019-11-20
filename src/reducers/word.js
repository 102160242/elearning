const defaultState = {
    list: [],
    status: "",
    message: ""
}

export default function wordsReducer (state = defaultState, action)
{
    switch (action.type){
        case 'RETURN_LIST':
            return { ...state, list: action.list, status: action.status }
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