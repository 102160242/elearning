import axios from 'axios';

export const getCategories = () => {
    return dispatch => {
        return axios.get(process.env.REACT_APP_API_URL + 'categories.json?all=true')
        .then(res => {
            console.log(res);
            if (res.status === 200) {
                var d = res.data;
                if (d.status === "success") {
                    dispatch(returnList(d.data));
                }
                else
                {
                    var msg = "Couldn't get data from server!" + res.status;
                    dispatch(getListFailed({"message": msg}));
                    console.log(msg);
                }
            }
            else {
                var msg = "Server returned error code: " + res.status;
                dispatch(getListFailed({"message": msg}));
                console.log(msg);
            }
        })
        .catch(error => console.log(error));
    }
}

const returnList = data => ({
    type: 'RETURN_LIST',
    status: 'success',
    list: data
});

const getListFailed = data => ({
    type: 'GET_LIST_FAILED',
    status: 'error',
    message: data
});

