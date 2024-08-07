import { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import paths from './routes';
import Home from './pages/Home';

const App:FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={paths.home} element={<Home />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
