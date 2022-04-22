import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { endpoint } from '../../Context-API/Actions'

type Props = {
    isOpen : boolean,
    setOpen : React.Dispatch<React.SetStateAction<boolean>>

}

const DeleteModal:React.FC<Props> = ({isOpen, setOpen}):JSX.Element => {
    const navigate = useNavigate()
    const handleDelete = async():Promise<void> => {

        try {
            await axios.delete(`${endpoint}/api/activity/deleteAll`)
                navigate('/')
        } catch (error) {
            if(error instanceof Error){
                console.log(error.message);  
            }
        }
    }
    return(
        <div 
            id="modal-container"
            className="absolute w-full transition duration-700 z-10 "
            style={{transform: isOpen ? 'translateY(0%)' : 'translateY(-300%)'}}
        >
            <div className="w-2/4 mx-auto flex flex-col border-[1px] rounded-sm p-3 bg-white" >
                <div className='h-16 '>
                    <span>Yakin ingin menghapus semua aktivitas transaksi ?</span> <br />
                </div>
                <div>
                    <button
                     className='w-32 p-2 bg-red-200 rounded-md hover:bg-red-300 mr-2'
                     onClick={()=> handleDelete()}
                     >
                       Ya
                    </button>

                    <button
                      className='w-32 p-2 bg-emerald-300 rounded-md hover:bg-emerald-400'
                      onClick={() => setOpen(false)}
                      >
                        Tidak
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeleteModal