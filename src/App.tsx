import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './components/Home/Home';
import Layout from './components/Layout/Layout';
import NoPage from './components/NoPage/NoPage';
import { Provider } from 'react-redux';
import { store } from './redux/store';

const App = () => {
    return (
        <Routes>
            <Route path='/' element={<Layout />}>
                <Route index element={<Home />} />
                <Route path='/:name' element={<Home />} />
                <Route path='*' element={<NoPage />} />
            </Route>
        </Routes>
    );
};

export default App;
