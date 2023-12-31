import { useEffect, useState } from "react";
import ApiDataContext from "./ApiDataContext";
import axios from "axios";

const baseURL = "https://booking-movie-app-production.up.railway.app";

const ApiDataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [cinemasData, setCinemasData] = useState([]);
  const [showtimesData, setShowtimesData] = useState([]);
  const [seatsData, setSeatsData] = useState([]);
  const [userData, setUserData] = useState(null);
  const [ticketsData, setTicketsData] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseURL}/movies`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching movies data:", error);
      }
    };

    const fetchCinemasData = async () => {
      try {
        const response = await axios.get(`${baseURL}/cinemas`);
        setCinemasData(response.data);
      } catch (error) {
        console.error("Error fetching cinemas data:", error);
      }
    };

    const fetchShowtimesData = async () => {
      try {
        const response = await axios.get(`${baseURL}/showtimes`);
        setShowtimesData(response.data);
      } catch (error) {
        console.error("Error fetching showtimes data:", error);
      }
    };

    const fetchSeatsData = async () => {
      try {
        const response = await axios.get(`${baseURL}/seats`);
        setSeatsData(response.data);
      } catch (error) {
        console.error("Error fetching seats data:", error);
      }
    };

    const fetchUserData = async () => {
      const username = localStorage.getItem("username");

      if (!username) {
        return;
      }

      try {
        const response = await axios.get(`${baseURL}/users/${username}`);
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const fetchTicketsData = async () => {
      try {
          const response = await axios.get(`${baseURL}/tickets/user/${localStorage.getItem("username")}`, {
              headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
          });
          setTicketsData(response.data);
      } catch (error) {
          console.error("Error fetching tickets data:", error);
      }
  };
    

    fetchData();
    fetchCinemasData();
    fetchShowtimesData();
    fetchSeatsData();
    fetchUserData();
    fetchTicketsData();
  }, []);

  return (
    <ApiDataContext.Provider
      value={{ data, cinemasData, showtimesData, seatsData, userData, ticketsData }}>
      {children}
    </ApiDataContext.Provider>
  );
};

export default ApiDataProvider;
