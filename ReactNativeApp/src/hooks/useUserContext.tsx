import {useState} from 'react';

interface UseUserHook {
  id: string;
  setId: (id: string) => void;
  contextUsername: string;
  setContextUsername: (username: string) => void;
}

const useUser = (): UseUserHook => {
  const [id, setId] = useState('');
  const [contextUsername, setContextUsername] = useState('');

  return {id, setId, contextUsername, setContextUsername};
};

export default useUser;
