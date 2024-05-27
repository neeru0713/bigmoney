import "./App.css";
import NavBar from "./components/NavBar";
import HomePage from "./components/HomePage";
import store from './store/store.js'
import { Provider } from 'react-redux'

function App() {

  return (
    <Provider store={store}>
    <div className="App">
      <NavBar />
      <HomePage />
    </div>
    </Provider>
  );
}

export default App;
