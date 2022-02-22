import axios from "axios";

export const getClientId = async () => {
  const { data } = await axios.get(`http://localhost:4000/api/getClientId`);
  return data;
};
