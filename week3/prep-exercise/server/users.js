import newDatabase from './database.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

const saltRounds = 10;

// Change this boolean to true if you wish to keep your
// users between restart of your application
const isPersistent = false;
const database = newDatabase({ isPersistent });
const SECRET_KEY = 'ke%81t4klvbnlrkenbmcrk44regrtg455';

// Create middlewares required for routes defined in app.js
export const register = async (req, res) => {
  const userName = req.body.name;
  const password = req.body.password;

  if (!userName || !password) {
    return res
      .status(401)
      .json({ message: 'userName and password is required' })
      .end();
  }

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = {
      name: userName,
      password: hashedPassword
    };
    const storedObj = database.create(newUser);

    res.status(201).json({ id: uuidv4(), name: newUser.name });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong with server!' });
  }

  return;
};

export const login = async (req, res) => {
  const userName = req.body.name;
  const password = req.body.password;
  if (!userName || !password) {
    return res
      .status(401)
      .json({ message: 'userName and password is required' })
      .end();
  }

  const allUser = database.getAll();
  const user = allUser.find((user) => user.userName === userName);
  if (!user) {
    res.status(404).send('user not found');
    return;
  }

  try {
    const correctPassword = await bcrypt.compare(password, user.password);
    if (correctPassword) {
      const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '30m' });
      res.status(200).send({ message: 'you login ', token });
    }
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong with server!' });
  }
};

export const getProfile = async (req, res) => {
  const tokenJWT = req.headers.authorization.split(' ')[1];
  if (!tokenJWT) {
    res.status(404).json({ message: 'token lost' });
  }

  try {
    const decodeUser = jwt.verify(tokenJWT, SECRET_KEY);

    if (!user) {
      res.status(403).json({ message: 'something wrong with token!' });
    }
    const user = database.getById(decodeUser.id);
    res.status(201).json({ message: `this is user with name ${user.name}` });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong with server!' });
  }
};

export const logout = async (req, res) => {
  res.status(200).send('you are logout!');
};

// You can also create helper functions in this file to help you implement logic
// inside middlewares
