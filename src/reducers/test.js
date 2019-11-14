const defaultState = {
    test: [],
    answer_ids: {},
    status: "",
    message: ""
}

export default function testReducer(state = defaultState, action)
{
    switch (action.type) {
        case 'GET_TEST_SUCCESSFULLY':
        case 'SUBMIT_TEST_SUCCESSFULLY':
        case 'CREATE_NEW_TEST_SUCCESSFULLY':
            return { ...state, test: action.test, status: action.status }
        case 'GET_TEST_FAILED':
        case 'SUBMIT_TEST_FAILED':
        case 'CREATE_TEST_FAILED':
            return { ...state, status: action.status, message: action.message }
        default:
            return state;
    }
}