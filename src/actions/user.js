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

