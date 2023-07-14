import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Cinemas from "../components/Cinemas";

const baseURL = "http://103.166.164.97:2003"

const SingleMovie = () => {
  const [data, setData] = useState(null);
  const imgRef = useRef(null);
  const [cinemas, setCinemas] = useState([]);
  const [showtimes, setShowtimes] = useState([]);

  const movie_id = window.location.href.split("/").slice(-1)[0];

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${baseURL}/movies/${movie_id}`);
      const data = await response.json();
      imgRef.current = `data:image/jpeg;base64,${data.movie_image}`;
      setData(data.movie_data);
    };

    fetchData();
  }, []);

  function formatCurrency(number) {
    if (number == null) {
      return ""; // Return empty string for null or undefined input
    }

    const digitsOnly = String(number).replace(/\D/g, "");
    const groups = digitsOnly
      .split("")
      .reverse()
      .join("")
      .match(/.{1,3}/g);

    if (!groups) {
      return ""; // Return empty string if no groups are formed
    }

    const formatted = groups.join(".").split("").reverse().join("");

    return `Rp ${formatted},-`;
  }

  return (
    <section className="py-14 bg-gray-400">
      <div className="max-w-screen-xl mx-auto md:px-8">
        <div className="items-center gap-x-12 sm:px-4 md:px-0 lg:flex">
          <div className="flex-1 sm:hidden lg:block">
            <img
              src={imgRef.current}
              className="md:max-w-lg sm:rounded-lg"
              alt={data?.title}
            />
          </div>
          <div className="max-w-xl px-4 space-y-3 mt-6 sm:px-0 md:mt-0 lg:max-w-2xl">
            <h3 className="text-indigo-600 font-semibold">
              {data?.age_rating}
            </h3>
            <p className="text-gray-800 text-3xl font-semibold sm:text-4xl">
              {data?.title}
            </p>
            <p className="mt-3 text-gray-600">{data?.description}</p>
            <p className="p-5 bg-purple-600 text-gray-50 w-40 text-center rounded-full cursor-pointer hover:shadow-2xl hover:bg-purple-700 hover:font-bold transition-all shadow-gray-900">
              {formatCurrency(data?.ticket_price)}
            </p>
          </div>
        </div>
      </div>
      <Cinemas movie_id={movie_id} />
    </section>
  );
};

export default SingleMovie;
