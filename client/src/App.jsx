import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Cards from './components/Cards';
import CardPage from './components/CardPage';
import StyledForm from './components/StyledForm';
import Lists from './components/Lists';
import ListingsPage from './components/ListingsPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div><ToastContainer position="top-center" autoClose={3000} hideProgressBar />
    <Router>
      <Routes>
        <Route exact path="/" element={<StyledForm/>} />
        <Route path="/voting" element={<CardPage/>} />
        <Route path="/listing" element={<ListingsPage/>} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
