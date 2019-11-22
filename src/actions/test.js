import axios from 'axios';
import { toastr } from 'react-redux-toastr';
import { getUserInfoFailed } from '../actions/auth';

export const getTest = (token, test_id) => {
    return dispatch => {
        return axios.get(process.env.REACT_APP_API_URL + 'test/' + test_id,
            {
                headers: {
                    "Authorization": token,
                }
            }
        )
        .then(res => {
            //console.log(res);
            if (res.status === 200) {
                var d = res.data;
                if (d.status === "success") {
                    dispatch(getTestSuccessfully(d.data));
                }
                else {
                    toastr.error("Error!", d.message);
                    dispatch(getTestFailed({ "message": d.message }));
                }
            }
            else {
                var msg = "There was an error while trying to send data to the server! Error code: " + res.status;
                toastr.error("Failed to get data from server!", msg);
                dispatch(getTestFailed({ "message": msg }));
                console.log("Không thể kết nối đến server! Mã lỗi: " + res.status);
            }
        })
        .catch(error => {
            if(error.response && error.response.status == 401)
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
export const getTestResult = (token, test_id) => {
    return dispatch => {
        return axios.get(process.env.REACT_APP_API_URL + 'test/' + test_id + '/result',
            {
                headers: {
                    "Authorization": token,
                }
            }
        )
        .then(res => {
            //console.log(res);
            if (res.status === 200) {
                var d = res.data;
                if (d.status === "success") {
                    dispatch(getTestSuccessfully(d.data));
                }
                else {
                    toastr.error("Error!", d.message);
                    dispatch(getTestFailed({ "message": d.message }));
                }
            }
            else {
                var msg = "There was an error while trying to get data from the server! Error code: " + res.status;
                toastr.error("Failed to get data from server!", res.data.message);
                dispatch(getTestFailed({ "message": msg }));
                console.log("Không thể kết nối đến server! Mã lỗi: " + res.status);
            }
        })
        .catch(error => {
            toastr.error("Failed to get data from server!", error);
            console.log(error)
        });
    }
}

export const submitTest = (token, data) => {
    return dispatch => {
        return axios.patch(process.env.REACT_APP_API_URL + 'test/' + data.test_id,
            {
                test: { "answer_ids": data.answer_ids }
            },
            {
                headers: {
                    "Authorization": token,
                }
            }
        )
        .then(res => {
            //console.log(res);
            if (res.status === 200) {
                var d = res.data;
                if (d.status === "success") {
                    dispatch(submitTestSuccessfully(d.data));
                }
                else {
                    dispatch(submitTestFailed({ "message": d.message }));
                }
            }
            else {
                var msg = "There was an error while trying to send data to the server! Error code: " + res.status;
                toastr.error("Failed to send data to server!", msg);
                dispatch(submitTestFailed({ "message": msg }));
                console.log("Không thể kết nối đến server! Mã lỗi: " + res.status);
            }
        })
        .catch(error => {
            if(error.response && error.response.status == 401)
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

export const createNewTest = (token, category_id) => {
    return dispatch => {
        return axios.post(process.env.REACT_APP_API_URL + 'test/create',
            {
                category_id: category_id
            },
            {
                headers: {
                    "Authorization": token,
                }
            }
        )
        .then(res => {
            //console.log(res);
            if (res.status === 200) {
                var d = res.data;
                if (d.status === "success") {
                    dispatch(createNewTestSuccessfully(d.data));
                }
                else {
                    dispatch(createNewTestFailed({ "message": d.message }));
                }
            }
            else {
                var msg = "There was an error while trying to send data to the server! Error code: " + res.status;
                toastr.error("Failed to send data to server!", msg);
                dispatch(createNewTestFailed({ "message": msg }));
                console.log("Không thể kết nối đến server! Mã lỗi: " + res.status);
            }
        })
        .catch(error => {
            if(error.response && error.response.status == 401)
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

const getTestSuccessfully = data => ({
    type: 'GET_TEST_SUCCESSFULLY',
    status: 'success',
    test: data
});
const getTestFailed = data => ({
    type: 'GET_TEST_FAILED',
    status: 'error',
    message: data
});
const submitTestSuccessfully = data => ({
    type: 'SUBMIT_TEST_SUCCESSFULLY',
    status: 'success',
    test: data
});
const submitTestFailed = data => ({
    type: 'SUBMIT_TEST_FAILED',
    status: 'error',
    message: data
});
const createNewTestSuccessfully = data => ({
    type: 'CREATE_NEW_TEST_SUCCESSFULLY',
    status: 'success',
    test: data
});
const createNewTestFailed = data => ({
    type: 'CREATE_NEW_TEST_FAILED',
    status: 'error',
    message: data
});