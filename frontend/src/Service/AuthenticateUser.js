import axios from "axios";

function applyToken(token) {
    if(token) {
        axios.defaults.headers = {
            Authorization: `${token}`
        }
    }
}

// second option
// import axios from "axios";

// function applyToken(token) {
//     if (token) {
//         axios.defaults.headers.common['Authorization'] = ` ${token}`;
//     }
// }

// function clearToken() {
//     axios.defaults.headers.common['Authorization'] = undefined;
// }


// import axios from 'axios';
// import { useCookies } from 'vue3-cookies';

// const { cookies } = useCookies();

// function applyToken(token) {
//   if (token) {
//     axios.defaults.headers = {
//       Authorization: `${token}`
//     };
//     cookies.set('authToken', token, { expires: 10 }); 
//   }
// }

export { applyToken };

export default {
    applyToken,
    // clearToken
};
