import { useState } from 'react';

interface UseUserIdHook {
    id: string;
    setId: (id: string) => void;
}

const useUserId = (): UseUserIdHook => {
    const [id, setId] = useState('');

    return { id, setId };
};

export default useUserId;