import axios from "axios";

export const getProviderId = async (email, password) => {
  const { data } = await axios.get(
    `http://localhost:4000/api/login/${email}/${password}`
  );
  return data;
};
