import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useStoreContext } from "../../Context-API/Store-reducer";
import {
        getDataQueue,
        getChanges,
        numberwithCommas,
        getDay,
        endpoint 
    } from "../../Context-API/Actions";
import '../../Styled/loading.css'



const QueueList = () => {

    const { state, dispatch } = useStoreContext()
    const [response, setResponse] = useState<{
        isLoading : boolean,
        isError   : boolean
    }>({isLoading : false, isError : false})
 
    

    const [amount, setAmount] = useState<string>('')
    const inputRef = useRef<null | any>(null)
    const navigate = useNavigate()

    useEffect(()=> {
        setResponse({isLoading:true, isError:false}) 
        getDataQueue(dispatch)
            .then((_)=> {
                setResponse({isLoading:false, isError:false})   
            }).catch((err)=> {
                if(err instanceof Error){
                    console.log(err.message)
                }
                setResponse({isLoading:false, isError:true})   
            })
    },[dispatch])

    const handleValid = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.setCustomValidity('Masukan nominal uang')
    }

    // Function for push to endpoint Activity API
    const pushToActivityAPI = async () => {
        try {
            await axios({
                method : 'POST',
                url : `${endpoint}/api/activity`,
                headers : {
                    'Content-Type' : 'application/json'
                },
                data : {
                        id  : Math.floor( Math.random() * ( 100 - 10 + 1 )) + 10 + 1234,
                        date : getDay(),
                        data : state.Queue[0].data,
                        total_price : state.Queue[0].total_price
                    }
            })
        } catch (error) {
            if(error instanceof Error){
                console.log(error.message);       
            }
        }
    }

    const handlePayment = async (id:number, total_price:number) => {

        // Tambah validasi amount, untuk sisa pembayaran
        if(id && amount !== ''){
            setResponse({isLoading:true, isError:false}) 
            getChanges(dispatch, parseInt(amount) - total_price )
            try {
     
                pushToActivityAPI()  

                await axios.delete(`${endpoint}/api/queue/delete/${id}`)
                setResponse({isLoading:false, isError:false}) 
                
                navigate('/done-payment')
                
            } catch (error) {
                if(error instanceof Error){
                    console.log(error.message);     
                }
            }
        }
        inputRef.current?.focus()
        return;
    }
    
    if (response.isLoading)
    return (
      <div style={{ height: "470px" }} className='loading'></div>
    );
  
    if (response.isError)
      return (
        <div 
        style={{ height: "470px" }} 
        className='flex justify-center items-center font-light text-xl'
        >
          Something went wrong !
        </div>
      );

    return(
        <div style={{ height: "470px" }}  className="p-3 overflow-auto">
            {
                state.Queue.length === 0 ? <div className='text-center text-2xl font-light'>Tidak ada bill antrian</div> :
                state.Queue.map((items,i) => (
                    <div key={i} className="flex flex-row gap-2 p-3 shadow-md border-l-4 border-emerald-800 bg-white rounded-md w-3/4 mx-auto">
                    <div id='left' className="w-3/5">
                        <span className='font-light text-sm'>ID {items.serial_id} | {items.name}</span>
                        {
                            items.data.map((item,i) => (
                                <div key={i} className='p-1'>
                                    <h1 className='font-semibold'>
                                        {item.title} {" "}  | {" "}
                                        <span className='text-xs'>{item.qty} x Rp {numberwithCommas(item.price)}</span>
                                    </h1>
                                    <p className='text-[13px]'> Rp {numberwithCommas(item.total_price)},-</p>
                                    <p className='text-sm text-gray-400'>{item.description ? item.description : '-'}</p>
                                </div>
                            ))
                        }
                        <div className='mt-3 rounded-md p-1' >
                            <span className='font-light text-xl'>Total Rp {numberwithCommas(items.total_price)},-</span>
                        </div>
                    </div>
                    <div id='right' className='mx-auto 2/5'>
                        <form action="" onSubmit={e => e.preventDefault()}>
                            <input
                                ref={inputRef}
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className='w-full h-20 px-1 font-light bg-gray-50 rounded-md tracking-[2px] focus:border-sky-600 focus:ring-2 focus:outline-none text-center placeholder:text-sm'
                                placeholder='Masukan uang anda Rp.-'
                                type='number'
                                onInvalid={handleValid}
                                required
                                />
                            <button
                             className='w-full mt-2 rounded-md py-3 text-white bg-emerald-900  hover:bg-emerald-800'
                             onClick={()=> handlePayment(items.id, items.total_price)}
                             >
                            {response.isLoading ? 'Proses . . .' : 'Bayar'}
                            </button>
                        </form>
                    </div>
                </div>
                ))
            }
            <p className='text-center mt-12 font-semibold text-gray-300'>qorypos - 2022</p>
        </div>
    )
}

export default QueueList;
