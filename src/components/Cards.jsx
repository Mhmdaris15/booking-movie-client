import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { API_URL } from "../helpers/Config";
import { Link } from "react-router-dom";
import ApiDataContext from "./ApiDataContext";

const Cards = () => {
  const imgRef = useRef(null);

  let { data } = useContext(ApiDataContext);
  data = data.map((item) => {
    imgRef.current = `data:image/jpeg;base64,${item.movie_image}`;
    return {
      ...item,
      movie_image: imgRef.current,
    };
  });

  const shortenDescription = (description) => {
    if (description.length > 400) {
      return description.substring(0, 100) + "...";
    }
    return description;
  };

  return (
    <section className="mt-12 mx-auto px-4 max-w-screen-xl md:px-8">
      <div className="text-center">
        <h1 className="text-3xl text-gray-800 font-semibold">Movies</h1>
        <p className="mt-3 text-gray-500">
          Movies that are loved by the people. Updated every hour.
        </p>
      </div>
      <div className="my-12 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((items, key) => (
          <article
            className="w-full mx-auto mt-4 shadow-lg border rounded-md duration-300 hover:shadow-sm"
            key={items.movie_data.id}>
            <Link to={`/movies/${items.movie_data.id}`}>
              <img
                src={items.movie_image}
                loading="lazy"
                alt={items.movie_data.title}
                className="w-full h-48 rounded-t-md object-contain"
              />
              <div className="flex items-center mt-2 pt-3 ml-4 mr-2">
                <div className="flex-none w-10 h-10 rounded-full">
                  <img
                    src={items.authorLogo}
                    className="w-full h-full rounded-full"
                    alt={items.authorName}
                  />
                </div>
                <div className="ml-3">
                  <span className="block text-gray-900">{items.title}</span>
                  <span className="block text-gray-400 text-sm">
                    {items.movie_data.age_rating}
                  </span>
                </div>
              </div>
              <div className="pt-3 ml-4 mr-2 mb-3">
                <h3 className="text-xl text-gray-900">
                  {items.movie_data.title}
                </h3>
                <p className="text-gray-400 text-sm mt-1">
                  {shortenDescription(items.movie_data.description)}
                </p>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Cards;
