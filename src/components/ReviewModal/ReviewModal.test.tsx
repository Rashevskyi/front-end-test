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
        comment: 'Great product!',
        reviewerName: 'John Doe',
        date: '2024-05-23T08:56:21.619Z',
    },
];

describe('ReviewModal', () => {
    it('fetches and displays reviews', async () => {
        (axios.get as jest.Mock).mockResolvedValue({ data: { reviews: mockReviews } });

        render(<ReviewModal product={mockProduct} onClose={jest.fn()} />);

        await waitFor(() => {
            expect(screen.getByText('John Doe')).toBeInTheDocument();
            expect(screen.getByText('Great product!')).toBeInTheDocument();
            expect(screen.getByText(/5/)).toBeInTheDocument();
            expect(screen.getByText('May 23, 2024')).toBeInTheDocument();
        });
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
