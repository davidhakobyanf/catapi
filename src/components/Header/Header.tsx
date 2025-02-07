import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../redux/features/catSlice';
import { AppDispatch, RootState } from '../../redux/store';
import { useNavigate, useParams } from 'react-router-dom';

import styles from './Header.module.css';

const Header = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { categories, loading, error } = useSelector((state: RootState) => state.cats);
    const navigate = useNavigate();
    const { name } = useParams();
    console.log(name, 'name');

    useEffect(() => {
        dispatch(fetchCategories());
        if (!name) {
            console.log('sadasda');

            navigate('boxes');
        }
    }, []);

    if (loading) return <p>Loading...</p>;
    return (
        <div className={styles.HeaderContainer}>
            {categories.map((item) => (
                <div
                    key={item.id}
                    className={`${styles.item} ${name === item.name ? styles.activeItem : ''}`}
                    onClick={() => navigate(`${item.name}`)}
                >
                    {item ? item?.name : null}
                </div>
            ))}
            {error && <p>{error}</p>}
        </div>
    );
};

export default Header;
