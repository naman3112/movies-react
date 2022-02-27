import logo from './logo.svg';
import './App.css';
import Movies from './Components/Movies';
import Home from './Components/Home';
import About from './Components/About';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
function App() {
  return (
    <Router>
      <Routes>
        {/* <Home /> */}
        <Route path='/' element={<Home/>} />

        {/* <Movies /> */}
        <Route path='/Movies' element={<Movies/>} />

        {/* <About /> */}
        <Route path='/About' element={<About/>} />
      </Routes>

    </Router>


  );
}

export default App;
