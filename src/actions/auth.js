import axios from 'axios';

export const userPostFetch = user => {
    return dispatch => {
        return axios.post(process.env.REACT_APP_API_URL + 'api/signup', { "user": user })
        .then(res => {
            //console.log(res);
            if(res.status == 200)
            {
                var d = res.data;
                //console.log("Du lieu cua d: " + JSON.stringify(d))
                if(d.status == "success")
                {                   
                    localStorage.setItem("token", d.user.authentication_token);
                    dispatch(loginUser(d));
                }
                else
                {
                    dispatch(registrationFailed({"message": d.message}));
                }
            }
            else
            {
                dispatch(registrationFailed({"message": "There was an error while trying to send data to the server!"}));
                console.log("Không thể kết nối đến server! Mã lỗi: " + res.status);
            }
        })
        .catch(error => console.log(error));
    }
}

export const userLoginFetch = user => {
    return dispatch => {
        return axios.post(process.env.REACT_APP_API_URL + 'api/login', { "user": user })
        .then(res => {
            //console.log(res);
            if(res.status == 200)
            {
                var d = res.data;
                //console.log("Du lieu cua d: " + JSON.stringify(d))
                if(d.status == "success")
                {                   
                    localStorage.setItem("token", d.user.authentication_token);
                    dispatch(loginUser(d));
                }
                else
                {
                    dispatch(loginFailed({"message": d.message}));
                }
            }
            else
            {
                dispatch(loginFailed({"message": "There was an error while trying to send data to the server!"}));
                console.log("Không thể kết nối đến server! Mã lỗi: " + res.status);
            }
        })
        .catch(error => console.log(error));
    }
}

const loginUser = userObj => ({
    type: 'LOGIN_USER',
    requestResponse: {
        status: 'success',
        message: userObj.message
    },
    currentUser: userObj.data
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
