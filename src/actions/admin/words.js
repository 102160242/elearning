import axios from 'axios';
import {toastr} from 'react-redux-toastr';

export const getWords = (token, params) => {
    return dispatch => {
        return axios.get(process.env.REACT_APP_API_URL + 'admin/words',
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

export const getWordInfo = (token, id) => {
    return dispatch => {
        return axios.get(process.env.REACT_APP_API_URL + 'admin/words/'+ id,
                    { 
                        id: id,
                        headers: {
                            "Authorization": token
                        }}
        )
        .then(res => {
            if (res.status === 200) {
                var d = res.data;
                // console.log(d.user)
                if (d.status === "success") {
                    //console.log(d.data)
                    dispatch(getWordInfoSuccessfully(d.data));
                }
                else
                {
                    var msg = "Couldn't get data from server!" + res.status;
                    toastr.error(msg);
                    dispatch(getWordInfoFailed({"message": msg}));
                    console.log(msg);
                }
            }
            else {
                var msg = "Server returned error code: " + res.status;
                toastr.error(msg);
                dispatch(getWordInfoFailed({"message": msg}));
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
        return axios.get(process.env.REACT_APP_API_URL + 'admin/words/options/data',
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

export const deleteWord = (token, id) => {
    return dispatch => {
        return axios.delete(process.env.REACT_APP_API_URL + 'admin/words/' + id,
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
                    dispatch(deleteWordSuccessfully(d.data));
                }
                else
                {
                    var msg = "Couldn't get data from server!" + res.status;
                    toastr.error(msg);
                    dispatch(deleteWordFailed({"message": msg}));
                    console.log(msg);
                }
            }
            else {
                var msg = "Server returned error code: " + res.status;
                toastr.error(msg);
                dispatch(deleteWordFailed({"message": msg}));
                console.log(msg);
            }
        })
        .catch(error => {
            toastr.error("Failed to get data from server!", error);
            console.log(error)
        });
    }
}

export const createWord = (token, formData) => {
    return dispatch => {
        return axios.post(process.env.REACT_APP_API_URL + 'admin/words',
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
                    dispatch(createWordSuccessfully(d.data));
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
                    dispatch(createWordFailed({"message": msg}));
                    console.log(msg);
                }
            }
            else {
                var msg = "Server returned error code: " + res.status;
                toastr.error(msg);
                dispatch(createWordFailed({"message": msg}));
                console.log(msg);
            }
        })
        .catch(error => {
            var msg = "";
            if(error.response && error.response.status == 401)
            {
                localStorage.removeItem(process.env.REACT_APP_TOKEN_KEY); // Delete Invalid Token (if exist)
                dispatch(createWordFailed({ 'message': 'Invalid Token' }));
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
            dispatch(createWordFailed({"message": msg}));
        });
    }
}

export const updateWord = (token, formData, id) => {
    return dispatch => {
        return axios.patch(process.env.REACT_APP_API_URL + 'admin/words/' + id,
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
                    dispatch(updateWordSuccessfully(d.data));
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
                        toastr.error("Failed to update user!", msg);
                    }
                    dispatch(updateWordFailed({"message": msg}));
                    console.log(msg);
                }
            }
            else {
                var msg = "Server returned error code: " + res.status;
                toastr.error(msg);
                dispatch(updateWordFailed({"message": msg}));
                console.log(msg);
            }
        })
        .catch(error => {
            var msg = "";
            if(error.response && error.response.status == 401)
            {
                localStorage.removeItem(process.env.REACT_APP_TOKEN_KEY); // Delete Invalid Token (if exist)
                dispatch(updateWordFailed({ 'message': 'Invalid Token' }));
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
            dispatch(updateWordFailed({"message": msg}));
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
const deleteWordSuccessfully = data => ({
    type: 'DELETE_WORD_SUCCESSFULLY',
    status: 'success',
    message: data
});
const deleteWordFailed = data => ({
    type: 'DELETE_WORD_FAILED',
    status: 'error',
    message: data.message
});
const createWordSuccessfully = data => ({
    type: 'CREATE_WORD_SUCCESSFULLY',
    status: 'success',
    message: data
});
const createWordFailed = data => ({
    type: 'CREATE_WORD_FAILED',
    status: 'error',
    message: data.message
});

const getWordInfoSuccessfully = data => ({
    type: 'GET__WORD_INFO_SUCCESSFULLY',
    status: 'success',
    data: data
});

const getWordInfoFailed = data => ({
    type: 'GET__WORD_INFO_FAILED',
    status: 'error',
    message: data
});

const updateWordSuccessfully = data => ({
    type: 'UPDATE_WORD_SUCCESSFULLY',
    status: 'success',
    message: data
});

const updateWordFailed = data => ({
    type: 'UPDATE_WORD_FAILED',
    status: 'error',
    message: data.message
});