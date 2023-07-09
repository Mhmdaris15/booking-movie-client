import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import ApiDataContext from "../components/ApiDataContext";

const Payment = () => {
  const { state } = useLocation();
  const { selectedSeats, showtimeID } = state || {
    selectedSeats: [],
    showtimeID: null,
  };
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  const { seatsData, showtimesData, data } = useContext(ApiDataContext);
  const seats = seatsData.filter((seat) => selectedSeats.includes(seat.id));
  const showtime = showtimesData.find((showtime) => showtime.id == showtimeID);
  const movie = data.find((movie) => movie.movie_data.id == showtime?.movie_id);
  const currentDateTime = new Date().toLocaleString();

  return (
    <div>
      {selectedSeats.length != 0 && token ? (
        <div>
          <h1>Payment Success</h1>
          <h2>Showtime: {showtime?.StartTime} WIB</h2>
          <h2>Movie: {movie?.movie_data.title}</h2>
          {seats.map((seat) => (
            <div key={seat.id}>
              <p>Seat Number: {seat.SeatNumber}</p>
            </div>
          ))}
          <h2>Single Seat Price: {movie?.movie_data?.ticket_price}</h2>
          <h2>Date : {currentDateTime}</h2>
          <h2>
            Total Price:{" "}
            {movie?.movie_data?.ticket_price * selectedSeats.length}
          </h2>
        </div>
      ) : (
        <div>
          <h1>There is no payment </h1>
        </div>
      )}
    </div>
  );
};

export default Payment;
