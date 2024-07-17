import React from 'react';
import { Table, Paper } from '@mui/material';
import { useReactTable, getCoreRowModel } from '@tanstack/react-table';
import { StyledTableContainer } from '@/components/ProductsTable/ProductsTable.styles';
import { ProductTableProps } from '@/components/ProductsTable/ProductsTable.types';
import ProductTableHeader from './components/ProductTableHeader';
import ProductTableBody from './components/ProductTableBody';
import { productTableColumns } from './components/ProductTableColumns';

const ProductTable: React.FC<ProductTableProps> = ({ products, onViewReviews }) => {
    const columns = productTableColumns(onViewReviews);
    const table = useReactTable({
        data: products,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <Paper>
            <StyledTableContainer>
                <Table>
                    <ProductTableHeader headerGroups={table.getHeaderGroups()} />
                    <ProductTableBody rows={table.getRowModel().rows} />
                </Table>
            </StyledTableContainer>
        </Paper>
    );
};

export default ProductTable;
