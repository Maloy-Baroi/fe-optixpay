import axios from 'axios';
const BACKEND_DOMAIN = process.env.NEXT_PUBLIC_DEVELOPMENT === "true"
  ? "http://localhost:8000/api/v1"
  : process.env.NEXT_PUBLIC_API_URL;

  export const getBankData = async (token: string|undefined) => {
    try {
      const response = await axios.get(`${BACKEND_DOMAIN}/app-agent/payment-providers/`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`  // Replace with actual token or authorization header
        }
      });
      return response;  // Return the data for use in other components
    } catch (error) {
      console.error('Error fetching merchants:', error);
      throw error;  // You can throw the error to handle it in the component
    }
  };

  export const createBankAccount = async (payload:any) => {
    console.log(typeof(payload));

    try {
      // Make API request to create user and merchant
      const response = await axios.post(`${BACKEND_DOMAIN}/app-agent/payment-providers/`,
       payload
      );
      return response; // Return the data from the response
    } catch (error) {
      // Handle error and throw a new error with a message
      return error;
    }
  };

  export const updateBankAccountStatus = async (payload:any,id:any) => {
    try {
      // Make API request to create user and merchant
   const response=await axios.patch(`${BACKEND_DOMAIN}/app-agent/payment-providers/${id}/`, payload);
      return response.data; // Return the data from the response
    } catch (error) {
      // Handle error and throw a new error with a message
      return error;
    }
  };
