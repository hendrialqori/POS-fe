import { useStoreContext } from "../../Context-API/Store-reducer"
import { numberwithCommas } from "../../Context-API/Actions"
import { Link } from "react-router-dom"


const DonePayment = () => {

    const { state } = useStoreContext()
    return(
        <div style={{ height: "470px" }}>
            <div className="flex flex-col justify-center items-center h-full gap-y-3">
                <span className="text-xl font-light">Sisa kembalian</span>
                <h1 className="text-4xl font-semibold">Rp {numberwithCommas(state.changes)},-</h1>
                <Link className="border-2 w-2/5 rounded-md p-2 text-center bg-emerald-800 hover:bg-emerald-700 text-white" to='/'>
                    Kembali ke menu
                </Link>
            </div>
        </div>
    )
}

export default DonePayment