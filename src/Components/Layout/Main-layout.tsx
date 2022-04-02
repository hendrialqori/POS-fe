import { Fragment, useCallback, useState } from 'react';
import {Routes, Route} from 'react-router-dom';
import {Link} from 'react-router-dom'
import {ImHome} from 'react-icons/im'
import {BsLayoutTextSidebarReverse} from 'react-icons/bs'
import Menus from './ListMenus';
import Activities from './Activities';
import Navigasi from './Navigasi';
import QueueList from './QueueList';


const Layout = ()=> {
    const [isOpen, setOpen] = useState<boolean>(false)
    const handleOpen = useCallback(()=>{ setOpen(prev => !prev ) },[setOpen])
    console.log("re-render");
    
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
            </Routes>
        </Fragment>
            </div>
        </div>      
    )
};

export default Layout;