import { useState } from 'react';

interface UseGroupHook {
    groupId: string;
    setGroupId: (id: string) => void;
}

const useGroup = (): UseGroupHook => {
    const [groupId, setGroupId] = useState('');

    return { groupId, setGroupId };
};

export default useGroup;