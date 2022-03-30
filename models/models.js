
const sequelize = require('../db')
const {DataTypes} = require('sequelize')
const User = sequelize.define(
    'User',
    {
      // Здесь определяются атрибуты модели
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      login: {
        type: DataTypes.STRING,
        allowNull: false,// allowNull по умолчанию имеет значение true
      },
      email:{
          type: DataTypes.STRING,
          unique: true
      },
      password:{
          type: DataTypes.STRING,
          unique: false,
      },
      role: {
          type: DataTypes.STRING,
          defaultValue: "USER"
      },
      isActivated: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      activationLink: {
        type: DataTypes.STRING
      }

    }
  )
  
  // `sequelize.define` возвращает модель
const Info = sequelize.define(
    'Info', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
          },
        //   userId: {
        //     type: DataTypes.STRING,
        //   },
    }
)
const Questions = sequelize.define(
    'Questions', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
          },
        text: {
            type: DataTypes.TEXT,
            allowNull: false
          },
    }
)
const Tokens = sequelize.define(
  'Tokens',{
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    refreshToken: {
        type: DataTypes.STRING,
        allowNull: false
      },
    }
 
)
User.hasOne(Info);
Info.belongsTo(User);

User.hasMany(Questions);
Questions.belongsTo(User)

User.hasOne(Tokens);
Tokens.belongsTo(User)
module.exports = {
    User, Questions, Info, Tokens
}

console.log(User === sequelize.models.User) // true
  