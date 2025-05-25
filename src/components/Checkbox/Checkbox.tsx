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
}: {
  isChecked: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  checkboxId: string;
}) => {
  return (
    <CheckboxContainer>
      <StyledCheckbox type="checkbox" id={checkboxId} checked={isChecked} onChange={onChange} />
      <CheckboxLabel htmlFor={checkboxId}>Date</CheckboxLabel>
    </CheckboxContainer>
  );
};
