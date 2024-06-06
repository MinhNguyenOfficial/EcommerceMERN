const Product = require('../models/ProductModel');

const createProduct = (newProduct) => {
  return new Promise(async (resolve, reject) => {
    const { name, image, type, price, countInStock, rating, description } =
      newProduct;

    try {
      const checkProduct = await Product.findOne({ name: name });
      if (checkProduct !== null) {
        resolve({
          status: 'OK',
          message: 'Product name is existed!',
        });
      }

      const newProduct = await Product.create({
        name,
        image,
        type,
        price,
        countInStock,
        rating,
        description,
      });

      if (newProduct) {
        resolve({
          status: 'OK',
          message: 'Success',
          data: newProduct,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const updateProduct = (productId, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkProduct = await Product.findOne({ _id: productId });

      if (checkProduct === null) {
        return resolve({
          status: 'OK',
          message: 'Product not found!',
        });
      }

      const updatedProduct = await Product.findByIdAndUpdate(productId, data, {
        new: true,
      });

      return resolve({
        status: 'OK',
        message: 'Success!',
        updatedProduct,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const getProductDetails = (productId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const product = await Product.findOne({ _id: productId });

      if (product === null) {
        return resolve({
          status: 'OK',
          message: 'Product not found!',
        });
      }

      return resolve({
        status: 'OK',
        message: 'Success!',
        data: product,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const deleteProduct = (productId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const product = await Product.findOne({ _id: productId });

      if (product === null) {
        return resolve({
          status: 'OK',
          message: 'Product not found!',
        });
      }

      await Product.findByIdAndDelete(productId);

      return resolve({
        status: 'OK',
        message: 'Delete Success!',
      });
    } catch (error) {
      reject(error);
    }
  });
};

const deleteProducts = (productIdList) => {
  return new Promise(async (resolve, reject) => {
    try {
      await Product.deleteMany({ _id: productIdList });

      return resolve({
        status: 'OK',
        message: 'Delete products success!',
      });
    } catch (error) {
      reject(error);
    }
  });
};

const getAllProduct = (limit = 8, page = 0, sort, filter) => {
  return new Promise(async (resolve, reject) => {
    try {
      const totalProduct = await Product.count();
      if (typeof filter === 'object') {
        const allObjectFilter = await Product.find({
          [filter[0]]: { $regex: filter[1] },
        })
          .limit(limit)
          .skip(page * limit);
        return resolve({
          status: 'OK',
          message: 'Success!',
          total: totalProduct,
          currentPage: Number(page + 1),
          totalPage: Math.ceil(totalProduct / limit),
          data: allObjectFilter,
        });
      }
      let product = [];
      if (typeof sort === 'object') {
        const objectSort = {};
        objectSort[sort[1]] = sort[0];

        product = await Product.find()
          .limit(limit)
          .skip(page * limit)
          .sort(objectSort);
      } else {
        product = await Product.find()
          .limit(limit)
          .skip(page * limit)
          .sort({ name: sort });
      }

      if (product === null) {
        return resolve({
          status: 'OK',
          message: 'Product not found!',
        });
      }

      return resolve({
        status: 'OK',
        message: 'Success!',
        total: totalProduct,
        currentPage: Number(page + 1),
        totalPage: Math.ceil(totalProduct / limit),
        data: product,
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  createProduct,
  updateProduct,
  getProductDetails,
  deleteProduct,
  getAllProduct,
  deleteProducts,
};
