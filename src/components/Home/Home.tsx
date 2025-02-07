import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, RootState } from '../../redux/store';
import { fetchCatImages } from '../../redux/features/catSingleSlice';

import styles from './Home.module.css';
import { useParams } from 'react-router-dom';
import Select from '../utils/Select/Select';

const Home = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { name } = useParams();
    const [limit, setLimit] = useState<number>(10);
    const { images, status, error } = useSelector((state: RootState) => state.catsImage);
    const { categories, loading } = useSelector((state: RootState) => state.cats);
    const options: number[] = [1, 5, 10, 15, 20];
    const categoryId = categories?.find((item) => item.name === name)?.id as number;
    useEffect(() => {
        if (categoryId && limit) {
            dispatch(fetchCatImages({ categoryId, limit }));
        }
    }, [categoryId, limit]);
    if (status === 'loading' && loading) return <p>Loading...</p>;
    console.log(categoryId, 'categoryId');

    return (
        <>
            <Select text={'Count'} options={options} limit={limit} setLimit={setLimit} />
            <div className={styles.HomeContainer}>
                {status === 'loading' && loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p style={{ color: 'red' }}>Error: {error}</p>
                ) : (
                    images.map(({ id, url }) => (
                        <div key={id} className={styles.imgContainer}>
                            <img src={url} alt='Cat' className={styles.img} />
                        </div>
                    ))
                )}
            </div>
        </>
    );
};
export default Home;
