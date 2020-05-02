const ProductsService = require('../../services/products');

const productService = new ProductsService();


const productsRouter = async (req, res, next) => {
  const { tags } = req.query;

  try {
    throw new Error('This is an error');
    const products = await productService.getProducts({ tags });
    res.render("products", { products });

  } catch(err) {
    next(err)
  }
}

module.exports = {
  productsRouter,
}