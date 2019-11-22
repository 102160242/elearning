import axios from 'axios';

export const changeLoadingStatus = status => {
    return dispatch => {
        //console.log("Thay doi trang thai status sang " + status)
        return dispatch({
            type: 'CHANGE_LOADING_STATUS',
            isLoading: status
        });
    }
}
export const getStatistics = () => {
    return dispatch => {
        return axios.get(process.env.REACT_APP_API_URL + 'statistics')
        .then(res => {
            //console.log(res);
            if (res.status === 200) {
                var d = res.data;
                if (d.status === "success") {
                    dispatch(getStatisticsSuccessfully(d.data));
                }
                else
                {
                    var msg = "Couldn't get data from server!" + res.status;
                    dispatch(getStatisticsFailed({"message": msg}));
                    console.log(msg);
                }
            }
            else {
                var msg = "Server returned error code: " + res.status;
                dispatch(getStatisticsFailed({"message": msg}));
                console.log(msg);
            }
        })
        .catch(error => {
            console.log(error)
        });
    }
}

const getStatisticsSuccessfully = data => ({
    type: 'GET_STATISTICS_SUCCESSFULLY',
    statistics: data
});

const getStatisticsFailed = data => ({
    type: 'GET_STATISTICS_FAILED',
});

