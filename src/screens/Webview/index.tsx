import React, { useState } from 'react';
import { ActivityIndicator, SafeAreaView, StyleSheet, View } from 'react-native';
import WebView from 'react-native-webview';

const WebviewScreen = () => {
	const [loading, setLoading] = useState(true);

	return (
		<SafeAreaView style={styles.container}>
			{loading && (
				<View style={styles.loading}>
					<ActivityIndicator size="large" color="#0000ff" />
				</View>
			)}
			<WebView
				source={{
					uri: 'https://yrism-react-js.vercel.app/',
				}}
				onLoadStart={() => {
					setLoading(true);
				}}
				onLoadEnd={() => {
					setLoading(false);
				}}
				style={styles.webview}
			/>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	loading: {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: [
			{
				translateX: -50,
			},
			{
				translateY: -50,
			},
		],
	},
	webview: {
		flex: 1,
	},
});

export default WebviewScreen;
