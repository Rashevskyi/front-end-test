import { ColumnDef } from '@tanstack/react-table';
import { Product } from '@/components/ProductsTable/ProductsTable.types';
import { ActionButtonGroup } from '@/components/ProductsTable/ProductsTable.styles';
import VisibilityIcon from '@mui/icons-material/Visibility';
import IconButton from '@mui/material/IconButton';

export const productTableColumns = (onViewReviews: (product: Product) => void): ColumnDef<Product>[] => [
    { header: 'ID', accessorKey: 'id' },
    { header: 'Title', accessorKey: 'title' },
    { header: 'Description', accessorKey: 'description', size: 200 },
    { header: 'Category', accessorKey: 'category' },
    { header: 'Price', accessorKey: 'price' },
    { header: 'Discount %', accessorKey: 'discountPercentage' },
    { header: 'Rating', accessorKey: 'rating' },
    { header: 'Stock', accessorKey: 'stock' },
    { header: 'Tags', accessorKey: 'tags' },
    { header: 'Brand', accessorKey: 'brand' },
    {
        header: 'Actions',
        accessorKey: 'actions',
        cell: ({ row }) => (
            <ActionButtonGroup>
                <IconButton
                    color="primary"
                    aria-label="view reviews"
                    onClick={() => onViewReviews(row.original)}
                >
                    <VisibilityIcon />
                </IconButton>
            </ActionButtonGroup>
        ),
    },
];
