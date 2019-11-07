export const changeLoadingStatus = status => {
    return dispatch => {
        return dispatch({
            type: 'CHANGE_LOADING_STATUS',
            isLoading: status
        });
    }
}