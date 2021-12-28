import React, { useState, useCallback } from 'react';
import Input from '@mui/material/Input';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import { useRef } from 'react';

export const Search: React.FC<Props> = ({ onSearch }) => {
  const [text, setText] = useState('');
  const timeRef = useRef<number>();

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timeRef.current);

    setText(e.target.value);

    timeRef.current = window.setTimeout(() => {
      onSearch(e.target.value);
    }, 250);
  }, [onSearch]);

  return (
    <Input 
      size="small"
      name="quotemar-search"
      value={text}
      onChange={handleChange}
      placeholder={chrome.i18n.getMessage('search')}
      sx={{
        width: '200px'
      }}
      endAdornment={
        <InputAdornment position="end">
          <SearchIcon />
        </InputAdornment>
      }
    />
  );
}

type Props = {
  onSearch: (value: string) => void
}