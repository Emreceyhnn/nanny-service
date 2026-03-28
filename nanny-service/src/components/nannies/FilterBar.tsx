import React from 'react';
import { 
  Box, 
  FormControl, 
  Select, 
  MenuItem, 
  Typography,
  type SelectChangeEvent
} from '@mui/material';

interface Props {
  sort: string;
  onSortChange: (sort: 'asc' | 'desc' | 'price-low' | 'price-high' | 'rating-high' | 'rating-low' | 'all') => void;
}

const FilterBar: React.FC<Props> = ({ sort, onSortChange }) => {
  const handleChange = (event: SelectChangeEvent) => {
    onSortChange(event.target.value as any);
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Typography 
        variant="caption" 
        sx={{ 
          color: 'rgba(0,0,0,0.5)', 
          fontWeight: 500, 
          display: 'block',
          mb: 1
        }}
      >
        Filters
      </Typography>
      <FormControl sx={{ minWidth: 226 }}>
        <Select
          value={sort}
          onChange={handleChange}
          sx={{
            borderRadius: '14px',
            bgcolor: 'white',
            '& .MuiSelect-select': {
              py: '14px',
              px: '18px',
              fontWeight: 500
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(0,0,0,0.1)',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'primary.main',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderWidth: '1px',
              borderColor: 'primary.main',
            }
          }}
        >
          <MenuItem value="asc">A to Z</MenuItem>
          <MenuItem value="desc">Z to A</MenuItem>
          <MenuItem value="price-low">Less than 10$</MenuItem>
          <MenuItem value="price-high">Greater than 10$</MenuItem>
          <MenuItem value="rating-high">Popular</MenuItem>
          <MenuItem value="rating-low">Not popular</MenuItem>
          <MenuItem value="all">Show all</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default FilterBar;
