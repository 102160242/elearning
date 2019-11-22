import axios from 'axios';
import {toastr} from 'react-redux-toastr';

export const getUsers = (token, params) => {
    return dispatch => {
        return axios.get(process.env.REACT_APP_API_URL + 'admin/users',
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

export const deleteUser = (token, id) => {
    return dispatch => {
        return axios.delete(process.env.REACT_APP_API_URL + 'admin/users/' + id,
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
                    dispatch(deleteUserSuccessfully(d.data));
                }
                else
                {
                    var msg = "Couldn't get data from server!" + res.status;
                    toastr.error(msg);
                    dispatch(deleteUserFailed({"message": msg}));
                    console.log(msg);
                }
            }
            else {
                var msg = "Server returned error code: " + res.status;
                toastr.error(msg);
                dispatch(deleteUserFailed({"message": msg}));
                console.log(msg);
            }
        })
        .catch(error => {
            toastr.error("Failed to get data from server!", error);
            console.log(error)
        });
    }
}

export const createUser = (token, data) => {
    return dispatch => {
        return axios.post(process.env.REACT_APP_API_URL + 'admin/users',
            {
                user: data
            }    
            ,
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
                    dispatch(createUserSuccessfully(d.data));
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
                        toastr.error("Failed to create new Category!", msg);
                    }
                    dispatch(createUserFailed({"message": msg}));
                    console.log(msg);
                }
            }
            else {
                var msg = "Server returned error code: " + res.status;
                toastr.error(msg);
                dispatch(createUserFailed({"message": msg}));
                console.log(msg);
            }
        })
        .catch(error => {
            var msg = "";
            if(error.response && error.response.status == 401)
            {
                localStorage.removeItem(process.env.REACT_APP_TOKEN_KEY); // Delete Invalid Token (if exist)
                dispatch(createUserFailed({ 'message': 'Invalid Token' }));
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
            dispatch(createUserFailed({"message": msg}));
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
const deleteUserSuccessfully = data => ({
    type: 'DELETE_USER_SUCCESSFULLY',
    status: 'success',
    message: data
});
const deleteUserFailed = data => ({
    type: 'DELETE_USER_FAILED',
    status: 'error',
    message: data.message
});
const createUserSuccessfully = data => ({
    type: 'CREATE_USER_SUCCESSFULLY',
    status: 'success',
    message: data
});
const createUserFailed = data => ({
    type: 'CREATE_USER_FAILED',
    status: 'error',
    message: data
});