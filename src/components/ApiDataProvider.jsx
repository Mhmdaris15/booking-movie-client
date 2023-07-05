import { useEffect, useState } from "react";
import ApiDataContext from "./ApiDataContext";
import axios from "axios";

const ApiDataProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [cinemasData, setCinemasData] = useState([]);
  const [showtimesData, setShowtimesData] = useState([]);
  const [seatsData, setSeatsData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/movies");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching movies data:", error);
      }
    };

    const fetchCinemasData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/cinemas");
        setCinemasData(response.data);
      } catch (error) {
        console.error("Error fetching cinemas data:", error);
      }
    };

    const fetchShowtimesData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/showtimes");
        setShowtimesData(response.data);
      } catch (error) {
        console.error("Error fetching showtimes data:", error);
      }
    };

    const fetchSeatsData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/seats");
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
