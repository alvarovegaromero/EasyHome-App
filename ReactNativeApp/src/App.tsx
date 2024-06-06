import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import Navigation from './components/Navigation';
import useUserContext from './hooks/useUserContext';
import {UserContext} from './contexts/UserContext';
import {GroupContext} from './contexts/GroupContext';
import useGroupContext from './hooks/useGroupContext';
import {ExpenseContext} from './contexts/ExpenseContext';
import useExpenseContext from './hooks/useExpenseContext';

function App(): React.JSX.Element {
  const {id, setId, contextUsername, setContextUsername} = useUserContext();
  const {groupId, setGroupId, isOwner, setIsOwner} = useGroupContext();
  const {expenseId, setExpenseId} = useExpenseContext();

  // TODO: Implement the UserContext, GroupContext, and ExpenseContext with Redux
  return (
    <UserContext.Provider
      value={{id, setId, contextUsername, setContextUsername}}>
      <GroupContext.Provider value={{groupId, setGroupId, isOwner, setIsOwner}}>
        <ExpenseContext.Provider value={{expenseId, setExpenseId}}>
          <NavigationContainer>
            <Navigation />
          </NavigationContainer>
        </ExpenseContext.Provider>
      </GroupContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
