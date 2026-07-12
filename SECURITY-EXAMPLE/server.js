// Node modules
const fs = require('fs');
const https = require('https');
const path = require('path');
const { verify } = require('crypto');

// Third-party packages
const express = require('express');
const helmet = require('helmet');
const passport = require('passport');
const { Strategy } = require('passport-google-oauth20');
const cookieSession = require('cookie-session');

// Environment
require('dotenv').config();

const config = {
	CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
	CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
	COOKIE_KEY_1: process.env.COOKIE_KEY_1,
	COOKIE_KEY_2: process.env.COOKIE_KEY_2
}

const AUTH_OPTIONS = {
	clientID: config.CLIENT_ID,
	clientSecret: config.CLIENT_SECRET,
	callbackURL: "/auth/google/callback"
};

function verifyCallback(accessToken, refreshToken, profile, done) {
	console.log('Google profile', profile);
	done(null, profile);
}

passport.use(new Strategy(AUTH_OPTIONS, verifyCallback));

// Save the session to cookie
passport.serializeUser((user, done) => {
	done(null, user.id);
});

// Read the session from the cookie
passport.deserializeUser((id, done) => {
	// User.findById(id).then(user => {
	// 	done(null, id);
	// });
	done(null, id);
});

const PORT = 3000;

const app = express();

app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieSession({
	name: 'session',
	maxAge: 60 * 60 * 24 * 1000, // 1 day
	keys: [config.COOKIE_KEY_1, config.COOKIE_KEY_2]
}))

app.use(passport.initialize());
app.use(passport.session());

// Temporary fix to req.session.regenerate is not a function error
app.use((req, res, next) => {
	if (req.session && !req.session.regenerate) {
		req.session.regenerate = (cb) => { cb(); };
	}
	if (req.session && !req.session.save) {
		req.session.save = (cb) => { cb(); };
	}
	next();
});

function checkLoggedIn(req, res, next) {
	console.log('Current user is: ', req.user);
	const isLoggedIn = req.isAuthenticated() && req.user; //TODO
	if (!isLoggedIn) {
		return res.status(401).json({
			error: 'You must log in!'
		});
	}
	next();
}

app.get('/auth/google',
	passport.authenticate('google', {
		scope: ['email']
	})
);

app.get('/auth/google/callback',
	passport.authenticate('google', {
		failureRedirect: '/failure',
		successRedirect: '/',
		session: true
	}),
	(req, res) => {
		console.log('Google called us back!');
	}
);

app.get('/auth/logout', (req, res, next) => {
	req.logout(function (err) {
		if (err) {
			return next(err);
		}

		res.redirect('/');
	});
});

app.get('/secret', checkLoggedIn, (req, res) => {
	return res.send('Your personal secret value is 42!');
});

app.get('/failure', (req, res) => {
	return res.send('Failed to log in!');
});

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use((req, res) => {
    res.status(404).send('Page not found');
});

app.use((err, req, res, next) => {
	console.error(err.stack);

	res.status(err.status || 500).json({
		error: err.message || 'Internal Server Error'
	});
});

const sslOptions = {
	key: fs.readFileSync('key.pem'),
	cert: fs.readFileSync('cert.pem'),
};

https.createServer(sslOptions, app)
	.listen(PORT, () => {
		console.log(`Listening on port ${PORT}...`);
	});

/*
For a real website I'd eventually aim for something like:

project/
│
├── server.js
│
├── config/
│      passport.js
│      index.js
│
├── middleware/
│      checkLoggedIn.js
│
├── routes/
│      auth.router.js
│      home.router.js
│      users.router.js
│
├── controllers/
│      auth.controller.js
│      users.controller.js
│
├── services/
│      auth.service.js
│
├── models/
│      user.model.js
│
├── public/
│
├── views/
│
├── certificates/
│      key.pem
│      cert.pem
│
└── app.js


A scalable blueprint typically follows this flow:
	1. Imports
	2. Environment/configuration
	3. Express app creation
	4. Global middleware
	5. Authentication/session setup
	6. Custom middleware
	7. Route registration
	8. 404 handler
	9. Error-handling middleware
	10. Server startup

	
*/