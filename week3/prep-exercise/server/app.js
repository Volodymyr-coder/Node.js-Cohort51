import express from 'express';
// TODO Use below import statement for importing middlewares from users.js for your routes
import { login, logout, getProfile, register } from './users.js';

let app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/auth/register', register);

app.post('/auth/login', login);

app.get('/auth/profile', getProfile);

app.post('/auth/logout', logout);

// Serve the front-end application from the `client` folder
app.use(express.static('client'));

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
