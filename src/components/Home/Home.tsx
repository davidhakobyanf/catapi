import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, RootState } from '../../redux/store';
import { fetchCatImages } from '../../redux/features/catSingleSlice';

import styles from './Home.module.css';
import { useParams } from 'react-router-dom';
interface CatImage {
    id: string;
    url: string;
}
const Home = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { name } = useParams();
    const { images, status, error } = useSelector((state: RootState) => state.catsImage);
    const { categories, loading } = useSelector((state: RootState) => state.cats);

    console.log(images, 'images');
    console.log(categories, 'categories');
    const categoryId: number = categories.find((item) => item.name === name)?.id ?? 5;

    useEffect(() => {
        dispatch(fetchCatImages({ categoryId: categoryId, limit: 10 }));
    }, [dispatch, categoryId]);
    console.log(categoryId);

    return (
        <div className={styles.HomeContainer}>
            {' '}
            {status === 'loading' && loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p style={{ color: 'red' }}>Error: {error}</p>
            ) : (
                images.map(({ id, url }: CatImage) => (
                    <div key={id}>
                        <img src={url} alt='Cat' />
                    </div>
                ))
            )}
        </div>
    );
};
export default Home;
