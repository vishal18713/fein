import axios from "axios";

const pinata = {
  upload: {
    file: async (formData: FormData) => {
      const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
      const jwt = process.env.PINATA_JWT;

      if (!jwt) {
        throw new Error("Pinata JWT is missing");
      }

      const response = await axios.post(url, formData, {
        maxContentLength: Infinity,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${jwt}`,
        },
      });

      return response.data;
    },
  },
};

export default pinata;
