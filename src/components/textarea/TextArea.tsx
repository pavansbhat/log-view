import React from 'react';

import { TextareaContainer, StyledTextarea } from './textarea.styled';

interface TextAreaProps {
  placeholder?: string;
  rows?: number;
  cols?: number;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
}

export const TextArea = ({ placeholder, rows = 1, cols = 50, onChange }: TextAreaProps) => {
  return (
    <TextareaContainer>
      <StyledTextarea placeholder={placeholder} rows={rows} cols={cols} onChange={onChange} />
    </TextareaContainer>
  );
};
