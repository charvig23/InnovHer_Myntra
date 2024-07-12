import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Cards from './components/Cards';
import CardPage from './CardPage';
import StyledForm from './components/StyledForm';
import Lists from './components/Lists';
import ListingsPage from './ListingsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<StyledForm/>} />
        <Route path="/voting" element={<CardPage/>} />
        <Route path="/listing" element={<ListingsPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
