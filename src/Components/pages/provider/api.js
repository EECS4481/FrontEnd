import axios from "axios";

export const getProviderId = async (email, password) => {
  const { data } = await axios.get(
    `http://localhost:4000/api/login/${email}/${password}`
  );
  return data;
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
  const { data } = await axios.get(
    `http://localhost:4000/api/providerReady/${providerId}`
  );
  return data;
};


export const transferCustomer = async (clientId, providerId) => {
  const {data} = await axios.get(`http://localhost:4000/api/transferClient/${clientId}/${providerId}`);
  return data;
}

export const getReadyProviders = async () => {
  const {data} = await axios.get(`http://localhost:4000/api/readyProviders`);
  return data;
}


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
