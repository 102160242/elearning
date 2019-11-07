export const changeLoadingStatus = status => {
    return dispatch => {
        console.log("Thay doi trang thai status sang " + status)
        return dispatch({
            type: 'CHANGE_LOADING_STATUS',
            isLoading: status
        });
    }
}