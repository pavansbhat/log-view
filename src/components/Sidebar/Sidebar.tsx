import React from 'react';

import { Checkbox } from '@/components/Checkbox/Checkbox';

import { SidebarContainer, SidebarHeader } from './sidebar.styled';
interface SidebarProps {
  sidebarTitle?: string;
  sidebarItems?: string[];
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  selectedSeverities: string[];
}

export const Sidebar = ({
  sidebarTitle,
  sidebarItems,
  onChange,
  selectedSeverities,
}: SidebarProps) => {
  return (
    <SidebarContainer>
      <SidebarHeader>{sidebarTitle}</SidebarHeader>
      {sidebarItems?.map((item) => (
        <Checkbox
          isChecked={selectedSeverities.includes(item)}
          checkboxId={`severity-${item}`}
          onChange={onChange}
          label={item}
          value={item}
          key={`severity-${item}`}
        />
      ))}
    </SidebarContainer>
  );
};
