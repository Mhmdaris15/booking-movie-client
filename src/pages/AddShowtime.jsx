import React, { useContext, useEffect, useState } from 'react'
import ApiDataContext from "../components/ApiDataContext"
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'

const baseURL = "http://103.166.164.97:2003"

const AddShowtime = () => {

  const { data, cinemasData } = useContext(ApiDataContext)
  const [movies, setMovies] = useState([])
  const [cinemas, setCinemas] = useState([])
  
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [selectedCinema, setSelectedCinema] = useState(null)
  const [selectedStartTime, setSelectedStartTime] = useState(null)
  const [selectedEndTime, setSelectedEndTime] = useState(null)

  const navigate = useNavigate()

  useEffect(  () => {
    setMovies(data)
    setCinemas(cinemasData)

  }, [data, cinemasData])

  const handleSubmit = () => {
    const formData = {
      movie_id: selectedMovie,
      cinema_id: selectedCinema,
      StartTime: selectedStartTime,
      EndTime: selectedEndTime
    } 

    axios.post(`${baseURL}/showtimes`, formData, 
    {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization' : `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => {
      console.log(response)
      showSuccess()
      setTimeout(() => {
        navigate('/')
      }, 3000);
    })
    .catch(error => {
      console.log(error)
    })
  }

  const showSuccess = () => {
    toast.success('Showtime added successfully!', {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      draggable: true
    })
  }

  return (
    <div className='h-screen w-screen'>
        <h1 className='text-center'>Add Showtime</h1>
         <ToastContainer />
        <div className='bg-blue-800 h-4/5 text-gray-50 flex flex-col items-center pt-5 gap-5'>
          <div className='w-fit flex flex-col gap-2'>
            <label htmlFor="movie" className='font-bold text-2xl text-center'>Movie</label>
            <select name="movie" id="movie" value={selectedMovie} onChange={event => setSelectedMovie(event.target.value)} className='text-gray-950 font-bold rounded-lg' >
              <option value="0">Select a movie</option>
              {movies?.map(movie => {
                return <option className='text-gray-950 font-roboto' value={movie.movie_data.id}>{movie.movie_data.title}</option>
              })}
            </select>
          </div>
          <div className='w-fit flex flex-col gap-2 '>
            <label htmlFor="movie" className='font-bold text-2xl text-center'>Cinema</label>
            <select name="movie" id="movie" value={selectedCinema} onChange={event => setSelectedCinema(event.target.value)} className='text-gray-950 font-bold rounded-lg' >
              <option value="0">Select a Cinema</option>
              {cinemas?.map(cinema => {
                return <option className='text-gray-950 font-roboto' value={cinema.id}>{cinema.name}</option>
              })}
            </select>
          </div>
          <div className='w-fit flex flex-col gap-2'>
            <label htmlFor="start_time" className='font-bold text-2xl text-center'>Time Start</label>
            <input type="time" name="start_time" id="start_time" className='text-gray-950 font-bold rounded-lg'
              value={selectedStartTime}
              onChange={(event) => setSelectedStartTime(event.target.value)}
            />
          </div>
          <div className='w-fit flex flex-col gap-2'>
            <label htmlFor="end_time" className='font-bold text-2xl text-center'>Time Start</label>
            <input type="time" name="end_time" id="end_time" className='text-gray-950 font-bold rounded-lg'
              value={selectedEndTime}
              onChange={(event) => setSelectedEndTime(event.target.value)}
            />
          </div>
          <button
    className="px-7 py-3 text-white duration-150 bg-indigo-400 rounded-lg hover:bg-indigo-700 active:shadow-lg"
    onClick={handleSubmit}
>
    Submit
</button>

        </div>
    </div>
  )
}

export default AddShowtime