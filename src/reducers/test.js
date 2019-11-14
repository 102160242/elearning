const defaultState = {
    test: [],
    answer_ids: {},
    status: "",
}

export default function testReducer(state = defaultState, action)
{
    switch (action.type) {
        case 'GET_TEST_SUCCESSFULLY':
            return { ...state, test: action.test, status: action.status }
        case 'SUBMIT_TEST_SUCCESSFULLY':
            return { ...state, test: action.test, status: action.status }
        case 'GET_TEST_FAILED':
            return { ...state, status: action.status }
        case 'SUBMIT_TEST_FAILED':
            return { ...state, status: action.status }
        default:
            return state;
    }
}