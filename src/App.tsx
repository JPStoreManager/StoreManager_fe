import AppRouter from "./route/AppRouter";
import { Provider } from "react-redux";
import store from "./auth/reducerConfig";

const App: React.FC = () => {   
  return (
    <Provider store={store}>
      <AppRouter/>
    </Provider>
  )
};

export default App;