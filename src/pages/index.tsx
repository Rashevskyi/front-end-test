import React, { useState } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import styled from '@emotion/styled';
import axios from 'axios';
import ReviewModal from '../components/ReviewModal';
import ProductsTable from '../components/ProductsTable';
import ProtectedRoute from '../components/ProtectedRoute';

interface Product {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    tags: string[];
    brand: string;
    reviews?: Review[];
}

interface Review {
    id: number;
    productId: number;
    rating: number;
    text: string;
}

interface ProductsPageProps {
    products: Product[];
}

const StyledPageContainer = styled.div`
  padding: 20px;
  background-color: #f0f0f0;
  min-height: 100vh;
`;

export const getServerSideProps: GetServerSideProps = async () => {
    const { data } = await axios.get('https://dummyjson.com/products');
    return {
        props: {
            products: data.products,
        },
    };
};

const ProductsPage: NextPage<ProductsPageProps> = ({ products }) => {
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const handleViewReviews = (product: Product) => {
        setSelectedProduct(product);
    };

    return (
        <ProtectedRoute>
            <StyledPageContainer>
                <ProductsTable products={products} onViewReviews={handleViewReviews} />
                {selectedProduct && (
                    <ReviewModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
                )}
            </StyledPageContainer>
        </ProtectedRoute>
    );
};

export default ProductsPage;
