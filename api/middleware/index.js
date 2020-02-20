const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const logger = require('./logger');
const session = require('express-session');
const knexSessionStore = require('connect-session-knex')(session);

const sessionConfig = {
  name: 'session',
  secret: 'q39pgi846mq0cy1esu8c4xqh8te7rusyp95uyosv2atgxe9p8y',
  cookie: {
    maxAge: 1000 * 60 * 60,
    secure: false,
    httpOnly: true
  },
  resave: false,
  rolling: true,
  saveUninitialized: true,
  store: new knexSessionStore({
    knex: require('../../data/dbConfig.js'),
    tablename: 'sessions',
    sidfieldname: 'sid',
    createtable: true,
    clearInterval: 1000 * 60 * 60
  })
};

module.exports = server => {
  server.use(helmet());
  server.use(express.json());
  server.use(cors());
  server.use(logger);
  server.use(session(sessionConfig));
};