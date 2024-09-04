import React from 'react';
import Navigator from '../navigation/navigator';
import {Provider} from 'react-redux';
import store from '../redux/store';
import {ReduxNetworkProvider} from 'react-native-offline';
import SystemNavigationBar from 'react-native-system-navigation-bar';
// import { LogBox } from 'react-native';
// LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
// LogBox.ignoreAllLogs();//Ignore all log notifications

SystemNavigationBar.stickyImmersive();
const App = () => {
  console.disableYellowBox = true;
  return (
    
    <Provider store={store}>
      <ReduxNetworkProvider>
        <Navigator />
      </ReduxNetworkProvider>
    </Provider>
  );
};

export default App;
