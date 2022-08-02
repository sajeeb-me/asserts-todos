import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import MyTodos from './Pages/MyTodos/MyTodos';
import Navbar from './Components/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/todos' element={<MyTodos />} />
      </Routes>
    </div>
  );
}

export default App;
