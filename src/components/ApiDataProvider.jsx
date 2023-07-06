import { useEffect, useState } from "react";
import ApiDataContext from "./ApiDataContext";
import axios from "axios";

const baseURL = "http://localhost:3000";

const ApiDataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [cinemasData, setCinemasData] = useState([]);
  const [showtimesData, setShowtimesData] = useState([]);
  const [seatsData, setSeatsData] = useState([]);

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

    fetchData();
    fetchCinemasData();
    fetchShowtimesData();
    fetchSeatsData();
  }, []);

  return (
    <ApiDataContext.Provider
      value={{ data, cinemasData, showtimesData, seatsData }}>
      {children}
    </ApiDataContext.Provider>
  );
};

export default ApiDataProvider;
