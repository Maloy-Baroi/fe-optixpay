import axios from 'axios';

// Define the structure of user and merchant data
export interface UserValues {
  email: string;
  name: string;
  password: string;
}

export interface MerchantValues {
  name: string;
  email: string;
  contact_number: string;
  api_key: string;
  secret_key: string;
}

const BACKEND_DOMAIN = process.env.NEXT_PUBLIC_DEVELOPMENT === "true"
  ? "http://localhost:8000/api/v1"
  : process.env.NEXT_PUBLIC_API_URL;

/**
 * Function to create user and merchant by calling the backend API.
 * @param user - User details (email, name, password)
 * @param merchant - Merchant details (name, email, contact_number, api_key, secret_key)
 * @returns Promise that resolves to the created user and merchant data
 */
export const createUserAndMerchant = async (user: UserValues, merchant: MerchantValues) => {
  try {
    // Make API request to create user and merchant
    const response = await axios.post(`${BACKEND_DOMAIN}/app-merchant/create-user-and-merchant/`, {
      user,
      merchant,
    });
    return response.data; // Return the data from the response
  } catch (error) {
    // Handle error and throw a new error with a message
    return error;
  }
};
