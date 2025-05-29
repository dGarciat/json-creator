import React, { useState } from 'react';
import { Box, Chip, TextField, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

interface ArrayChipInputProps {
  label: string;
  value: string[];
  onChange: (arr: string[]) => void;
}

const ArrayChipInput: React.FC<ArrayChipInputProps> = ({ label, value, onChange }) => {
  const [input, setInput] = useState('');

  const handleAdd = () => {
    if (input.trim() && !value.includes(input.trim())) {
      onChange([...value, input.trim()]);
      setInput('');
    }
  };

  const handleDelete = (chip: string) => {
    onChange(value.filter(v => v !== chip));
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
        <TextField
          label={label}
          value={input}
          onChange={e => setInput(e.target.value)}
          size="small"
          onKeyDown={e => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleAdd();
            }
          }}
        />
        <IconButton color="primary" onClick={handleAdd} size="small">
          <AddIcon />
        </IconButton>
      </Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {value.map((chip, idx) => (
          <Chip
            key={chip + idx}
            label={chip}
            onDelete={() => handleDelete(chip)}
            deleteIcon={<DeleteIcon />}
          />
        ))}
      </Box>
    </Box>
  );
};

export default ArrayChipInput;
