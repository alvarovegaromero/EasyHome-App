import { useState } from 'react';

interface UseUserHook {
    id: string;
    setId: (id: string) => void;
}

const useUser = (): UseUserHook => {
    const [id, setId] = useState('');

    return { id, setId };
};

export default useUser;