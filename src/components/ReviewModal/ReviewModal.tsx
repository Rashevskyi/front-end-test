import React from 'react';
import { Modal, Box, Typography, CircularProgress, Divider } from '@mui/material';
import { StyledBox, ReviewBox, ReviewDate, getRatingColor } from './ReviewModal.styles';
import { ReviewModalProps } from './ReviewModal.types';
import useReviews from '../../hooks/useReviews';

const ReviewModal: React.FC<ReviewModalProps> = ({ product, onClose }) => {
    const { reviews, loading, error } = useReviews(product.id);

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
                ) : error ? (
                    <Typography variant="body1" color="error">
                        {error}
                    </Typography>
                ) : (
                    reviews.length > 0 ? (
                        reviews.map((review) => (
                            <ReviewBox key={review.id}>
                                <Typography variant="body2" color="textSecondary">
                                    <strong>Reviewer Name:</strong> {review.reviewerName}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    <strong>Comment:</strong> {review.comment}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    <strong>Rating:</strong> <strong style={{color: getRatingColor(review.rating)}}>{review.rating}</strong>
                                </Typography>
                                <ReviewDate variant="caption" color="textSecondary">
                                    {new Date(review.date).toLocaleDateString("en", { year: 'numeric', month: 'long', day: 'numeric' })}
                                </ReviewDate>
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
