import React, { useCallback } from 'react';
import { colors } from '@modules/story/story-constants';
import Box from '@mui/material/Box';

export const ColorPicker: React.FC<Props> = ({ value, onChange }) => {
  const handleChange = useCallback(() => {
    const index = colors.indexOf(value);

    if ((colors.length - 1) === index) {
      onChange(colors[0]);
    
    } else {
      onChange(colors[index + 1])
    }
  }, [value, onChange]);

  return (
    <Box 
      width={34}
      height={34}
      boxShadow={2}
      borderRadius={17}
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{ 
        backgroundColor: '#fff',
        cursor: 'pointer',
      }}
    >
      <Box 
        width={24} 
        height={24}
        borderRadius={12}
        onClick={handleChange}
        sx={{ backgroundColor: value }}
      />
    </Box>
  );
}

type Props = {
  value: string,
  onChange: (value: string) => void
}