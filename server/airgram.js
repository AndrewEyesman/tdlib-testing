const { Airgram, Auth, prompt, toObject } = require('airgram');

const airgram = new Airgram({
	apiId: process.env.API_ID,
	apiHash: process.env.API_HASH,
	command: './tdlib/bin/tdjson.dll',
	logVerbosityLevel: 1,
});

// airgram.use(
// 	new Auth({
// 		code: () => prompt(`Please enter the secret code:\n`),
// 		phoneNumber: () => prompt(`Please enter your phone number:\n`),
// 	})
// );

// Getting all updates
// airgram.use((ctx, next) => {
// 	if ('update' in ctx) {
// 		console.log(`[all updates][${ctx._}]`, JSON.stringify(ctx.update));
// 	}
// 	return next();
// });

// Getting new messages
// airgram.on('updateNewMessage', async ({ update }, next) => {
// 	const { message } = update;
// 	console.log('[new message]', message.content);
// 	return next();
// });

module.exports = airgram;
