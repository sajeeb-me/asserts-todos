import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import MyTodos from './Pages/MyTodos/MyTodos';
import Navbar from './Components/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/todos' element={<MyTodos />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
