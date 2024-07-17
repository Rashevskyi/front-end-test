import { useState, useEffect } from 'react';
import axios from 'axios';
import { Review } from '@/components/ReviewModal/ReviewModal.types';

const useReviews = (productId: number) => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchReviews = async () => {
            setLoading(true);
            try {
                const { data } = await axios.get(`https://dummyjson.com/products/${productId}`);
                setReviews(data.reviews);
            } catch (error) {
                setError("Failed to fetch reviews");
                console.error("Failed to fetch reviews", error);
            }
            setLoading(false);
        };
        fetchReviews();
    }, [productId]);

    return { reviews, loading, error };
};

export default useReviews;
