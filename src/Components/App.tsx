import Layout from './Layout/Main/Main-layout';
import { AppContext } from './Context-API/Store-reducer';

const App:React.FC = () => {

    if(window.innerWidth < 768 ) {
        return <div style={{ width:"100%", height : "100vh" }} className='flex justify-center items-center'> 
                    <h1>This app no provide for mobile device!</h1> 
                </div>
    }

    return(
        <AppContext>
            <Layout />
        </AppContext>
    )
}

export default App;