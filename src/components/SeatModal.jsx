import React, { useContext, useState } from "react";
import ApiDataContext from "./ApiDataContext";
import { MdEventSeat } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const SeatModal = ({ onToggle, showtimeID }) => {
  let { seatsData } = useContext(ApiDataContext);

  seatsData = seatsData.filter((seat) => seat.showtime_id == showtimeID);

  const navigate = useNavigate();

  const [seats, setSeats] = useState([...seatsData]);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const changeAvailability = (seatID) => {
    // If seatID in selectedSeats and IsAvailable is false
    if (
      selectedSeats.includes(seatID) &&
      !seats.find((seat) => seat.id === seatID).IsAvailable
    ) {
      setSelectedSeats((prevSeats) => {
        return prevSeats.filter((seat) => seat !== seatID);
      });
      setSeats((prevSeats) => {
        return prevSeats.map((seat) => {
          if (seat.id === seatID) {
            return {
              ...seat,
              IsAvailable: !seat.IsAvailable,
            };
          }
          return seat;
        });
      });
      return;
    }

    // If selectedSeats.length is 6 and IsAvailable is false
    if (
      selectedSeats.length === 6 &&
      seats.find((seat) => seat.id === seatID).IsAvailable
    ) {
      showToastMessage("You can only select 6 seats");
      return;
    }

    // Change IsAvailable property of seat with seatID
    setSeats((prevSeats) => {
      return prevSeats.map((seat) => {
        if (seat.id === seatID) {
          return {
            ...seat,
            IsAvailable: !seat.IsAvailable,
          };
        }
        return seat;
      });
    });

    // Add or remove seatID from selectedSeats
    setSelectedSeats((prevSeats) => {
      return prevSeats.includes(seatID)
        ? prevSeats.filter((seat) => seat !== seatID)
        : [...prevSeats, seatID];
    });
  };

  const showToastMessage = (message) => {
    toast.error(message, {
      position: toast.POSITION.TOP_CENTER,
    });
  };
  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div className="fixed inset-0 w-full h-full bg-black opacity-40"></div>

      <div className="flex items-center min-h-screen px-4 py-8">
        <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
          <div className="mt-3">
            <div className="flex items-center justify-center w-20 h-20 mx-auto bg-green-100 rounded-full">
              <MdEventSeat className="w-10 h-10 text-green-600" />
            </div>
            <div className="mt-2 text-center">
              <h4 className="text-lg font-medium text-gray-800">
                Select Your Seats{" "}
                <span className="text-xs text-red-500 italic">
                  <br /> Maximum 6 Seats for each booking
                </span>
              </h4>
            </div>
          </div>
          <div>
            {/* Looping 64 blocks */}
            <div className="grid grid-cols-8 gap-2 mt-5">
              {seats.map((seat) => (
                <div key={seat.id}>
                  <div
                    onClick={() => changeAvailability(seat.id)}
                    className={`${
                      seat.IsAvailable ? "bg-green-500" : "bg-red-500"
                    } w-10 h-10 rounded-md cursor-pointer flex items-center justify-center`}>
                    {seat.SeatNumber}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="items-center gap-2 mt-3 sm:flex">
            <button
              onClick={() =>
                navigate("/payment", { state: { selectedSeats, showtimeID } })
              }
              className="w-full mt-2 p-2.5 flex-1 text-white bg-indigo-600 rounded-md outline-none ring-offset-2 ring-indigo-600 focus:ring-2">
              Checkout
            </button>
            <ToastContainer />
            <button
              onClick={() => onToggle(showtimeID)}
              className="w-full mt-2 p-2.5 flex-1 text-gray-800 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatModal;
