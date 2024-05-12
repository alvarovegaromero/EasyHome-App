import React from 'react';

interface GroupContextProps {
    groupId: string;
    setGroupId: (id: string) => void;
}

export const GroupContext = React.createContext<GroupContextProps>({
    groupId: '',
    setGroupId: () => {},
});