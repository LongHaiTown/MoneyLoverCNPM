const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER || 'root',  // Nếu DB_USER undefined thì mặc định là root
    process.env.DB_PASSWORD || '',  // Nếu không có password thì truyền ""
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT || 3306, // Nếu không có DB_PORT thì dùng 3306
        dialect: 'mysql',
        logging: false,
        database: 'moneylover' // Tên database phải được chỉ định ở đây
    }
);

sequelize.authenticate()
    .then(() => console.log('✅ Kết nối MySQL thành công!'))
    .catch(err => console.error('❌ Lỗi kết nối MySQL:', err));

module.exports = sequelize;
