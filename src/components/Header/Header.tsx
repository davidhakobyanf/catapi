import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../redux/features/catSlice';
import { AppDispatch, RootState } from '../../redux/store';
import styles from './Header.module.css';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { categories, loading, error } = useSelector((state: RootState) => state.cats);
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    return (
        <div className={styles.HeaderContainer}>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p style={{ color: 'red' }}>Error: {error}</p>
            ) : (
                categories.map(({ id, name }) => (
                    <div key={id} className={styles.item} onClick={() => navigate(`${name}`)}>
                        {name}
                    </div>
                ))
            )}
        </div>
    );
};

export default Header;
