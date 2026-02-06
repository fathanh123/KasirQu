const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const DetailTransaksis = sequelize.define('detailTransaksis', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  transaksisId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'transaksis', // Nama tabel di database
      key: 'id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  },
  productsId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'products', // Nama tabel di database
      key: 'id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  },
  stok: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  deletedAt: {
    type: DataTypes.DATE // Kolom untuk soft delete
  }
}, {
  modelName: 'detailTransaksis',
  tableName: 'detailtransaksis', // Nama tabel di database
  timestamps: true, // Mengaktifkan createdAt dan updatedAt
  paranoid: true, // Mengaktifkan soft delete (deletedAt)
  hooks: {
    // Hook ini menggantikan Trigger Database untuk mengurangi stok
    afterCreate: async (detailTransaksi, options) => {
      try {
        // Ambil model Product dari instance sequelize
        const Product = sequelize.models.products;
        
        // Cari produk yang dibeli
        const product = await Product.findByPk(detailTransaksi.productsId, { transaction: options.transaction });

        // Jika produk ditemukan dan bukan unlimited stock
        if (product && !product.unlimited_stock) {
          const newStock = product.stock - detailTransaksi.stok;
          // Update stok, pastikan tidak kurang dari 0
          await product.update({ stock: newStock < 0 ? 0 : newStock }, { transaction: options.transaction });
        }
      } catch (error) {
        console.error("Error reducing stock via Sequelize Hook:", error);
        // Opsional: throw error jika ingin membatalkan transaksi jika update stok gagal
      }
    }
  }
});

module.exports = DetailTransaksis;
