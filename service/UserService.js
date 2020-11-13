const model = require('../db/model');

const { User } = model;

module.exports = { 
  findUserAll: async () => {
    return await User.findAll();
  },
  findUserById: async (id) => {
    return await User.findAll({
      where: { id }
    });
  },
  findUserByNameAndPassword: async (name, password) => {
    return await User.findOne({
      where: { name, password }
    });
  },
  findUserByName: async (name) => {
    return await User.findOne({
      where: { name }
    });
  },
  createUser: async (user) => {
    return await User.create(user);
  },
  deleteUserById: async (id) => {
    return await User.destroy({ where: { id }});
  }
}