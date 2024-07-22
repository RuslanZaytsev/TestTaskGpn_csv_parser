import axios from "axios";

const getCSV = async () => {
  const response = await axios
    .get("http://localhost:3001/csv")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error, "axios error");
    });
  return response;
};

export { getCSV };
