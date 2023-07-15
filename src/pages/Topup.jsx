import React, { useContext, useEffect, useState } from 'react'
import ApiDataContext from '../components/ApiDataContext';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';


const baseURL = "http://localhost:3000";

const Topup = () => {

    const { userData } = useContext(ApiDataContext);
    const [user, setUser] = useState();

    const packet = [
        {
            id: 1,
            label: "Rp 50.000,-",
            amount: 50000
        },
        {
            id: 2,
            label: "Rp 75.000,-",
            amount: 75000
        },
        {
            id: 3,
            label: "Rp 100.000,-",
            amount: 100000
        },
        {
            id: 4,
            label: "Rp 150.000,-",
            amount: 150000
        },
        {
            id: 5,
            label: "Rp 200.000,-",
            amount: 200000
        },
        {
            id: 6,
            label: "Rp 300.000,-",
            amount: 300000
        },
        {
            id: 7,
            label: "Rp 500.000,-",
            amount: 500000
        },
        {
            id: 8,
            label: "Rp 1.000.000,-",
            amount: 1000000
        },
    ]
    
    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem('token') === null) {
            showWarning()
            setTimeout(() => {
                navigate('/login')
            }, 3000);
        }
    }, [])

    const [selected, setSelected] = useState(null)
    const [confirm, setConfirm] = useState(false)

    const showSuccess = () => {
        toast.success('Top up success!', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
        })
        setTimeout(() => {
            navigate('/')
          }
        , 3000);
    }

    const showError = () => {
        toast.error('Top up failed!', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
        })
    }

    const showWarning = () => {
        toast.warn('Please Login or Register first!', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
        })
    }


    const handleSubmit = () => {
        setConfirm(false)
        // console.log(
        //     "User Data", userData
        // )
        setUser({
            // id: userData.id,
            // username: userData.username,
            // email: userData.email,
            // password: userData.password,
            // name: userData.name,
            // age: userData.age,
            // balanace: userData.balance + selected.amount,
            ...userData,
            balance: userData.balance + selected.amount,
        })
        console.log("User Data", {
            ...userData, balance: userData.balance + selected.amount
        })
        axios.put(`${baseURL}/users/${userData.username}`, {
            ...userData, balance: userData.balance + selected.amount
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
    .then((res) => {
        console.log(res)
        showSuccess()
    })
    .catch((err) => {
        console.log(err)
        showError()
    })

    }


  return (
    <div className='h-full'>
        <div className='bg-blue-950 p-10 h-[40em]'>
        <ToastContainer />
        <h1 className='font-roboto text-center text-gray-50'>Top Up</h1>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5'>
                {packet.map((item) => (
                    <div key={item.id} onClick={() => {
                        setConfirm(true)
                        setSelected(item)
                    }} className='flex flex-col items-center justify-center bg-gray-200 hover:bg-purple-400 transition-all cursor-pointer pt-5 rounded-md'>
                        <h1 className='font-roboto text-2xl font-bold'>{item.label}</h1>
                        <h1 className='font-roboto text-xl font-bold'>+{item.amount}</h1>
                    </div>
                ))}
                </div>
        </div>
        
       {confirm && (
         <div>
         <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-75">
         <div className="bg-white p-5 rounded-md text-center">
             <h3 className='font-medium'>Are you sure you want to top up with this amount of money?</h3>
                <h1 className="font-bold text-2xl">{selected.label}</h1>
             <div className="mt-4">
             <button className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2" onClick={handleSubmit}>
                 Yes
             </button>
             <button className="px-4 py-2 bg-gray-500 text-white rounded-md" onClick={() => setConfirm(false)}>
                 No
             </button>
         </div>
      </div>
        </div>
        </div>
         )}
    </div>

  )
}

export default Topup