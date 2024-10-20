import axios from "axios";

const BACKEND_DOMAIN = process.env.NEXT_PUBLIC_DEVELOPMENT === "true"
  ? "http://localhost:8000/api/v1"
  : process.env.NEXT_PUBLIC_API_URL;

const loginApiCall = async (formData) => {
    const config = {
        method: 'post',
        url: `${BACKEND_DOMAIN}/app-auth/login/token/`,
        data: formData,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    };

    try {
        const response = await axios(config);
        console.log("Response: ", response);
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            return {"error": "Employee Id or Password is incorrect!"};
        } else {
            console.error('Error:', error);
            return {"error": error.message};
        }
    }
};


// src/api/login_api.js
const signupApiCall = async (formData) => {
    const requestOptions = {
        method: 'POST',
        body: formData,
        redirect: 'follow',
    };

    try {
        const response = await fetch(`${BACKEND_DOMAIN}/app-auth/register/`, requestOptions);

        const responseBody = await response.json(); // Attempt to parse JSON irrespective of response status

        // Package both the status code and the JSON body together
        const result = {
            statusCode: response.status,
            data: responseBody
        };

        if (response.ok) {
            return result;  // Return result if response status is 200-299
        } else {
            // Add additional handling if needed, based on status code
            if (response.status === 400 || response.status === 401) {
                result.data = { "error": result.data.email[0] };
            }
            // You may adjust the error message or handle other status codes if needed
            return result;
        }
    } catch (error) {
        console.error('Error:', error);
        // Handle network errors by returning an appropriate message and code
        return {
            statusCode: 0,  // 0 or some other indicator of a fetch failure
            data: { "error": `Network Error: ${error.message}` }
        };
    }
};


const tokenVerifyApiCall = async (email, token) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'email': email,
            'otp': token
        }),
        redirect: 'follow'
    };

    try {
        const response = await fetch(`${BACKEND_DOMAIN}/app-auth/verify-otp/`, requestOptions);
        if (response.ok) {
            return {'result': true};
        } else {
            return {'result': false};
        }
    } catch (error) {
        console.log(error);
        return {'result': false};
    }
};

// const accessTokenByRefreshToken = async (rft) => {
//     const requestOptions = {
//         method: 'POST',
//         body: JSON.stringify({
//             "refresh": rft
//         }),
//         redirect: 'follow'
//     };
//
//     try {
//         const response = await fetch(`${BACKEND_DOMAIN}/auth/refresh/`, requestOptions);
//         if (response.ok) {
//             return await response.json();
//         }
//     } catch (error) {
//         console.error('Error:', error);
//         return {"error": error};
//     }
// }

export {
    loginApiCall, signupApiCall,
    tokenVerifyApiCall
};
