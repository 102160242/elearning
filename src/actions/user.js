import axios from 'axios';
import {toastr} from 'react-redux-toastr';

export const getFollowers = (token) => {
    return dispatch => {
        return axios.get(process.env.REACT_APP_API_URL + 'user/followers',
            {
                headers: {
                    "Authorization": token,
                }
            })
        .then(res => {
            //console.log(res);
            if (res.status === 200) {
                var d = res.data;
                if (d.status === "success") {
                    dispatch(returnFollowersList(d.data));
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

export const getFollowing = (token) => {
    return dispatch => {
        return axios.get(process.env.REACT_APP_API_URL + 'user/following',
            {
                headers: {
                    "Authorization": token,
                }
            })
        .then(res => {
            console.log(res);
            if (res.status === 200) {
                var d = res.data;
                if (d.status === "success") {
                    dispatch(returnFollowingList(d.data));
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

export const updateUser = (token, user) => {
    return dispatch => {
        return axios.patch(process.env.REACT_APP_API_URL + 'user/update',
            {
                user: user
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
                //console.log(d);
                if (d.status === "success") {
                    toastr.success(d.message);
                    dispatch(updateUserSuccessfully(d));
                }
                else {
                    var keys = Object.keys(d.message);
                    //console.log("Key: " + keys);
                    for (var i = 0; i < keys.length; i++) {
                        var msg = "";
                        //console.log("Length: " + d.message[keys[i]].length)
                        for (var j = 0; j < d.message[keys[i]].length; j++) {
                            var nameCapitalized = keys[i].charAt(0).toUpperCase() + keys[i].slice(1);
                            msg += nameCapitalized + " " + d.message[keys[i]][j] + ". ";
                        }
                        toastr.error("Failed to update your Profile!", msg);
                    }
                    //toastr.error("Failed to Sign Up!", d.message);
                    dispatch(updateUserFailed({ "message": d.message }));
                }
            }
            else {
                var msg = "There was an error while trying to send data to the server! Error code: " + res.status;
                toastr.error("Failed to update your Profile!", msg);
                dispatch(updateUserFailed({ "message": msg }));
                console.log("Không thể kết nối đến server! Mã lỗi: " + res.status);
            }
        })
        .catch(error => {
            toastr.error("Failed to get data from server!", error);
            console.log(error)
        });
    }
}


export const unfollow = (token, id) => {
    return dispatch => {
        return axios.delete(process.env.REACT_APP_API_URL + 'user/unfollow',
            {
                data: {
                id: id
            },
                headers: {
                    "Authorization": token,
                }
            }
        )
        .then(res => {
            console.log(res);
            if (res.status === 200) {
                var d = res.data;
                if (d.status === "success") {
                    dispatch(unfollowSuccessfully(d.data));
                }
                else
                {
                    var msg = "Failed to send request to server!" + res.status;
                    toastr.error(msg);
                    dispatch(unfollowUserFailed({"message": msg}));
                    console.log(msg);
                }
            }
            else {
                var msg = "Server returned error code: " + res.status;
                toastr.error(msg);
                dispatch(unfollowUserFailed({"message": msg}));
                console.log(msg);
            }
        })
        .catch(error => {
            toastr.error("Failed to send request to server!", error);
            console.log(error)
        })
    }
}

export const follow = (token, id) => {
    return dispatch => {
        return axios.post(process.env.REACT_APP_API_URL + 'user/follow',
            {
                id: id
            },
            {
                headers: {
                    "Authorization": token,
                }
            }
        )
        .then(res => {
            console.log(res);
            if (res.status === 200) {
                var d = res.data;
                if (d.status === "success") {
                    dispatch(followSuccessfully(d.data));
                }
                else
                {
                    var msg = "Failed to send request to server!" + res.status;
                    toastr.error(msg);
                    dispatch(followUserFailed({"message": msg}));
                    console.log(msg);
                }
            }
            else {
                var msg = "Server returned error code: " + res.status;
                toastr.error(msg);
                dispatch(followUserFailed({"message": msg}));
                console.log(msg);
            }
        })
        .catch(error => {
            toastr.error("Failed to send request to server!", error);
            console.log(error)
        })
    }
}

const returnFollowersList = data => ({
    type: 'GET_FOLLOWERS',
    status: 'success',
    followersList: data
});

const returnFollowingList = data => ({
    type: 'GET_FOLLOWING',
    status: 'success',
    followingList: data
});

const getListFailed = data => ({
    type: 'GET_FOLLOWING_FAILED',
    status: 'error',
    message: data
});

const updateUserSuccessfully = data => ({
    type: 'UPDATE_USER_SUCCESSFULLY',
    status: 'success',
    message: data
});

const updateUserFailed = data => ({
    type: 'UPDATE_USER_FAILED',
    status: 'error',
    message: data
});

const unfollowSuccessfully = data => ({
    type: 'UNFOLLOW_USER_SUCCESSFULLY',
    status: 'success',
    message: data
});

const followSuccessfully = data => ({
    type: 'FOLLOW_USER_SUCCESSFULLY',
    status: 'success',
    message: data
});

const unfollowUserFailed = data => ({
    type: 'UNFOLLOW_USER_FAILED',
    status: 'error',
    message: data
});

const followUserFailed = data => ({
    type: 'FOLLOW_USER_FAILED',
    status: 'error',
    message: data
});