import React, { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ApiDataContext from "../components/ApiDataContext";
import { BiTime, BiSolidMoviePlay } from "react-icons/bi"
import {MdOutlineEventSeat, MdOutlineAccountBalanceWallet} from "react-icons/md"
import {ImPriceTag} from "react-icons/im"
import {BsFillCalendarDateFill} from "react-icons/bs"
import {IoIosPricetags} from "react-icons/io"
import {GiTheater} from "react-icons/gi"
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const baseURL = "http://localhost:3000";

const Payment = () => {
  const { state } = useLocation();
  const { selectedSeats, showtimeID } = state || {
    selectedSeats: [],
    showtimeID: null,
  };
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  const { seatsData, showtimesData, data, userData, cinemasData } = useContext(ApiDataContext);
  const seats = seatsData?.filter((seat) => selectedSeats.includes(seat.id));
  const showtime = showtimesData?.find((showtime) => showtime.id == showtimeID);
  const movie = data?.find((movie) => movie.movie_data.id == showtime?.movie_id);
  const cinema = cinemasData?.find((cinema) => cinema.id == showtime?.cinema_id);

  const currentDateTime = new Date().toLocaleString();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token') === null) {
        showWarning()
        setTimeout(() => {
            navigate('/login')
        }, 3000);
    }
  }, [])

  const showWarning = () => {
    toast.warn('Please Login or Register first!', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
    })
}

  const showError = () => {
    toast.error('Top up failed!', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
    })
  }

  const showSuccess = () => {
    toast.success("Payment Success!", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
    });
  };

  const toRupiah = (number) => {
    const formatter = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  
    return formatter.format(number);
  }

  const handleSubmit = async () => {
    const postData = {
      movie_id : movie?.movie_data.id,
      user_id: userData.id,
      showtime_id: showtimeID,
      seat_id: selectedSeats,
      transactionDate: currentDateTime,
      totalPrice: movie?.movie_data?.ticket_price * selectedSeats.length
    }
    console.log(postData)
    try {
      const postTicket = await axios.post(`${baseURL}/tickets`, postData , {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization' : `Bearer ${token}`
        }
      })
      console.log(postTicket)
      if (postTicket.status == 201) {
        showSuccess()
        setTimeout(() => {
          // navigate('/ticket')
          // disable the submit button 
          // disable the submit button
          const postData = {
            ...userData,
            balance: userData.balance - (movie?.movie_data?.ticket_price * selectedSeats.length)
          }
          console.log(postData)
          axios.put(`${baseURL}/users/${username}`, postData, {
            headers: {
              'Content-Type': 'application/json', 
              'Accept': 'application/json',
              "Authorization": `Bearer ${token}`
            }
          })
          .then((res) => {
            console.log(res)
            if (res.status === 200) {
              showSuccess()
            }
          }
          )
          .catch((err) => {
            console.log(err)
            showError()
          }
          )

        }, 3000);
      }
      
    } catch (error) {
      console.log(error)
      showError()
    }

  }
  return (
    <div className="bg-gray-400 w-screen h-screen">
      <ToastContainer />
      {selectedSeats.length != 0 && token ? (
      <>
      <h1 className="text-center py-6 text-gray-950">Payment Process</h1>
        <div className="flex flex-col gap-5 bg-blue-950 max-w-3xl mx-auto px-16 py-7 rounded-xl text-gray-50">
          <div className="flex gap-6 items-center"><BiTime className="text-5xl" /> <p className="text-3xl font-roboto"><p>Showtime :</p> {showtime?.StartTime} WIB</p></div>
          <div className="flex gap-6 items-center"><GiTheater className="text-5xl" /> <p className="text-3xl font-roboto"><p>Cinema :</p> {cinema?.name} Cinema</p></div>
          <div className="flex gap-6 items-center"><BiSolidMoviePlay className="text-5xl" /> <p className="text-3xl font-roboto"><p>Movie:</p> {movie?.movie_data.title}</p></div>
          <div className="flex gap-6 items-center"><MdOutlineEventSeat className="text-5xl" /> 
          {seats.map((seat) => (
              <p key={seat.id} className="text-3xl"><p>Seat Number:</p> {seat.SeatNumber}</p>
          ))}
            </div>
          <div className="flex gap-6 items-center"><ImPriceTag className="text-5xl" /> <p className="text-3xl font-roboto"><p>Single Seat Price:</p> {toRupiah(movie?.movie_data?.ticket_price)}</p></div>
          <div className="flex gap-6 items-center"><BsFillCalendarDateFill className="text-5xl" /> <p className="text-3xl font-roboto"><p>Date :</p> {currentDateTime}</p></div>
          <div className="flex gap-6 items-center"><IoIosPricetags className="text-5xl" /> <p className="text-3xl font-roboto">
          <p>Total Price:</p>
            {toRupiah(movie?.movie_data?.ticket_price * selectedSeats.length)}</p></div>
            <div className="flex gap-6 items-center"><IoIosPricetags className="text-5xl" /> <p className="text-3xl font-roboto">
          <p >Your Current Balance:</p>
            <p className={`text-3xl font-roboto ${(movie?.movie_data?.ticket_price * selectedSeats.length) <= (userData?.balance) ? "text-green-400" : "text-red-500"}`}>{toRupiah(userData?.balance)}</p><p className={`text-red-500 italic text-sm ${(movie?.movie_data?.ticket_price * selectedSeats.length) <= (userData?.balance) ? "hidden" : "block"}`}>Your Balance is not enough to make this payment. Please top up your balance</p></p></div>
            <p className="text-yellow-300 italic text-sm">Please Hard Refresh the browser, if your balance haven't updated yet!</p>
          <button onClick={handleSubmit} type="submit" className="bg-red-600 px-5 py-3 rounded-lg w-fit mx-auto font-roboto uppercase font-bold text-lg hover:bg-red-900 transition-all hover:-translate-y-2 hover:shadow-sm">Checkout now!</button>
        </div>
        </>
      ) : (
        <div>
          <h1 className="text-center" >There is no payment </h1>
        </div>
      )}
    </div>
  );
};

export default Payment;
