import React, { useState } from 'react';
import { TextField, Box } from '@mui/material';

interface JsonEditorFieldProps {
  label: string;
  value: object;
  onChange: (val: object) => void;
}

const JsonEditorField: React.FC<JsonEditorFieldProps> = ({ label, value, onChange }) => {
  const [text, setText] = useState(JSON.stringify(value, null, 2));
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setText(val);
    try {
      onChange(JSON.parse(val));
      setError(null);
    } catch (err) {
      setError('JSON inválido');
    }
  };

  return (
    <Box>
      <TextField
        label={label}
        value={text}
        onChange={handleChange}
        fullWidth
        multiline
        minRows={3}
        size="small"
        error={!!error}
        helperText={error || 'Formato JSON'}
      />
    </Box>
  );
};

export default JsonEditorField;
