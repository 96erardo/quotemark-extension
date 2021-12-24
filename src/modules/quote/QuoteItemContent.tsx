import React from 'react';
import Typography from '@mui/material/Typography';

export const QuoteItemContent: React.FC<Props> = ({ text, checked, collapsed, onClick }) => {
  return (
    <Typography
      onClick={onClick}
      variant="body1" 
      sx={{
        cursor: 'pointer',
        paddingBottom: !collapsed ? 2 : 0,
        paddingRight: !collapsed ? 2 : 0,
        whiteSpace: collapsed ? 'nowrap' : 'normal',
        fontWeight: (checked && collapsed) ? 500 : 400,
      }}
    >
      {text}
    </Typography>
  )
}

type Props = {
  text: string,
  checked: boolean,
  collapsed: boolean,
  onClick: () => void,
}