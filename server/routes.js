const express = require('express');
const router = express.Router();
const airgram = require('./airgram');

router.get('/get-auth-status', async (req, res) => {
	try {
		const state = await airgram.api.getAuthorizationState();

		res.json(state);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Something went wrong' });
	}
});

router.post('/set-auth-number', async (req, res) => {
	try {
		const code = await airgram.api.setAuthenticationPhoneNumber({
			phoneNumber: req.body.phoneNumber,
		});

		res.json(code);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Something went wrong' });
	}
});

router.post('/check-auth-code', async (req, res) => {
	try {
		const code = await airgram.api.checkAuthenticationCode({
			code: req.body.code,
		});

		res.json(code);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Something went wrong' });
	}
});

router.get('/chats', async (req, res) => {
	try {
		const chats = await airgram.api.getChats({
			limit: 50,
			offsetOrder: '9223372036854775807',
		});

		res.json(chats.response.chatIds);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Something went wrong' });
	}
});

router.get('/logout', async (req, res) => {
	try {
		await airgram.api.logOut();

		res.json({ message: 'Successfully logged out' });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Something went wrong' });
	}
});

module.exports = router;
