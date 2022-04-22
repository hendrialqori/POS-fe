import { useEffect, Fragment, useState } from 'react'
import { useStoreContext } from '../../Context-API/Store-reducer'
import { getActivity, numberwithCommas } from '../../Context-API/Actions'
import DeleteModal from './DeleteModal'

function Activities() {

  const { state, dispatch } = useStoreContext()
  const [ isOpen, setOpen ] = useState<boolean>(false)

  useEffect(()=> {

    ( async()=> {
      await getActivity(dispatch)
    })();

  },[dispatch])

  return (
    <div style={{ height: "470px" }} className='p-3 overflow-y-auto '>
      <DeleteModal isOpen={isOpen} setOpen={setOpen} />
      <button 
          className='my-2 p-3 rounded-md bg-emerald-900 hover:bg-emerald-700 text-white'
          onClick={() => setOpen(true)}
          disabled={state.Activity.length === 0 && true}
          >
            Hapus semua
      </button>
        {
          state.Activity.map((items, i) => (
            <div key={i} className='relative border-[1px] border-l-4 mt-2 border-l-emerald-700 rounded-md p-2 shadow-md'>
              <span className='text-sm font-light'>{items.date} | {items.id}</span>
                <div className='p-1 flex justify-between'>
                  <div className='font-light'>
                    {
                      items.data && items.data.map((item, i) => (
                        <Fragment>
                          <p key={i}>
                            {item.title}{" "}
                            <span className='text-sm font-semibold'>x {item.qty}</span>
                          </p>

                        </Fragment>
                      ))
                    }
                  </div>
                  <div className='absolute top-2 right-2'>
                    <span className='font-bold'>Rp {numberwithCommas(items.total_price)},-</span>
                  </div>
              </div>
            </div>
          ))
        }
    </div>
  )
}

export default Activities