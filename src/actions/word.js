import axios from 'axios';
import { toastr } from 'react-redux-toastr';
import { getUserInfoFailed } from '../actions/auth';

export const getWords = (token, category_id) => {
    return dispatch => {
        return axios.get(process.env.REACT_APP_API_URL + "words?category_id=" + category_id,
        {
            headers: {
                "Authorization": token,
            }
        })
        .then(res => {
            //console.log(res)
            if (res.status === 200) {
                var d = res.data;
                if (d.status === "success") {
                    dispatch(returnList(d.data));
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
            if(error.response.status == 401)
            {
                localStorage.removeItem(process.env.REACT_APP_TOKEN_KEY); // Delete Invalid Token (if exist)
                dispatch(getUserInfoFailed({ 'message': 'Invalid Token' }));
            }
            else
            {
                toastr.error("Failed to send request to server!", error);
                console.log(error)
            }
        });
    }
}

export const learntWord = (token, id) => {
    return dispatch => {
        return axios.post(process.env.REACT_APP_API_URL + "/words/learntword",
        {
            id: id
        },
        {
            headers: {
                "Authorization": token
            }
        })
        .then(res => {
            console.log(res);
            if (res.status === 200) {
                var d = res.data;
                if (d.status === "success") {
                    dispatch(learntWordSuccessfully(d.data));
                }
                else
                {
                    var msg = "Failed to send request to server!" + res.status;
                    toastr.error(msg);
                    dispatch(learntWordFailed({"message": msg}));
                    console.log(msg);
                }
            }
            else {
                var msg = "Server returned error code: " + res.status;
                toastr.error(msg);
                dispatch(learntWordFailed({"message": msg}));
                console.log(msg);
            }
        })
        .catch(error => {
            if(error.response.status == 401)
            {
                localStorage.removeItem(process.env.REACT_APP_TOKEN_KEY); // Delete Invalid Token (if exist)
                dispatch(getUserInfoFailed({ 'message': 'Invalid Token' }));
            }
            else
            {
                toastr.error("Failed to send request to server!", error);
                console.log(error)
            }
        })
    }
}

export const unlearntWord = (token, id) => {
    return dispatch => {
        return axios.delete(process.env.REACT_APP_API_URL + "words/unlearntword",
        {
            data: {
                id: id
        },
            headers: {
                "Authorization": token
            }
        })
        .then(res => {
            console.log(res);
            if (res.status === 200) {
                var d = res.data;
                if (d.status === "success") {
                    dispatch(unlearntWordSuccessfully(d.data));
                }
                else
                {
                    var msg = "Failed to send request to server!" + res.status;
                    toastr.error(msg);
                    dispatch(unlearntWordFailed({"message": msg}));
                    console.log(msg);
                }
            }
            else {
                var msg = "Server returned error code: " + res.status;
                toastr.error(msg);
                dispatch(unlearntWordFailed({"message": msg}));
                console.log(msg);
            }
        })
        .catch(error => {
            if(error.response.status == 401)
            {
                localStorage.removeItem(process.env.REACT_APP_TOKEN_KEY); // Delete Invalid Token (if exist)
                dispatch(getUserInfoFailed({ 'message': 'Invalid Token' }));
            }
            else
            {
                toastr.error("Failed to send request to server!", error);
                console.log(error)
            }
        })
    }
}

const unlearntWordSuccessfully = data => ({
    type: 'UNLEARNT_SUCCESSFULLY',
    status: 'success',
    list: data
});

const unlearntWordFailed = data => ({
    type: 'UNLEARNT_FAILED',
    status: 'error',
    list: data
});

const learntWordSuccessfully = data => ({
    type: 'LEARNT_SUCCESSFULLY',
    status: 'success',
    list: data
});

const learntWordFailed = data => ({
    type: 'LEARNT_FAILED',
    status: 'error',
    list: data
});

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