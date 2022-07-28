import { Fragment, useCallback, useState, useEffect } from 'react';
import {Routes, Route} from 'react-router-dom';
import {Link} from 'react-router-dom'
import {ImHome} from 'react-icons/im'
import {BsLayoutTextSidebarReverse} from 'react-icons/bs'
import Menus from './ListMenus';
import Activities from '../Activity/Activities';
import Navigasi from './Navigasi';
import QueueList from '../Queue/QueueList';
import DonePayment from './DonePayment';
import { getDataQueue } from '../../Context-API/Actions';
import { useStoreContext } from '../../Context-API/Store-reducer'

const Layout = ()=> {
    const [isOpen, setOpen] = useState<boolean>(false)
    const handleOpen = useCallback(()=>{ setOpen(prev => !prev ) },[setOpen])

    
    const { dispatch } = useStoreContext()

    useEffect(()=> {

        (async ()=> {
            await getDataQueue(dispatch)
        })();
           
      },[dispatch])


    

    return(
        <div id="main-layout" className='border-2 shadow-md max-w-3xl mx-auto relative overflow-hidden'>
            <div className='bg-emerald-900 flex justify-between p-3'>
                <div id="logo" className='ml-3 flex gap-2'>
                    <span className='text-white text-2xl '><Link to='/'><ImHome /></Link></span>
                    <span className='font-light text-white'>Qory POS</span>
                </div>
                <span onClick={() => handleOpen()} className='mr-3 text-2xl text-white'><BsLayoutTextSidebarReverse /></span>
                
                    <Navigasi isOpen={isOpen} handleOpen={handleOpen} />
            </div>
            <div id="body" className='relative'>
                <Fragment>
                    <Routes>
                        <Route path='/' element={<Menus />} />
                        <Route path='/antrian' element={<QueueList />} />
                        <Route path='/aktivitas' element={<Activities />} />
                        <Route path='/done-payment' element={<DonePayment />} />
                    </Routes>
                </Fragment>
            </div>
        </div>      
    )
};

export default Layout;