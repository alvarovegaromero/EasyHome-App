import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import Navigation from './components/Navigation';
import useUserIdContext from './useUserIdContext';
import { UserContext } from './utils/UserContext';

function App(): React.JSX.Element {
  const { id, setId } = useUserIdContext();

  return (
    <UserContext.Provider value={{ id, setId }}>
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    </UserContext.Provider>
  );
}

export default App;
