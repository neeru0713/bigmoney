import logo from "./logo.svg";
import "./App.css";
import Selector from "./components/Selector";
import TextField from "./components/TextField";
import { useState } from "react";
import Modal from "./components/Modal";

function App() {
  const [showModal, setShowModal] = useState(true);

  return (
    <div className="App">
      <Modal 
      showModal={showModal}
      setShowModal={setShowModal}
      height={700}
      width={500}
    />
    </div>
   
  );
}

export default App;
