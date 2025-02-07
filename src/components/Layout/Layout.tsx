import { Outlet } from 'react-router-dom';

import Header from '../Header/Header';
import styles from './Layout.module.css';
const Layout = () => {
    return (
        <div className={styles.layoutContainer}>
            <Header />
            <Outlet />
        </div>
    );
};
export default Layout;
