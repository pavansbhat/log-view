import React from 'react';

import {
  CheckboxContainer,
  CheckboxLabel,
  StyledCheckbox,
} from '@/components/Checkbox/checkbox.styled';

export const Checkbox = ({
  isChecked,
  onChange,
  checkboxId,
  label,
  value,
}: {
  isChecked: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  checkboxId: string;
  label?: string;
  value?: string;
}) => {
  return (
    <CheckboxContainer>
      <StyledCheckbox
        type="checkbox"
        value={value}
        id={checkboxId}
        checked={isChecked}
        onChange={onChange}
      />
      <CheckboxLabel htmlFor={checkboxId}>{label}</CheckboxLabel>
    </CheckboxContainer>
  );
};
