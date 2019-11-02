import axios from 'axios';
import { toastr } from 'react-redux-toastr';

export const userPostFetch = user => {
    return dispatch => {
        return axios.post(process.env.REACT_APP_API_URL + 'signup', { "user": user })
            .then(res => {
                //console.log(res);
                if (res.status == 200) {
                    var d = res.data;
                    console.log(d);
                    if (d.status == "success") {
                        localStorage.setItem("token", d.data.authentication_token);
                        toastr.success("Signed Up Successfully!");
                        dispatch(loginUser(d));
                    }
                    else {
                        var keys = Object.keys(d.message);
                        console.log("Key: " + keys);
                        for (var i = 0; i < keys.length; i++) {
                            var msg = "";
                            console.log("Length: " + d.message[keys[i]].length)
                            for (var j = 0; j < d.message[keys[i]].length; j++) {
                                var nameCapitalized = keys[i].charAt(0).toUpperCase() + keys[i].slice(1);
                                msg += nameCapitalized + " " + d.message[keys[i]][j] + ". ";
                            }
                            toastr.error("Failed to Sign Up!", msg);
                        }
                        //toastr.error("Failed to Sign Up!", d.message);
                        dispatch(registrationFailed({ "message": d.message }));
                    }
                }
                else {
                    var msg = "There was an error while trying to send data to the server! Error code: " + res.status;
                    toastr.error("Failed to Sign Up!", msg);
                    dispatch(registrationFailed({ "message": msg }));
                    console.log("Không thể kết nối đến server! Mã lỗi: " + res.status);
                }
            })
            .catch(error => {
                toastr.error("Failed to Sign Up!", error);
                console.log(error)
            });
    }
}

export const userLoginFetch = user => {
    return dispatch => {
        return axios.post(process.env.REACT_APP_API_URL + 'login', { "user": user })
            .then(res => {
                //console.log(res);
                if (res.status == 200) {
                    var d = res.data;
                    //console.log("Du lieu cua d: " + JSON.stringify(d))
                    if (d.status == "success") {
                        localStorage.setItem("token", d.data.authentication_token);
                        toastr.success(d.message);
                        // console.log("Log day ne: ");
                        // console.log(d);
                        // debugger;
                        dispatch(loginUser(d));
                    }
                    else {
                        var msg = d.message.charAt(0).toUpperCase() + d.message.slice(1);
                        toastr.error(msg);
                        dispatch(loginFailed({ "message": d.message }));
                    }
                }
                else {
                    var msg = "There was an error while trying to send data to the server! Error code: " + res.status;
                    toastr.error(msg);
                    dispatch(loginFailed({ "message": msg }));
                    console.log(msg);
                }
            })
            .catch(error => {
                toastr.error("Failed to Login!", error);
                console.log(error)
            });
    }
}

export const getUserInfo = token => {
    return dispatch => {
        return axios.get(process.env.REACT_APP_API_URL + 'user/info',
            {
                headers: {
                    "Authorization": token,
                    'Content-Type': 'application/json',
                }
            })
            .then(res => {
                //console.log("getUserInfo: " + res);              
                switch(res.status)
                {
                    case 200:
                        if(res.data.status == "success")
                        {
                            dispatch(getUserInfoSuccessfully(res.data));
                        }
                        else
                        {
                            dispatch(getUserInfoFailed(res.data));
                        }
                        break;
                    case 401: // User not Authenticated
                        localStorage.removeItem(process.env.REACT_APP_TOKEN_KEY); // Delete Invalid Token (if exist)
                    default:
                        console("Auth to get User's Info. Message: " + res.data.message);
                        dispatch(getUserInfoFailed(res.data));
                }
            })
            .catch(error => {
                console.log("getUserInfo: " + error)
            });
    }
}


const loginUser = userObj => ({
    type: 'LOGIN_USER',
    requestResponse: {
        status: 'success',
        message: userObj.message
    },
    currentUser: userObj.data,
    isLoggedIn: true
});
const registrationFailed = data => ({
    type: 'REGISTRATION_FAILED',
    requestResponse: {
        status: 'success',
        message: data.message
    }
});
const loginFailed = data => ({
    type: 'LOGIN_FAILED',
    requestResponse: {
        status: 'success',
        message: data.message
    }
});
const getUserInfoSuccessfully = data => ({
    type: 'GET_USER_INFO_SUCCESSFULLY',
    requestResponse: {
        status: 'success',
        message: data.message
    },
    currentUser: data.data,
    isLoggedIn: true
});
const getUserInfoFailed = data => ({
    type: 'GET_USER_INFO_FAILED',
    requestResponse: {
        status: 'error',
        message: data.message
    }
});