import React from 'react';
import { TableBody, TableCell } from '@mui/material';
import { flexRender, Row } from '@tanstack/react-table';
import { StyledTableRow } from '@/components/ProductsTable/ProductsTable.styles';
import { Product } from '@/components/ProductsTable/ProductsTable.types';

interface ProductTableBodyProps {
    rows: Row<Product>[];
}

const ProductTableBody: React.FC<ProductTableBodyProps> = ({ rows }) => (
    <TableBody>
        {rows.map(row => (
            <StyledTableRow key={row.id}>
                {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id} style={{ border: '1px solid #e0e0e0' }}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                ))}
            </StyledTableRow>
        ))}
    </TableBody>
);

export default ProductTableBody;
