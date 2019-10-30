import axios from 'axios'
export const userPostFetch = user => {
    return dispatch => {
        return axios.post(process.env.REACT_APP_API_URL + 'api/signup', { "user": user })
        .then(res => {
            //console.log(res);
            if(res.status == 200)
            {
                var d = res.data;
                if(d.status == "success")
                {
                    localStorage.setItem("token", d.data.authentication_token);
                }
                dispatch(loginUser(d))
            }
            else
            {
                console.log("Không thể kết nối đến server! Mã lỗi: " + res.status);
            }
        })
        .catch(error => console.log(error));
    }
}

const loginUser = userObj => ({
    type: 'LOGIN_USER',
    payload: userObj
})

// export const userPostFetch = user => {
//     return dispatch => {
//         return fetch(process.env.REACT_APP_API_URL + "api/signup", {
//             method: "POST",
//             headers: {
//                 'Content-Type': 'application/json',
//                 Accept: 'application/json',
//             },
//             body: JSON.stringify({ user })
//         })
//             .then(resp => resp.json())
//             .then(data => {
//                 console.log(data)
//                 if (data.message) {
//                 } else {
//                     localStorage.setItem("token", data.jwt)
//                     dispatch(loginUser(data.user))
//                 }
//             })
//     }
// }


// export function userPostFetch(user)
// {   
//     // console.log({ "user": user });
//     let data = {};
//     axios.post(process.env.REACT_APP_API_URL + 'api/signup', { "user": user })
//     .then(res => {
//         //console.log(res);
//         if(res.status == 200)
//         {
//             var d = res.data;
//             if(d.status == "success")
//             {
//                 localStorage.setItem("token", d.data.authentication_token);
//             }
//             data = d;
//             //console.log(data);
//         }
//         else
//         {
//             console.log("Không thể kết nối đến server! Mã lỗi: " + res.status);
//         }
//     })
//     .catch(error => console.log(error));

//     console.log(data);
//     return {
//         type: 'LOGIN_USER',
//         data: data
//     }
// }