import axios from 'axios';
import {toastr} from 'react-redux-toastr';

export const getWords = (params) => {
    return dispatch => {
        return axios.get(process.env.REACT_APP_API_URL + 'admin/words',
                    { params: params}
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

const getListSuccessfully = data => ({
    type: 'GET_LIST_SUCCESSFULLY',
    status: 'success',
    data: data
});

const getListFailed = data => ({
    type: 'ADMIN_GET_LIST_FAILED',
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