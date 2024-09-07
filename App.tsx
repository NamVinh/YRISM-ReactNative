import { NavigationContainer } from '@react-navigation/native';
import { Suspense } from 'react';
import { Keyboard, LogBox, StatusBar, TouchableWithoutFeedback } from 'react-native';
import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';

import Navigator from '~/navigation/NavigationStack';

enableScreens(false);
LogBox.ignoreAllLogs();

const App = () => {
	return (
		<SafeAreaProvider>
			<TouchableWithoutFeedback
				onPress={() => {
					Keyboard.dismiss();
				}}
			>
				<Suspense fallback={null}>
					<StatusBar barStyle="dark-content" />
					<NavigationContainer>
						<Navigator />
					</NavigationContainer>
				</Suspense>
			</TouchableWithoutFeedback>
		</SafeAreaProvider>
	);
};

export default App;
