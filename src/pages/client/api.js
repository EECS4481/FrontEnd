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
  console.log("data", data);
  return data;
};
