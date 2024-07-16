import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import axios from 'axios';
import ProductsPage, { getServerSideProps, Product } from '@/pages';
import { GetServerSidePropsContext } from 'next';
import ProductsTable from '@/components/ProductsTable/ProductsTable';

jest.mock('axios');
jest.mock('../ProtectedRoute/ProtectedRoute', () => ({
    __esModule: true,
    default: jest.fn(({ children }) => <div>{children}</div>),
}));

const mockProducts: Product[] = [
    {
        id: 1,
        title: 'Product 1',
        description: 'Description 1',
        category: 'Category 1',
        price: 100,
        discountPercentage: 10,
        rating: 4.5,
        stock: 20,
        tags: ['Tag1', 'Tag2'],
        brand: 'Brand 1',
    },
];

describe('ProductsPage', () => {
    const mockContext = {
        req: {} as any,
        res: {} as any,
        query: {},
        resolvedUrl: '',
        params: {},
        preview: false,
        previewData: undefined
    };

    it('renders products table', async () => {
        (axios.get as jest.Mock).mockResolvedValue({ data: { products: mockProducts } });

        const result = await getServerSideProps(mockContext as GetServerSidePropsContext);
        const { props } = result as { props: { products: Product[] } };

        render(<ProductsPage {...props} />);

        expect(screen.getByText('Product 1')).toBeInTheDocument();
    });

    it('calls onViewReviews when view reviews button is clicked', () => {
        const mockOnViewReviews = jest.fn();
        render(<ProductsTable products={mockProducts} onViewReviews={mockOnViewReviews} />);

        const viewButton = screen.getByTestId('VisibilityIcon');
        fireEvent.click(viewButton);

        expect(mockOnViewReviews).toHaveBeenCalledWith(mockProducts[0]);
    });
});
