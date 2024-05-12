import React from 'react';

interface GroupContextProps {
    groupId: string;
    setGroupId: (id: string) => void;
    groupName: string;
    setGroupName: (name: string) => void;
}

export const GroupContext = React.createContext<GroupContextProps>({
    groupId: '',
    setGroupId: () => {},
    groupName: '',
    setGroupName: () => {},
});