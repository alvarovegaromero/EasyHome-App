import {useState} from 'react';

interface UseGroupHook {
  groupId: string;
  setGroupId: (id: string) => void;
  isOwner: boolean;
  setIsOwner: (isOwner: boolean) => void;
}

const useGroup = (): UseGroupHook => {
  const [groupId, setGroupId] = useState('');
  const [isOwner, setIsOwner] = useState(false);

  return {groupId, setGroupId, isOwner, setIsOwner};
};

export default useGroup;
