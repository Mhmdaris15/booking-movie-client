import { useContext, useEffect, useState } from "react";
import SeatModal from "./SeatModal";
import ApiDataContext from "./ApiDataContext";

const Cinemas = ({ movie_id }) => {
  const [seatModals, setSeatModals] = useState({});

  let { showtimesData, cinemasData } = useContext(ApiDataContext);

  showtimesData = showtimesData.filter(
    (showtime) => showtime.movie_id === movie_id
  );

  const toggleSeatModal = (showtime_id) => {
    setSeatModals((prev) => ({
      ...prev,
      [showtime_id]: !prev[showtime_id],
    }));
  };

  useEffect(() => {
    const initialSeatModals = {};
    for (const showtime of showtimesData) {
      initialSeatModals[showtime.id] = false;
    }
    setSeatModals(initialSeatModals);
  }, []);

  return (
    <section className="py-14">
      <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
        <div className="relative max-w-2xl mx-auto sm:text-center">
          <div className="relative z-10">
            <h3 className="text-gray-50 text-3xl font-semibold sm:text-4xl">
              Watch this movie on your favorite cinema
            </h3>
            <p className="mt-3 text-blue-950">
              You can select your favorite cinema and watch this movie there
              along with showtime you want.
            </p>
          </div>
          <div
            className="absolute inset-0 max-w-xs mx-auto h-44 blur-[118px]"
            style={{
              background:
                "linear-gradient(152.92deg, rgba(192, 132, 252, 0.2) 4.54%, rgba(232, 121, 249, 0.26) 34.2%, rgba(192, 132, 252, 0.1) 77.55%)",
            }}></div>
        </div>
        <div className="relative mt-12">
          <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {cinemasData.map((item, idx) => (
              <li
                key={idx}
                className="bg-white space-y-3 p-4 border rounded-lg hover:bg-slate-100 transition-all">
                <div className="text-indigo-600 pb-3 flex text-sm justify-between">
                  <span>{item.email}</span>
                  <span>{item.phone}</span>
                </div>
                <h4 className="text-xl text-gray-800 font-semibold">
                  {item.name} - Cinema
                </h4>
                <p>
                  <span className="font-bold text-blue-500">Address : </span>
                  {item.address}
                </p>
                <div className="grid grid-cols-2">
                  <p>
                    <span className="font-bold text-blue-500">City : </span>
                    {item.city}
                  </p>
                  <p>
                    <span className="font-bold text-blue-500">Province : </span>
                    {item.province}
                  </p>
                  <div className="">
                    <span className="font-bold text-blue-500 mb-5">
                      Showtimes :
                    </span>
                    {showtimesData
                      .filter((showtime) => showtime.cinema_id == item.id)
                      .map((showtime, index) => (
                        <div key={index}>
                          <button
                            onClick={() => toggleSeatModal(showtime.id)}
                            key={showtime.id}
                            type="button"
                            className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900">
                            {showtime.StartTime} - {showtime.EndTime}
                          </button>
                          {seatModals[showtime.id] && (
                            <SeatModal
                              onToggle={toggleSeatModal}
                              showtimeID={showtime.id}
                            />
                          )}
                        </div>
                      ))}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Cinemas;
