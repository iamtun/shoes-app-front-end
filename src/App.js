import RootNavigator from "../src/routers";
import { Provider } from "react-redux";
import store from "./redux/store.js";


function App() {
    return (
        <Provider store={store}>
            <RootNavigator />
        </Provider>
    );
}

export default App;
