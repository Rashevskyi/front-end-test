import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import ReviewModal from './ReviewModal';
import axios from 'axios';

jest.mock('axios');

const mockProduct = {
    id: 1,
    title: 'Product 1',
};

const mockReviews = [
    {
        id: 1,
        productId: 1,
        rating: 5,
        text: 'Great product!',
    },
];

describe('ReviewModal', () => {
    it('fetches and displays reviews', async () => {
        (axios.get as jest.Mock).mockResolvedValue({ data: { reviews: mockReviews } });

        render(<ReviewModal product={mockProduct} onClose={jest.fn()} />);

        await waitFor(() => expect(screen.getByText('Great product!')).toBeInTheDocument());
    });

    it('displays no reviews message', async () => {
        (axios.get as jest.Mock).mockResolvedValue({ data: { reviews: [] } });

        render(<ReviewModal product={mockProduct} onClose={jest.fn()} />);

        await waitFor(() => expect(screen.getByText('No reviews available for this product.')).toBeInTheDocument());
    });

    it('closes the modal on backdrop click', async () => {
        const onClose = jest.fn();
        (axios.get as jest.Mock).mockResolvedValue({ data: { reviews: [] } });

        await act(async () => {
            render(<ReviewModal product={mockProduct} onClose={onClose} />);
        });

        const backdrop = document.querySelector('.MuiBackdrop-root');

        if (backdrop) {
            fireEvent.click(backdrop);
        }

        expect(onClose).toHaveBeenCalled();
    });
});
