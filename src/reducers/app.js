const defaultState = {
    isLoading: true
}

export default function appReducer(state = defaultState, action)
{
    switch (action.type) {
        case 'CHANGE_LOADING_STATUS':
            return { ...state, isLoading: action.isLoading }       
        default:
            return state;
    }
}