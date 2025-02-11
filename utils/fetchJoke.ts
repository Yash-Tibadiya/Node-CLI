import axios from 'axios';
import { configDotenv } from 'dotenv';
configDotenv();

type JokeResponse = {
  joke:string,
}

const fetchJoke = async (): Promise<string> => {
    try {
        const response = await axios.get(
          "https://api.api-ninjas.com/v1/jokes",
          {
            headers: {
              "X-Api-Key": `${process.env.API_KEY}`,
            },
          }
        );

        if (!response) {
          console.error("No response received from API.");
        } else if (response.data && response.data.length > 0) {
            const data:JokeResponse[] = response.data;
            return data[0].joke;
        } else {
            return "No joke found.";
        }
        return "No response received from API.";
      } catch (error) {
        console.error("Error fetching quote:", error);
        return "Error on the Server Side!";
      }
};

// fetchJoke();
export { fetchJoke };