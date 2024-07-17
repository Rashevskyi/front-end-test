import React, { useState } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import ReviewModal from '@/components/ReviewModal/ReviewModal';
import ProductsTable from '@/components/ProductsTable/ProductsTable';
import ProtectedRoute from '@/routes/ProtectedRoute';
import { Product, ProductsPageProps } from '@/components/index/index.types';
import { StyledPageContainer } from '@/components/index/index.styles';
import { fetchProducts } from '@/utils/api';

export const getServerSideProps: GetServerSideProps = async () => {
    try {
        const products = await fetchProducts();
        return {
            props: {
                products,
            },
        };
    } catch (error) {
        console.error('Failed to fetch products', error);
        return {
            props: {
                products: [],
            },
        };
    }
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
