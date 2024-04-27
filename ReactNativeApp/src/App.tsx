import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import Navigation from './components/Navigation';
import useUserContext from './hooks/useUserContext';
import { UserContext } from './contexts/UserContext';
import { GroupContext } from './contexts/GroupContext';
import useGroupContext from './hooks/useGroupContext';

function App(): React.JSX.Element {
  const { id, setId } = useUserContext();
  const { groupId, setGroupId } = useGroupContext();

  return (
    <UserContext.Provider value={{ id, setId }}>
      <GroupContext.Provider value={{ groupId, setGroupId }}>
        <NavigationContainer>
          <Navigation />
        </NavigationContainer>
      </GroupContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
