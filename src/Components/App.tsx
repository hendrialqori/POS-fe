import Layout from './Layout/Main/Main-layout';
import { AppContext } from './Context-API/Store-reducer';

const App:React.FC = () => {
    return(
        <AppContext>
            <Layout />
        </AppContext>
    )
}

export default App;