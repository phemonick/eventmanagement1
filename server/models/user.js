import bcrypt from 'bcrypt';

export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('admin', 'user'),
      allowNull: false,
    },
  }, {
    hooks: {
      beforeCreate: (newUser) => {
        newUser.password = bcrypt.hashSync(newUser.password, bcrypt.genSaltSync(8));
      },
      afterUpdate: (newUser) => {
        newUser.password = bcrypt.hashSync(newUser.password, bcrypt.genSaltSync(8));
      }
    }
  });
  User.associate = (models) => {
    User.hasMany(models.Event, { foreignKey: 'userId', as: 'events' }); // associations can be defined here
  };
  return User;
};

