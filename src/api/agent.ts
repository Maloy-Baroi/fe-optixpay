import axios from 'axios';

const BACKEND_DOMAIN = process.env.NEXT_PUBLIC_DEVELOPMENT === "true"
  ? "http://localhost:8000/api/v1"
  : process.env.NEXT_PUBLIC_API_URL;

interface Provider {
  provider: string;
  phone_number: string;
  password: string;
  api_key: string;
  secret_key: string;
}

interface UserPayload {
  user: {
    email: string;
    name: string;
    password: string;
  };
  agent: {
    full_name: string;
    email: string;
    date_of_birth: string;
    phone_number: string;
    nationality: string;
    nid_number: string;
    telegram_account: string;
    verification_type: string;
  };
  provider: Provider[];
}

export const createUserAgentProvider = async (values: any) => {
  const userPayload: UserPayload = {
    user: {
      email: values.email,
      name: values.name,
      password: values.password,
    },
    agent: {
      full_name: values.full_name,
      email: values.agent_email,
      date_of_birth: values.date_of_birth.format('YYYY-MM-DD'),
      phone_number: values.phone_number,
      nationality: values.nationality,
      nid_number: values.nid_number,
      telegram_account: values.telegram_account,
      verification_type: values.verification_type,
    },
    provider: values.providers.map((provider: any) => ({
      provider: provider.provider,
      phone_number: provider.phone_number,
      password: provider.password,
      api_key: provider.api_key,
      secret_key: provider.secret_key,
    })),
  };

  try {
    const response = await axios.post(`${BACKEND_DOMAIN}/app-agent/create-user-agent-provider`, userPayload);
    return response.data;
  } catch (error) {
    throw new Error('Error occurred while creating the entities. Please try again.');
  }
};
