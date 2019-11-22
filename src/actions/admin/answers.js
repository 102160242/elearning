import axios from 'axios';
import {toastr} from 'react-redux-toastr';

export const getAnswers = (token, params) => {
    return dispatch => {
        return axios.get(process.env.REACT_APP_API_URL + 'admin/answers',
            { 
                params: params,
                headers: {
                    "Authorization": token,
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

export const deleteAnswer = (token, id) => {
    return dispatch => {
        return axios.delete(process.env.REACT_APP_API_URL + 'admin/answers/' + id,
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
                    dispatch(deleteAnswerSuccessfully(d.data));
                }
                else
                {
                    var msg = "Couldn't get data from server!" + res.status;
                    toastr.error(msg);
                    dispatch(deleteAnswerFailed({"message": msg}));
                    console.log(msg);
                }
            }
            else {
                var msg = "Server returned error code: " + res.status;
                toastr.error(msg);
                dispatch(deleteAnswerFailed({"message": msg}));
                console.log(msg);
            }
        })
        .catch(error => {
            toastr.error("Failed to get data from server!", error);
            console.log(error)
        });
    }
}

export const createAnswer = (token, formData) => {
    return dispatch => {
        return axios.post(process.env.REACT_APP_API_URL + 'admin/answers',
            formData,
            {
                headers: {
                    "Authorization": token,
                    'content-type': 'multipart/form-data'
                }
            }
        )
        .then(res => {
            if (res.status === 200) {
                var d = res.data;
                if (d.status === "success") {
                    toastr.success(d.message);
                    dispatch(createAnswerSuccessfully(d.data));
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
                        toastr.error("Failed to create new Answer!", msg);
                    }
                    dispatch(createAnswerFailed({"message": msg}));
                    console.log(msg);
                }
            }
            else {
                var msg = "Server returned error code: " + res.status;
                toastr.error(msg);
                dispatch(createAnswerFailed({"message": msg}));
                console.log(msg);
            }
        })
        .catch(error => {
            var msg = "";
            if(error.response && error.response.status == 401)
            {
                localStorage.removeItem(process.env.REACT_APP_TOKEN_KEY); // Delete Invalid Token (if exist)
                dispatch(createAnswerFailed({ 'message': 'Invalid Token' }));
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
            dispatch(createAnswerFailed({"message": msg}));
        });
    }
}

export const updateAnswer = (token, formData, id) => {
    return dispatch => {
        return axios.patch(process.env.REACT_APP_API_URL + '/admin/answers/' + id,
            formData,
            {
                idid: id,
                headers: {
                    "Authorization": token,
                    'content-type': 'multipart/form-data'
                }
            }
        )
        .then(res => {
            if (res.status === 200) {
                var d = res.data;
                if (d.status === "success") {
                    toastr.success(d.message);
                    dispatch(updateAnswerSuccessfully(d.data));
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
                        toastr.error("Failed to create new Answer!", msg);
                    }
                    dispatch(updateAnswerFailed({"message": msg}));
                    console.log(msg);
                }
            }
            else {
                var msg = "Server returned error code: " + res.status;
                toastr.error(msg);
                dispatch(updateAnswerFailed({"message": msg}));
                console.log(msg);
            }
        })
        .catch(error => {
            var msg = "";
            if(error.response && error.response.status == 401)
            {
                localStorage.removeItem(process.env.REACT_APP_TOKEN_KEY); // Delete Invalid Token (if exist)
                dispatch(updateAnswerFailed({ 'message': 'Invalid Token' }));
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
            dispatch(updateAnswerFailed({"message": msg}));
        });
    }
}

export const getAnswerInfo = (token, id) => {
    return dispatch => {
        return axios.get(process.env.REACT_APP_API_URL + 'admin/answers/'+ id + "/edit",
                    { 
                        id: id,
                        headers: {
                            "Authorization": token
                        }}
        )
        .then(res => {
            if (res.status === 200) {
                var d = res.data;
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

const getListFailed = data => ({
    type: 'GET_LIST_FAILED',
    status: 'error',
    message: data
});
const deleteAnswerSuccessfully = data => ({
    type: 'DELETE_ANSWER_SUCCESSFULLY',
    status: 'success',
    message: data
});
const deleteAnswerFailed = data => ({
    type: 'DELETE_ANSWER_FAILED',
    status: 'error',
    message: data.message
});
const createAnswerSuccessfully = data => ({
    type: 'CREATE_ANSWER_SUCCESSFULLY',
    status: 'success',
    message: data
});
const createAnswerFailed = data => ({
    type: 'CREATE_ANSWER_FAILED',
    status: 'error',
    message: data.message
});

const getInfoSuccessfully = data => ({
    type: 'GET_INFO_SUCCESSFULLY',
    status: 'success',
    data: data
});

const getInfoFailed = data => ({
    type: 'ADMIN_GET_INFO_FAILED',
    status: 'error',
    message: data
});

const updateAnswerSuccessfully = data => ({
    type: 'UPDATE_ANSWER_SUCCESSFULLY',
    status: 'success',
    message: data
});

const updateAnswerFailed = data => ({
    type: 'UPDATE_ANSWER_FAILED',
    status: 'error',
    message: data.message
});