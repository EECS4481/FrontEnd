import axios from "axios";

export const getClientId = async () => {
  console.log("here");
  const { data } = await axios.get(`http://localhost:4000/api/getClientId`);
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
