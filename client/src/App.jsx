import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import CardPage from './components/CardPage';
import StyledForm from './components/StyledForm';
import ListingsPage from './components/ListingsPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div><ToastContainer position="top-center" autoClose={3000} hideProgressBar />
    <Router>
      <Routes>
        <Route path="/" element={<StyledForm/>} />
        <Route path="/voting" element={<CardPage/>} />
        <Route path="/listing/:id" element={<ListingsPage />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
