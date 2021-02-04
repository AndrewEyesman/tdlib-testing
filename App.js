import React, { useEffect, useState } from 'react';
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	TextInput,
} from 'react-native';
import axios from 'axios';

const instance = axios.create({ baseURL: 'http://10.0.2.2:8080' });

export default function App() {
	const [authStatus, setAuthStatus] = useState(null);
	const [phone, setPhone] = useState('');
	const [authCode, setAuthCode] = useState('');
	const [chats, setChats] = useState([]);

	useEffect(() => {
		getAuthStatus();
	}, []);

	useEffect(() => {
		console.log(chats);
	}, [chats]);

	useEffect(() => {
		if (authStatus === 'authorizationStateReady') {
			getChats();
		}

		// let getUpdates;

		// getUpdates = setInterval(() => {
		//    console.log('hello');
		// }, 10000);

		return () => setChats([]);
	}, [authStatus]);

	const getAuthStatus = async () => {
		try {
			const res = await instance.get('/get-auth-status');
			setAuthStatus(res.data.response._);
		} catch (error) {
			console.log(error);
		}
	};

	const setAuthNumber = async () => {
		try {
			await instance.post('/set-auth-number', { phoneNumber: phone });
			await getAuthStatus();
			setPhone('');
		} catch (error) {
			setPhone('');
			console.log(error);
		}
	};

	const checkAuthCode = async () => {
		try {
			await instance.post('/check-auth-code', { code: authCode });
			await getAuthStatus();
		} catch (error) {
			console.log(error);
		}
	};

	const getChats = async () => {
		try {
			const res = await instance.get('/chats');

			setChats(res.data);
		} catch (error) {
			console.log(error);
		}
	};

	const logout = async () => {
		try {
			await instance.get('/logout');
			await getAuthStatus();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<View style={styles.container}>
			<TouchableOpacity style={styles.button} onPress={getAuthStatus}>
				<Text>get auth status</Text>
			</TouchableOpacity>
			<Text style={{ textAlign: 'center', marginBottom: 50 }}>
				{authStatus}
			</Text>
			{authStatus === 'authorizationStateWaitPhoneNumber' ? (
				<>
					<TextInput
						placeholder="Enter phone number"
						style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
						onChangeText={(text) => setPhone(text)}
					/>
					<TouchableOpacity style={styles.button} onPress={setAuthNumber}>
						<Text>set auth number</Text>
					</TouchableOpacity>
				</>
			) : authStatus === 'authorizationStateWaitCode' ? (
				<>
					<TextInput
						placeholder="Enter auth code"
						style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
						onChangeText={(text) => setAuthCode(text)}
					/>
					<TouchableOpacity style={styles.button} onPress={checkAuthCode}>
						<Text>check auth code</Text>
					</TouchableOpacity>
				</>
			) : (
				<TouchableOpacity style={styles.button} onPress={logout}>
					<Text>logout</Text>
				</TouchableOpacity>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		justifyContent: 'center',
		marginHorizontal: 40,
	},
	button: {
		alignItems: 'center',
		backgroundColor: '#DDDDDD',
		marginBottom: 20,
		padding: 10,
	},
});
