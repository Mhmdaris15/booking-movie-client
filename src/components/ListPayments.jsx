import React, { useContext, useEffect, useState } from 'react';
import ApiDataContext from './ApiDataContext';
import { GrClose } from 'react-icons/gr';
import { AiOutlineMenuUnfold } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';


const ListPayments = () => {
  const { data, showtimesData, ticketsData, cinemasData } = useContext(ApiDataContext);
  const [appear, setAppear] = useState(false);
  const [movies, setMovies] = useState([]);
  const [showtimes, setShowtimes] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [cinemas, setCinemas] = useState([]);
  const [movie, setMovie] = useState(null);
  const [showtime, setShowtime] = useState(null);
  const [cinema, setCinema] = useState(null);

  const navigate = useNavigate()

  useEffect(() => {
    setMovies(data);
    setShowtimes(showtimesData);
    setTickets(ticketsData);
    setCinemas(cinemasData);
  }, [data, showtimesData, ticketsData, cinemasData]);

  useEffect(() => {
    if (ticketsData && ticketsData.length > 0) {
      ticketsData.forEach((ticket) => {
        const movieData = movies.find((movie) => movie.movie_data.id === ticket.movie_id);
        const showtimeData = showtimes.find((showtime) => showtime.id === ticket.showtime_id);
        const cinemaData = cinemas.find((cinema) => cinema.id === ticket.cinema_id);
  
        setMovie(movieData);
        setShowtime(showtimeData);
        setCinema(cinemaData);
      });
    }
  }, [ticketsData, movies, showtimes, cinemas]);
  

  return (
    <>
      <AiOutlineMenuUnfold
        className="text-gray-950 w-16 m-5 h-16 p-2 text-4xl bg-blue-300 rounded-lg hover:bg-blue-700 hover:text-gray-50 transition-all cursor-pointer"
        onClick={() => setAppear(true)}
      />

      {appear && (
        <div className="absolute z-20 top-0 bg-blue-400 w-fit p-5 rounded-b-xl h-screen">
          <h1 className="relative">List Payments</h1>
          <button className="absolute right-10 top-10 text-gray-50" onClick={() => setAppear(false)}>
            <GrClose className="text-gray-50 text-4xl hover:rotate-45 transition-all" />
          </button>
          <div className="flex flex-col gap-y-3">
            {ticketsData?.map((ticket) => {
              const movieData = movies.find((movie) => movie.movie_data.id === ticket.movie_id);
              const showtimeData = showtimes.find((showtime) => showtime.id === ticket.showtime_id);
              const cinemaData = cinemas.find((cinema) => cinema.id === ticket.cinema_id);

              return (
                <div key={ticket.id} className="py-5 px-3 bg-blue-950 text-gray-50 rounded-md">
                  <p>{ticket.id}</p>
                  <p>{movieData?.movie_data.title}</p>
                  <p>{cinemaData?.name}</p>
                  <p>{showtimeData?.StartTime}</p>
                  <p>{ticket.totalPrice}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default ListPayments;
