const db = require('../db/db');

module.exports = db.defineModel('users', {
  name: db.STRING(100),
  password: db.STRING(100),
  email: {
    type: db.STRING(100),
    defaultValue: 'test@qq.com',
    allowNull: false
  },
  gender: {
    type: db.INTEGER(11),
    defaultValue: 0,
    allowNull: false
  }
});