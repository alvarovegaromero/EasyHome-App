import React from 'react';

interface GroupContextProps {
  groupId: string;
  setGroupId: (id: string) => void;
  isOwner: boolean;
  setIsOwner: (isOwner: boolean) => void;
}

export const GroupContext = React.createContext<GroupContextProps>({
  groupId: '',
  setGroupId: () => {},
  isOwner: false,
  setIsOwner: () => {},
});
