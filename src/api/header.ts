
import axios from 'axios';
const BACKEND_DOMAIN = process.env.NEXT_PUBLIC_DEVELOPMENT === "true"
  ? "http://localhost:8000/api/v1"
  : process.env.NEXT_PUBLIC_API_URL;

// Function to get Rate Of exchenge data
export const getRateOfExchange = async (token: string|undefined) => {
    try {
      const response = await axios.get(`${BACKEND_DOMAIN}/app-payment/exchange-rates/`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`  // Replace with actual token or authorization header
        }
      });
      console.log(response);
      
      return response;  // Return the data for use in other components
    } catch (error) {
      console.error('Error fetching merchants:', error);
      throw error;  // You can throw the error to handle it in the component
    }
  };