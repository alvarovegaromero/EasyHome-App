import React from 'react';

interface UserContextProps {
  id: string;
  setId: (id: string) => void;
  contextUsername: string;
  setContextUsername: (username: string) => void;
}

export const UserContext = React.createContext<UserContextProps>({
  id: '',
  setId: () => {},
  contextUsername: '',
  setContextUsername: () => {},
});
