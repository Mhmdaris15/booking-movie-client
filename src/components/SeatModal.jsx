import React, { useContext } from "react";
import ApiDataContext from "./ApiDataContext";

const SeatModal = ({ onToggle, showtimeID }) => {
  let { seatsData } = useContext(ApiDataContext);

  seatsData = seatsData.filter((seat) => seat.showtime_id == showtimeID);

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div className="fixed inset-0 w-full h-full bg-black opacity-40"></div>
      <div className="flex items-center min-h-screen px-4 py-8">
        <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
          <div className="mt-3">
            <div className="flex items-center justify-center w-12 h-12 mx-auto bg-green-100 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-green-600"
                viewBox="0 0 20 20"
                fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="mt-2 text-center">
              <h4 className="text-lg font-medium text-gray-800">
                Successfully accepted!
              </h4>
            </div>
          </div>
          <div>
            {/* Looping 64 blocks */}
            <div className="grid grid-cols-8 gap-2 mt-5">
              {Array(64)
                .fill()
                .map((_, idx) => (
                  <div
                    key={idx}
                    className="w-8 h-8 bg-gray-200 rounded-md"></div>
                ))}
            </div>
          </div>
          <div className="items-center gap-2 mt-3 sm:flex">
            <button
              onClick={() => onToggle(showtimeID)}
              className="w-full mt-2 p-2.5 flex-1 text-white bg-indigo-600 rounded-md outline-none ring-offset-2 ring-indigo-600 focus:ring-2">
              Dashboard
            </button>
            <button
              onClick={() => onToggle(showtimeID)}
              className="w-full mt-2 p-2.5 flex-1 text-gray-800 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2">
              Undo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatModal;
