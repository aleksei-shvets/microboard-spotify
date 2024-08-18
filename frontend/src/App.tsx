import { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/index';
import './App.css';
import paths from './routes';
import Home from './pages/Home';

const App:FC = () => {
  return (
    <div className="main-container">
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path={paths.home} element={<Home />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
