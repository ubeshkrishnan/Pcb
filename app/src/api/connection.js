// import axios from "axios";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { Platform } from "react-native";
// import jwtDecode from "jwt-decode";

// import { Auth } from "configs/auth";
// import { ToastMessage } from "components/Toastmessage";
// import { navigate } from "helpers";
// // import { GoogleSignin } from "@react-native-google-signin/google-signin";
// // import { googleConfigure } from "../configs/googleSignin";
// import { DEVICE_INFO } from "configs/constants";

// const appversion = `${DEVICE_INFO.version}.${DEVICE_INFO.buildNumber}`;

// const baseURL = global.apiHost;
// const connection = axios.create({
//   baseURL,
//   headers: {
//     Accept: "application/json",
//     "Request-Source": Platform.OS,
//     "X-App-Version": appversion,
//   },
// });
// // ** Request Interceptor
// connection.interceptors.request.use(
//   async (config) => {
//     console.log(global.apiHost, "global host remote config");
//     if (await validateToken()) {
//       const accessToken = await AsyncStorage.getItem(Auth.accessTokenKeyName);
//       console.log(accessToken, "cnjkc kcj wc jw");
//       if (accessToken) {
//         config.headers = {
//           Authorization: `JWT+ ${accessToken}`,
//           ...config.headers,
//           "Content-Type":
//             config.data instanceof FormData
//               ? "multipart/form-data"
//               : "application/json",
//         };
//       }
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // ** Response Interceptor
// connection.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     const status = error.response.status;
//     const message = error.response.data.message;
//     if (status === 401 || status === 403) {
//       ToastMessage(status, message);

//       if (message !== "Invalid OTP") {
//         // googleConfigure();
//         // await GoogleSignin.signOut();
//         navigate("LoginScreen");
//       }
//     } else if (status === 404) {
//       // TODO: Show Toast error
//       ToastMessage(status, message);
//     } else {
//       ToastMessage(status, message);
//     }

//     return Promise.reject(error);
//   }
// );
// export default connection;

// export async function validateToken() {
//   const token = await AsyncStorage.getItem(Auth.accessTokenKeyName);

//   const refreshToken = await AsyncStorage.getItem(Auth.refreshTokenName);
//   if (!token || !refreshToken) {
//     return false;
//   }

//   const status = await decodeWithPub(token);
//   if (status) {
//     return true;
//   }

//   const headers = {
//     Accept: "application/json",
//     "Content-Type": "application/json",
//   };

//   let refreshTokenStatus = false;

//   await fetch(`${baseURL}/auth/refresh`, {
//     headers,
//     method: "PUT",
//     body: JSON.stringify({
//       refreshToken: refreshToken,
//     }),
//   })
//     .then(async (response) => {
//       if (response.ok) {
//         return response.json();
//       }
//       const errorMessage = [response.status, await response.json()];
//       throw errorMessage;
//     })
//     .then(async ({ data }) => {
//       refreshTokenStatus = true;
//       console.log("got new refresh token", data);
//       await AsyncStorage.setItem(Auth.accessTokenKeyName, data.accessToken);
//       await AsyncStorage.setItem(Auth.refreshTokenName, data.refreshToken);
//     })
//     .catch((error) => {
//       if (error) {
//         console.log(error);
//       }
//       navigate("LoginScreen");
//     });
//   return refreshTokenStatus;
// }

// export async function decodeWithPub(jwtToken) {
//   try {
//     const decodedToken = jwtDecode(jwtToken);
//     if (decodedToken.exp < Math.floor(Date.now() / 1000) + 1 * 60) {
//       return false;
//     } else {
//       return true;
//     }
//   } catch (err) {
//     return false;
//   }
// }
