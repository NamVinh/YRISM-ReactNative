import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import EmployeesScreen from '~/screens/Employees';
import HomeScreen from '~/screens/Home';
import WebviewScreen from '~/screens/Webview';

import routes from './routes';

const Stack = createNativeStackNavigator();

const Navigator = () => {
	return (
		<Stack.Navigator initialRouteName={routes.Home}>
			<Stack.Screen name={routes.Home} component={HomeScreen} />
			<Stack.Screen name={routes.Employees} component={EmployeesScreen} />
			<Stack.Screen name={routes.Webview} component={WebviewScreen} />
		</Stack.Navigator>
	);
};

export default Navigator;
