import styled from '@emotion/styled';
import { TableContainer, TableCell, TableRow } from '@mui/material';

export const StyledTableContainer = styled(TableContainer)`
  margin-top: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 3px 6px #00000029;
`;

export const StyledTableCell = styled(TableCell)`
  font-weight: bold;
  background-color: #f5f5f5;
  padding: 10px;
  border: 1px solid #e0e0e0;
  white-space: nowrap;
`;

export const StyledTableRow = styled(TableRow)`
  &:nth-of-type(odd) {
    background-color: #f9f9f9;
  }
  &:nth-of-type(even) {
    background-color: #fff;
  }
`;

export const ActionButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`;
