import React, { useEffect }  from 'react'
import {GrStackOverflow} from 'react-icons/gr'
import {FiActivity} from 'react-icons/fi'
import {Link} from 'react-router-dom';
import {useStoreContext} from '../../Context-API/Store-reducer'
import { getDataQueue } from '../../Context-API/Actions'
 
type Props = {
  isOpen : boolean,
  handleOpen : () => void
}

function Navigasi({ isOpen ,handleOpen}: Props) {

  const {state, dispatch} = useStoreContext()

    // Update queue API
    useEffect(()=> {
      (async ()=> {
        await getDataQueue(dispatch)
      })()
    },[dispatch])

  return (
    <div  
        style={{transform : isOpen ? "translateX(0%)" : "translateX(300%)"}} 
        className='absolute z-50 top-0 right-0 w-1/3 h-full bg-emerald-900 border-l-2 border-white transition duration-500'
        >
        <span
          onClick={() => handleOpen()}
          className = "m-1 text-3xl text-white float-right -translate-y-2 cursor-pointer"
        >
          &#x292B;
        </span>
        <div id="page" className='flex flex-col gap-3 p-3'>
          <Link to='/antrian'>
            <div className='flex items-center gap-2 border-[1px] rounded-md hover:bg-emerald-700 p-1 text-white text-lg font-light'>
              <span><GrStackOverflow /></span>
              <p>Antrian</p>
              <p className='text-sm text-red-600 -translate-y-1 -translate-x-2 font-semibold border-[1px] h-5 w-5 rounded-full text-center bg-white'>{state.Queue.length}</p>
            </div>
          </Link>
          <Link to='/aktivitas'>
            <div className='flex items-center gap-2 border-[1px] rounded-md hover:bg-emerald-700 p-1 text-white text-lg font-light'>
              <span><FiActivity /></span>
              <p>Aktivitas</p>
            </div>
          </Link>
        </div>
    </div>
  )
}

export default Navigasi;