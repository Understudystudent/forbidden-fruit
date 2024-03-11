import axios from "axios";
function applyToken(token) {
    if(token) {
        axios.defaults.headers = {
            Authorization: `Bearer ${token}`
        }
    }
}

// second option
// import axios from "axios";

// function applyToken(token) {
//     if (token) {
//         axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//     }
// }

// function clearToken() {
//     axios.defaults.headers.common['Authorization'] = undefined;
// }

export {
    applyToken
    // clearToken
};
