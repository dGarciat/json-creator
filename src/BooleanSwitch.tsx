import React from 'react';
import { FormControlLabel, Switch } from '@mui/material';

interface BooleanSwitchProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const BooleanSwitch: React.FC<BooleanSwitchProps> = ({ label, checked, onChange }) => {
  return (
    <FormControlLabel
      control={<Switch checked={checked} onChange={e => onChange(e.target.checked)} />}
      label={label}
    />
  );
};

export default BooleanSwitch;
