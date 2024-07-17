export interface Review {
    id: number;
    productId: number;
    rating: number;
    comment: string;
    reviewerName: string;
    date: string;
}

export interface Product {
    id: number;
    title: string;
}

export interface ReviewModalProps {
    product: Product;
    onClose: () => void;
}
