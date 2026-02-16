const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

// Create Sequelize instance for MySQL
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

// Test database connection
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ MySQL Database connection successful!');
    
    // Sync models (create tables)
    await sequelize.sync({ alter: true });
    console.log('✅ MySQL Database tables synchronized!');
    
  } catch (error) {
    console.error('❌ MySQL Database connection failed:', error.message);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };
