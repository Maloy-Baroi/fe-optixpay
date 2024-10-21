import axios from 'axios';

const BACKEND_DOMAIN = process.env.NEXT_PUBLIC_DEVELOPMENT === "true"
  ? "http://localhost:8000/api/v1"
  : process.env.NEXT_PUBLIC_API_URL;

const FRONTEND_DOMAIN = process.env.NEXT_PUBLIC_DEVELOPMENT === "true"
  ? "http://localhost:3000"
  : process.env.NEXT_PUBLIC_FRONTEND_API_URL;

const depositListApiCall = async (token) => {
  const config = {
    method: 'get',
    url: `${BACKEND_DOMAIN}/app-deposit/deposits/`,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  };

  try {
    const response = await axios(config);
    if (response.status === 200) {
      console.log("response:", response.data);
      return response.data;
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      return {"error": "Employee Id or Password is incorrect!"};
    } else {
      console.error('Error:', error);
      return {"error": error.message};
    }
  }
};

const depositBKashPayCreate = async (id_token, appKey, secretKey, username, password, authToken, paymentAmount, paymentCurrency = "BDT") => {
  // Define the headers
  const data = {
    "id_token": id_token,
    "x_app_key": appKey,
    "callback_url": `https://facebook.com/`,
    // "secretKey": secretKey,
    "payer_reference": username,
    "amount": paymentAmount,
    "currency": paymentCurrency,
    "intent": "authorization"
  }

  try {
    // Make the axios POST call
    const response = await axios.post(
      `${BACKEND_DOMAIN}/app-payment/bkash/create/`,
      data
    );

    // Check if the response is successful
    if (response.status === 200) {
      return response.data;
    } else if (response.status === 401) {
      return {"error": "Unauthorized: Invalid credentials!"};
    } else {
      return {"error": response.data.message || "An error occurred"};
    }
  } catch (error) {
    if (error.response) {
      console.error('Error Response Data:', error.response.data);
      return {"error": error.response.data.message || "An error occurred"};
    } else {
      console.error('Error:', error.message);
      return {"error": error.message};
    }
  }
}

const depositBKashPayGrant = (appKey, secretKey, username, password, authToken, paymentAmount, paymentMethod, paymentCurrency = "BDT", merchant) => {
  const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
    'Authorization': `Bearer ${authToken}`
  };

  console.log(`merchant data: ${merchant}`)

  const data = {
    app_key: appKey,
    secret_key: secretKey,
    username: username,
    password: password,
    payment_amount: paymentAmount,
    payment_method: paymentMethod,
    payment_currency: paymentCurrency,
    merchant: merchant
  };

  // Returning the Promise from Axios
  return axios.post(`${BACKEND_DOMAIN}/app-payment/bkash/grants/`, data, {
    headers: headers
  })
    .then(response => response.data) // Returning response data directly
    .catch(error => {
      if (error.response) {
        // Detailed error handling based on status code
        if (error.response.status === 401) {
          console.error('Unauthorized: Invalid credentials!');
          return 'Unauthorized: Invalid credentials!';
        } else {
          console.error('Error:', error.response.data);
          return error.response.data;
        }
      } else {
        console.error('Network error:', error.message);
        return {error: 'Network error', message: error.message};
      }
    });
}


const depositBKashPayExecute = async (paymentID, idToken, xAppKey, authToken, pay_model_id) => {
  try {
    const response = await axios.post(`${BACKEND_DOMAIN}/app-payment/bkash/execute/`, {
      payment_id: paymentID,
      id_token: idToken,
      x_app_key: xAppKey,
      pay_model_id
    }, {
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Accept': 'application/json'
      }
    });

    // Handle successful response
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Error response:', error.response.data);
      return error.response.data;
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error:', error.message);
    }
  }
}

const checkUserPaidStatus = async (token) => {
  try {
    // Make the axios GET call
    const response = await axios.get(
      `${BACKEND_DOMAIN}/deposit/check-paid-status/`,
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );

    // Check if the response is successful
    if (response.status === 200) {
      return response.data; // { status: true/false }
    } else if (response.status === 401) {
      return {"error": "Unauthorized: Invalid credentials!"};
    } else {
      return {"error": response.data.message || "An error occurred"};
    }
  } catch (error) {
    if (error.response) {
      console.error('Error Response Data:', error.response.data);
      return {"error": error.response.data.message || "An error occurred"};
    } else {
      console.error('Error:', error.message);
      return {"error": error.message};
    }
  }
};


// Function to initiate payment
export const initiatePayment = async (amount, orderId) => {
  try {
    const response = await axios.post(`${BACKEND_DOMAIN}/start-payment/`, {
      amount: amount,
      order_id: orderId,
    });
    console.log('Payment Initiation Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error initiating payment:', error);
    throw error;  // Re-throw error for further handling
  }
};

// Function to check payment callback
export const verifyPayment = async (paymentId) => {
  try {
    const response = await axios.get(`http://localhost:8000/payment-callback/?payment_id=${paymentId}`);
    console.log('Payment Callback Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error in payment callback:', error);
    throw error;  // Re-throw error for further handling
  }
};


export {
  checkUserPaidStatus, depositBKashPayCreate,
  depositBKashPayExecute, depositBKashPayGrant, depositListApiCall
};

