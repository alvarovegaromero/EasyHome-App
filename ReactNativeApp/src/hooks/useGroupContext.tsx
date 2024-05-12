import { useState } from 'react';

interface UseGroupHook {
    groupId: string;
    setGroupId: (id: string) => void;
    groupName: string;
    setGroupName: (name: string) => void;
}

const useGroup = (): UseGroupHook => {
    const [groupId, setGroupId] = useState('');
    const [groupName, setGroupName] = useState('');

    return { groupId, setGroupId, groupName, setGroupName };
};

export default useGroup;