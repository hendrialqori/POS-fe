import React from 'react'
import {GrFormClose} from 'react-icons/gr'
import {Link} from 'react-router-dom';
 
type Props = {
  isOpen : boolean,
  handleOpen : () => void
}

function Navigasi({ isOpen ,handleOpen}: Props) {
  return (
    <div  
        style={{transform : isOpen ? "translateX(0%)" : "translateX(300%)"}} 
        className='absolute z-50 top-0 right-0 w-1/3 h-full bg-emerald-900 border-l-2 border-white transition duration-500'
        >
        <button 
          onClick={() => handleOpen()}
          className = "bg-white rounded-full m-1 float-right text-3xl"
        >
          <GrFormClose />
        </button>
        <div id="page" className='flex flex-col gap-3 p-3'>
          <span className='p-2 text-center w-2/4 rounded-md bg-white text-light'>
            <Link to="/antrian">Antrian</Link>
          </span>
          <span className='p-2 text-center hover:bg-emerald-50 w-2/4 rounded-md bg-white text-light'>
            <Link to="/aktivitas">Activitas</Link>
          </span>
        </div>
    </div>
  )
}

export default React.memo(Navigasi);