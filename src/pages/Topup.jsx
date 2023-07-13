import React, { useContext, useEffect, useState } from 'react'
import ApiDataContext from '../components/ApiDataContext';
import axios from 'axios';

const baseURL = "http://localhost:3000";

const Topup = () => {

    const { userData } = useContext(ApiDataContext)
    const [ user, setUser ] = useState(null)
    
    console.log(userData)    

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
    
    const [selected, setSelected] = useState(null)
    const [confirm, setConfirm] = useState(false)

    const handleSubmit = () => {
        console.log(selected)
        setConfirm(false)
        setUser({
            ...user,
            balance: user.balance + selected.amount
        })
        axios.put(`${baseURL}/users/${userData.username}`, {
            ...user,
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userData.token}`
        }
    })
    .then((res) => {
        console.log(res)
    })
    .catch((err) => {
        console.log(err)
    })

    }


  return (
    <div className='h-full'>
        <div className='bg-blue-950 p-10 h-[40em]'>
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