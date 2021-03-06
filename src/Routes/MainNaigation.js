import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PrivateNavigator from './PrivateNavigation';
import PublicNavigator from './Public.Navigation';
import Splash from '../Screens/Splash/Splash';
import { useSelector, useDispatch } from 'react-redux';
import { userLogout } from '../Redux/actions/userDataAction';
import jwt_decode from 'jwt-decode';
import SplashScreen from 'react-native-splash-screen';
import NetInfo from '@react-native-community/netinfo'
import { Toast } from 'native-base'
function MainRoutes(props) {
  const { isLogin, token } = useSelector((state) => state.userData);
  const dispatch = useDispatch();
  if (isLogin && token) {
    const payload = jwt_decode(token);
    if (new Date(payload.exp * 1000).getTime() - new Date().getTime() <= 0) {
      dispatch(userLogout());
    }
    return <PrivateNavigator />;
  } else {
    return <PublicNavigator />;
  }
}

function MainNavigation(props) {
  const Stack = createStackNavigator();
  React.useEffect(() => {
    SplashScreen.hide();
    NetInfo.fetch().then(state => {
      if (!state.isConnected) {
        Toast.show({
          text: 'No Internet Connection',
          buttonText: 'Ok',
          duration: 15000,
          position: 'bottom',
          type: "warning"
        })
      }
    });
  });
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {/* <Stack.Screen name="Splash" component={Splash} /> */}
        <Stack.Screen name="MainRoutes" component={MainRoutes} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default MainNavigation;
