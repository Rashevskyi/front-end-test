import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';

export const StyledBox = styled(Box)`
  padding: 20px;
  background-color: white;
  margin: auto;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  width: 500px;
  max-height: 80vh;
  overflow-y: auto;
  border-radius: 8px;
  box-shadow: 0px 3px 6px #00000029;
`;

export const ReviewBox = styled(Box)`
  margin-bottom: 16px;
  padding: 12px;
  background-color: #f5f5f5;
  border-radius: 8px;
  position: relative;
`;

export const ReviewDate = styled(Typography)`
  position: absolute;
  right: 12px;
  top: 12px;
`;

export const getRatingColor = (rating: number): string => {
    switch (rating) {
        case 1:
            return 'red';
        case 2:
            return 'orange';
        case 3:
            return '#ffac00';
        case 4:
            return '#88ac67';
        case 5:
            return 'green';
        default:
            return 'black';
    }
};
