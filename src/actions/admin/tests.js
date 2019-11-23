import axios from 'axios';
import {toastr} from 'react-redux-toastr';

export const getTests = (token, params) => {
    return dispatch => {
        return axios.get(process.env.REACT_APP_API_URL + 'admin/tests',
            { 
                params: params,
                headers: {
                    "Authorization": token
                }
            }
        )
        .then(res => {
            if (res.status === 200) {
                var d = res.data;
                if (d.status === "success") {
                    dispatch(getListSuccessfully(d.data));
                }
                else
                {
                    var msg = "Couldn't get data from server!" + res.status;
                    toastr.error(msg);
                    dispatch(getListFailed({"message": msg}));
                    console.log(msg);
                }
            }
            else {
                var msg = "Server returned error code: " + res.status;
                toastr.error(msg);
                dispatch(getListFailed({"message": msg}));
                console.log(msg);
            }
        })
        .catch(error => {
            toastr.error("Failed to get data from server!", error);
            console.log(error)
        });
    }
}
export const getTestInfo = (token, id) => {
    return dispatch => {
        return axios.get(process.env.REACT_APP_API_URL + 'admin/tests/'+ id,
                    { 
                        id: id,
                        headers: {
                            "Authorization": token
                        }}
        )
        .then(res => {
            if (res.status === 200) {
                var d = res.data;
                // console.log(d.category)
                if (d.status === "success") {
                    dispatch(getInfoSuccessfully(d.data));
                }
                else
                {
                    var msg = "Couldn't get data from server!" + res.status;
                    toastr.error(msg);
                    dispatch(getInfoFailed({"message": msg}));
                    console.log(msg);
                }
            }
            else {
                var msg = "Server returned error code: " + res.status;
                toastr.error(msg);
                dispatch(getInfoFailed({"message": msg}));
                console.log(msg);
            }
        })
        .catch(error => {
            toastr.error("Failed to get data from server!", error);
            console.log(error)
        });
    }
}
export const createTest = (token, data) => {
    return dispatch => {
        return axios.post(process.env.REACT_APP_API_URL + 'admin/tests',
            {
                test: data
            },
            {
                headers: {
                    "Authorization": token,
                }
            }
        )
        .then(res => {
            if (res.status === 200) {
                var d = res.data;
                if (d.status === "success") {
                    toastr.success(d.message);
                    dispatch(createTestSuccessfully(d.data));
                }
                else
                {
                    var keys = Object.keys(d.message);
                    //console.log("Key: " + keys);
                    for (var i = 0; i < keys.length; i++) {
                        var msg = "";
                        //console.log("Length: " + d.message[keys[i]].length)
                        for (var j = 0; j < d.message[keys[i]].length; j++) {
                            var nameCapitalized = keys[i].charAt(0).toUpperCase() + keys[i].slice(1);
                            msg += nameCapitalized + " " + d.message[keys[i]][j] + ". ";
                        }
                        toastr.error("Failed to create new Word!", msg);
                    }
                    dispatch(createTestFailed({"message": msg}));
                    console.log(msg);
                }
            }
            else {
                var msg = "Server returned error code: " + res.status;
                toastr.error(msg);
                dispatch(createTestFailed({"message": msg}));
                console.log(msg);
            }
        })
        .catch(error => {
            var msg = "";
            if(error.response && error.response.status == 401)
            {
                localStorage.removeItem(process.env.REACT_APP_TOKEN_KEY); // Delete Invalid Token (if exist)
                dispatch(createTestFailed({ 'message': 'Invalid Token' }));
                var msg = "Failed to send data to Server!";
                console.log(msg);
                toastr.error("", msg);
            }
            else
            {
                msg = error;
                toastr.error("Failed to get data from server!", msg);
                console.log(error)
            }
            dispatch(createTestFailed({"message": msg}));
        });
    }
}

export const deleteTest = (token, id) => {
    return dispatch => {
        return axios.delete(process.env.REACT_APP_API_URL + 'admin/tests/' + id,
            {
                headers: {
                    "Authorization": token
                }
            }
        )
        .then(res => {
            if (res.status === 200) {
                var d = res.data;
                if (d.status === "success") {
                    toastr.success(d.message);
                    dispatch(deleteTestSuccessfully(d.data));
                }
                else
                {
                    var msg = "Couldn't get data from server!" + res.status;
                    toastr.error(msg);
                    dispatch(deleteTestFailed({"message": msg}));
                    console.log(msg);
                }
            }
            else {
                var msg = "Server returned error code: " + res.status;
                toastr.error(msg);
                dispatch(deleteTestFailed({"message": msg}));
                console.log(msg);
            }
        })
        .catch(error => {
            toastr.error("Failed to get data from server!", error);
            console.log(error)
        });
    }
}

export const getOptions = (token) => {
    return dispatch => {
        return axios.get(process.env.REACT_APP_API_URL + 'admin/tests/options',
            { 
                headers: {
                    "Authorization": token,
                }
            }
        )
        .then(res => {
            if (res.status === 200) {
                var d = res.data;
                if (d.status === "success") {
                    dispatch(getOptionsSuccessfully(d.data));
                }
                else
                {
                    var msg = "Couldn't get data from server!" + res.status;
                    toastr.error(msg);
                    dispatch(getOptionsFailed({"message": msg}));
                    console.log(msg);
                }
            }
            else {
                var msg = "Server returned error code: " + res.status;
                toastr.error(msg);
                dispatch(getOptionsFailed({"message": msg}));
                console.log(msg);
            }
        })
        .catch(error => {
            toastr.error("Failed to get data from server!", error);
            console.log(error)
        });
    }
}

export const clearResponse = () => {
    return dispatch => {
        dispatch({
            type: 'CLEAR_RESPONSE'
        })
    }
}
const getListSuccessfully = data => ({
    type: 'GET_LIST_SUCCESSFULLY',
    status: 'success',
    data: data
});
const getOptionsSuccessfully = data => ({
    type: 'GET_OPTIONS_SUCCESSFULLY',
    status: 'success',
    options: data
});
const getOptionsFailed = data => ({
    type: 'GET_OPTIONS_FAILED',
    status: 'error',
});
const getListFailed = data => ({
    type: 'GET_LIST_FAILED',
    status: 'error',
    message: data
});
const deleteTestSuccessfully = data => ({
    type: 'DELETE_TEST_SUCCESSFULLY',
    status: 'success',
    message: data
});
const deleteTestFailed = data => ({
    type: 'DELETE_TEST_FAILED',
    status: 'error',
    message: data.message
});
const createTestSuccessfully = data => ({
    type: 'CREATE_TEST_SUCCESSFULLY',
    status: 'success',
    message: data
});
const createTestFailed = data => ({
    type: 'CREATE_TEST_FAILED',
    status: 'error',
    message: data.message
});
const getInfoSuccessfully = data => ({
    type: 'GET__INFO_SUCCESSFULLY',
    status: 'success',
    data: data
});

const getInfoFailed = data => ({
    type: 'ADMIN_GET_INFO_FAILED',
    status: 'error',
    message: data
});