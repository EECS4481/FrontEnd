import axios from "axios";


export const getClientId = async () => {
  const { data } = await axios.get(`http://localhost:4000/api/getClientId`);
  return data;
};

export const addConversation = async (sampleData) => {
  const { data } = await axios.post(
    `http://localhost:4000/api/addConversation`,
    sampleData
  );
  return data;
};

export const getConversationHistory = async (user1Id, user2Id) => {
  const { data } = await axios.get(
    `http://localhost:4000/api/getConversationHistory/${user1Id}/${user2Id}`
  );
  return data;
};


export const checkProviderId = async (clientId) => {
  const {data} = await axios.get(`http://localhost:4000/api/checkProvider/${clientId}`);
  return data;
};

export const getProviderIdClientIdData = async (clientId) => {
  const { data } = await axios.get(
    `http://localhost:4000/api/startChat/${clientId}`
  );
  return data;
};

export const sendFile= async (form) => {
  const data= await axios.post('http://localhost:4000/api/upload', form, {headers: {
    'Content-Type': 'multipart/form-data'
  }})
};
