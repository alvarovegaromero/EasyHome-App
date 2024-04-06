
export type HomeStackParamList  = {
    HomeScreen: { username: string };
};

export type EditProfileStackParamList  = {
    EditProfileScreen: { username: string, email: string, firstName: string, lastName: string};
};

export type MyStackParamsList = { 
    LoginScreen: undefined;
    RegisterScreen: undefined; 
    ResetPasswordScreen: undefined; 
    HomeScreen: HomeStackParamList['HomeScreen']; 
    ProfileScreen: undefined;
    EditProfileScreen : EditProfileStackParamList['EditProfileScreen'];
}