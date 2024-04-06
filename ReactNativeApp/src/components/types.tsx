
export type HomeStackParamList  = {
    HomeScreen: { username: string };
};

export type MyStackParamsList = { 
    LoginScreen: undefined;
    RegisterScreen: undefined; 
    ResetPasswordScreen: undefined; 
    HomeScreen: HomeStackParamList['HomeScreen']; 
    ProfileScreen: undefined;
    EditProfileScreen : undefined;
}