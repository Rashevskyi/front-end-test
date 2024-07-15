import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, TableContainer, Paper, IconButton } from '@mui/material';
import { useReactTable, ColumnDef, flexRender, getCoreRowModel } from '@tanstack/react-table';
import styled from '@emotion/styled';
import VisibilityIcon from '@mui/icons-material/Visibility';

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
}

interface ProductTableProps {
    products: Product[];
    onViewReviews: (product: Product) => void;
}

// Styled components for the table
const StyledTableContainer = styled(TableContainer)`
  margin-top: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 3px 6px #00000029;
`;

const StyledTableCell = styled(TableCell)`
  font-weight: bold;
  background-color: #f5f5f5;
  padding: 10px;
  border: 1px solid #e0e0e0;
  white-space: nowrap;
`;

const StyledTableRow = styled(TableRow)`
  &:nth-of-type(odd) {
    background-color: #f9f9f9;
  }
  &:nth-of-type(even) {
    background-color: #fff;
  }
`;

const ActionButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`;

const ProductTable: React.FC<ProductTableProps> = ({ products, onViewReviews }) => {
    const columns: ColumnDef<Product>[] = [
        { header: 'ID', accessorKey: 'id' },
        { header: 'Title', accessorKey: 'title' },
        { header: 'Description', accessorKey: 'description', size: 200 },
        { header: 'Category', accessorKey: 'category' },
        { header: 'Price', accessorKey: 'price' },
        { header: 'Discount %', accessorKey: 'discountPercentage'},
        { header: 'Rating', accessorKey: 'rating' },
        { header: 'Stock', accessorKey: 'stock' },
        { header: 'Tags', accessorKey: 'tags' },
        { header: 'Brand', accessorKey: 'brand' },
        {
            header: 'Actions',
            accessorKey: 'actions',
            cell: ({ row }) => (
                <ActionButtonGroup>
                    <IconButton color="primary" onClick={() => onViewReviews(row.original)}>
                        <VisibilityIcon />
                    </IconButton>
                </ActionButtonGroup>
            ),
        },
    ];

    const table = useReactTable({
        data: products,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <Paper>
            <StyledTableContainer>
                <Table>
                    <TableHead>
                        {table.getHeaderGroups().map(headerGroup => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <StyledTableCell key={header.id}>
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                    </StyledTableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableHead>
                    <TableBody>
                        {table.getRowModel().rows.map(row => (
                            <StyledTableRow key={row.id}>
                                {row.getVisibleCells().map(cell => (
                                    <TableCell key={cell.id} style={{ border: '1px solid #e0e0e0' }}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </StyledTableContainer>
        </Paper>
    );
};

export default ProductTable;
