import axios from "axios";

const BACKEND_DOMAIN = process.env.NEXT_PUBLIC_DEVELOPMENT === "true"
  ? "http://localhost:8000/api/v1"
  : process.env.NEXT_PUBLIC_API_URL;

// /payment/bkash/initiate/

const depositApiCall = async (data, token) => {
    const config = {
        method: 'post',
        url: `${BACKEND_DOMAIN}/app-deposit/deposits/`,
        data: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };

    try {
        const response = await axios(config);
        if (response.status === 201) {
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

  
  // Function to get payment list
const getPaymentList = async (token, startDate, endDate) => {
    // Set up the Axios instance with default config (like baseURL if needed)
    const api = axios.create({
        baseURL: `${BACKEND_DOMAIN}`, // Your Django API base URL
        headers: {
        "Content-Type": "application/json",
        },
    });

    let start_date = startDate && `date_from=${startDate}`;
    let end_date =  endDate && `date_to=${endDate}`;

    let url = "";
    
    if (startDate && endDate) {
        url = `app-payment/payment-list/?${start_date}&${end_date}`;
    }
    else {
        url = `app-payment/payment-list`
    }

    try {
      // Include the token from cookies for authenticated requests  
      const response = await api.get(url, {
        headers: {
          Authorization: `Bearer ${token}`, // Pass the access token in Authorization header
        },
      });
  
      return response?.data?.data; // Return the data from the response
    } catch (error) {
      console.error("Error fetching payments:", error);
      throw error;
    }
  };

export {
    depositApiCall,
    getPaymentList
};

