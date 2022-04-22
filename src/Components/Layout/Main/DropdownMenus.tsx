import { useState, useEffect } from 'react';
import { getCategory } from '../../Context-API/Actions';
import { useStoreContext } from '../../Context-API/Store-reducer';
import {GoTriangleUp ,GoTriangleDown} from 'react-icons/go'

type Props = {
    chooseCategory : (data:string) => void
}

const Dropdown: React.FC<Props> = ({ chooseCategory }):JSX.Element => {
    const [open, setOpen] = useState<boolean>(false)
    const { state, dispatch } = useStoreContext()

    useEffect(()=> {

        (async ()=> {
          await getCategory(dispatch)
        })();
    
      },[dispatch])

    return(
        <div className='relative p-1'>
            <div
             className='relative bg-emerald-900  flex gap-1 items-center border-[2px] p-2 w-full mx-auto rounded-md cursor-pointer z-10'
             onClick={() => setOpen(prev => !prev)}
             >
                <p className='font-light text-white text-sm'>Category</p>
                <span className='text-white'>
                    {
                        !open ? <GoTriangleDown /> : <GoTriangleUp />
                    }
                </span>  
            </div>
            <div
              style={{transform: open ? 'translateY(0%)' : 'translateY(-100%)', opacity : open ? '100%' : '0%' }}
              className='absolute flex flex-col gap-1 p-2 bg-white w-full rounded-r-lg transform duration-500'
              onClick={() => setOpen(prev => !prev)}
              >
                  {
                      state.Category.map((item, i) => (
                        <span
                         key={i}
                         className='p-2 border-[1px] bg-emerald-800 rounded-md text-sm text-white font-light text-center cursor-pointer'
                         onClick={() => chooseCategory(item.name.toLowerCase())}
                         >
                            {item.name}
                        </span>
                      ))
                  }
            </div>
        </div> 
    )
}
export default Dropdown;