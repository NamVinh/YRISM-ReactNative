import React from 'react';
import { Button, Text, View } from 'react-native';

import routes from '~/navigation/routes';

const HomeScreen = ({ navigation }) => {
	return (
		<View
			style={{
				flex: 1,
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<Text>Home Screen</Text>
			<Button
				title="Go to List"
				onPress={() => {
					return navigation.navigate(routes.Employees);
				}}
			/>
			<Button
				title="Go to list (Webview)"
				onPress={() => {
					return navigation.navigate(routes.Webview);
				}}
			/>
		</View>
	);
};

export default HomeScreen;
