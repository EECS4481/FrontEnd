import axios from "axios";

export const getProviderId = async (email, password) => {
  const response = await axios.get(
    `http://localhost:4000/api/login/${email}/${password}`,
    { withCredentials: true }
  );
  console.log(response);
  return response.data;
};

export const addConversation = async (sampleData) => {
  const { data } = await axios.post(
    `http://localhost:4000/api/addConversation`,
    sampleData
  );
  console.log("data", data);
  return data;
};

export const getConversationHistory = async (user1Id, user2Id) => {
  const { data } = await axios.get(
    `http://localhost:4000/api/getConversationHistory/${user1Id}/${user2Id}`
  );
  return data;
};

export const setProviderReady = async (providerId) => {
  const res = await axios.get(
    `http://localhost:4000/api/providerReady/${providerId}`,
    { withCredentials: true }
  );
  console.log("req", res.data);
  return res.data;
};

export const transferCustomer = async (clientId, providerId) => {
  const { data } = await axios.get(
    `http://localhost:4000/api/transferClient/${clientId}/${providerId}`
  );
  return data;
};

export const getReadyProviders = async () => {
  const { data } = await axios.get(`http://localhost:4000/api/readyProviders`);
  return data;
};

export const logout = async (providerId) => {
  const { data } = await axios.get(
    `http://localhost:4000/api/logout/${providerId}`
  );
  return data;
};

export const provideChatCheck = async (providerId) => {
  const { data } = await axios.get(
    `http://localhost:4000/api/provideChatCheck/${providerId}/client`
  );
  return data;
};
