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
