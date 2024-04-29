const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
  const ProspectInfo = sequelize.define('ProspectInfo', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    companyName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contactName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    position: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    specificAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mobileNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    telephone1: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    telephone2: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    supplier: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    volume: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    salesAgent: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    prospectEmail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING, // You may adjust this data type based on your image storage method
      allowNull: true,
    },
  });

  return ProspectInfo;
};
