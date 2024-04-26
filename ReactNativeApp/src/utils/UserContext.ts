import React from 'react';

interface UserContextProps {
    id: string;
    setId: (id: string) => void;
}

export const UserContext = React.createContext<UserContextProps>({
    id: '',
    setId: () => {},
});