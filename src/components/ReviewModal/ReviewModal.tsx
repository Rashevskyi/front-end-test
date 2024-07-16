import React, { useEffect, useState } from 'react';
import { Modal, Box, Typography, CircularProgress, Divider } from '@mui/material';
import axios from 'axios';
import styled from '@emotion/styled';

interface Review {
    id: number;
    productId: number;
    rating: number;
    text: string;
}

interface Product {
    id: number;
    title: string;
}

interface ReviewModalProps {
    product: Product;
    onClose: () => void;
}

const StyledBox = styled(Box)`
  padding: 20px;
  background-color: white;
  margin: auto;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  width: 500px;
  max-height: 80vh;
  overflow-y: auto;
  border-radius: 8px;
  box-shadow: 0px 3px 6px #00000029;
`;

const ReviewBox = styled(Box)`
  margin-bottom: 16px;
  padding: 12px;
  background-color: #f5f5f5;
  border-radius: 8px;
`;

const ReviewModal: React.FC<ReviewModalProps> = ({ product, onClose }) => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchReviews = async () => {
            setLoading(true);
            try {
                const { data } = await axios.get(`https://dummyjson.com/products/${product.id}`);
                setReviews(data.reviews);
            } catch (error) {
                console.error("Failed to fetch reviews", error);
            }
            setLoading(false);
        };
        fetchReviews();
    }, [product]);

    return (
        <Modal open={Boolean(product)} onClose={onClose}>
            <StyledBox>
                <Typography variant="h6" gutterBottom>
                    {product.title} Reviews
                </Typography>
                <Divider sx={{ marginBottom: 2 }} />
                {loading ? (
                    <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                        <CircularProgress />
                    </Box>
                ) : (
                    reviews.length > 0 ? (
                        reviews.map((review: any) => (
                            <ReviewBox key={review.id}>
                                <Typography variant="body1" gutterBottom>
                                    {review.text}
                                </Typography>
                                <Typography variant="caption" color="textSecondary">
                                    Rating: {review.rating}
                                </Typography>
                            </ReviewBox>
                        ))
                    ) : (
                        <Typography variant="body1">
                            No reviews available for this product.
                        </Typography>
                    )
                )}
            </StyledBox>
        </Modal>
    );
};

export default ReviewModal;
