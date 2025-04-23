import * as React from 'react';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Badge, { badgeClasses } from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useSelector } from 'react-redux';

const CartBadge = styled(Badge)`
  & .${badgeClasses.badge} {
    top: -12px;
    right: -6px;
  }
`;

export default function CartButton() {
        const items= useSelector(state=>state.reducer.items)
    
  return (
    <IconButton className='relative'>
      <ShoppingCartIcon fontSize="large" className="absolute bg-none"/>
      <CartBadge  badgeContent={items.length} color="primary" overlap="circular"/>
    </IconButton>
  );
}
