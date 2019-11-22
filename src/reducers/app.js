const defaultState = {
    isLoading: true,
    statistics: {
        total_users: 0,
        total_questions: 0,
        total_categories: 0,
        total_words: 0,
        total_tests: 0,
    }
}

export default function appReducer(state = defaultState, action)
{
    switch (action.type) {
        case 'CHANGE_LOADING_STATUS':
            return { ...state, isLoading: action.isLoading }
        case 'GET_STATISTICS_SUCCESSFULLY':
            return { ...state, statistics: action.statistics } 
        case 'GET_STATISTICS_FAILED':   
        default:
            return state;
    }
}