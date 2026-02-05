import { Provider } from "react-redux";
import appStore from "./store/appStore";
import AppRouter from "./components/AppRouter";

const App = () => {
  return (
    <Provider store={appStore}>
      <AppRouter />
    </Provider>
  );
};

export default App;
