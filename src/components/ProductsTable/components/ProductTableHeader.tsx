import React from 'react';
import { TableHead, TableRow } from '@mui/material';
import { flexRender, HeaderGroup } from '@tanstack/react-table';
import { StyledTableCell } from '@/components/ProductsTable/ProductsTable.styles';
import { Product } from '@/components/ProductsTable/ProductsTable.types';

interface ProductTableHeaderProps {
    headerGroups: HeaderGroup<Product>[];
}

const ProductTableHeader: React.FC<ProductTableHeaderProps> = ({ headerGroups }) => (
    <TableHead>
        {headerGroups.map(headerGroup => (
            <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                    <StyledTableCell key={header.id}>
                        {flexRender(header.column.columnDef.header, header.getContext())}
                    </StyledTableCell>
                ))}
            </TableRow>
        ))}
    </TableHead>
);

export default ProductTableHeader;
