export type EditProfileStackParamList = {
  EditProfileScreen: {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
  };
};

export type MyStackParamsList = {
  LoginScreen: undefined;
  RegisterScreen: undefined;
  ResetPasswordScreen: undefined;
  HomeScreen: undefined;
  ProfileScreen: undefined;
  EditProfileScreen: EditProfileStackParamList['EditProfileScreen'];
  CreateGroupScreen: undefined;
  GroupHomeScreen: undefined;
  GroupSettingsScreen: undefined;
  GroupBoardScreen: undefined;
  ExpensesHomeScreen: undefined;
  AddExpenseScreen: undefined;
  ExpenseDetailScreen: undefined;
  ChoresHomeScreen: undefined;
  EstablishChoresScreen: undefined;
};
