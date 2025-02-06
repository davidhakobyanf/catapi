import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './Header.module.css';
import { fetchCategories } from '../../redux/features/catSlice';
import { AppDispatch, RootState } from '../../redux/store';

const Header = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { categories, loading, error } = useSelector((state: RootState) => state.cats);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);
    console.log(categories, 'categories');

    return (
        <div className={styles.HeaderContainer}>
            {categories.map(({ id, name }) => (
                <div key={id} className={styles.item}>
                    {name}
                </div>
            ))}
        </div>
    );
};
export default Header;
