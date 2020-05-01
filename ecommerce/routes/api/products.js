const express = require('express');
const ProductService = require('../../services/products');

const router = express();


const productService = new ProductService();

router.get('/', async (req, res, next) => {
  const { tags } = req.query;
  console.log('req', req.query);

  try {
    const products = await productService.getProducts({ tags });
  
    res.status(200).json({
      data: products,
      message: 'Products listed'
    })
  } catch(err) {
    next(err)
  }

})

router.get('/:productId', async (req, res, next) => {
  const { productId } = req.params;
  console.log('ProductId en routes--------->', productId);

  try {
    const product = await productService.getProduct({ productId });
  
    res.status(200).json({
      data: product,
      message: 'Product retrieved'
    })

  } catch(err) {
    next(err)
  }

})

router.post('/', async (req, res, next) => {
  const { body: product } = req;
  console.log('Del body---------->', product)

  try {
    const createdProduct = await productService.createProduct({ product });
  
    res.status(201).json({
      data: createdProduct,
      message: 'Product create'
    })

  } catch(err) {
    next(err)
  }

})

router.put('/:productId', async (req, res, next) => {
  const { productId } = req.params;
  const { body: product } = req;

  try {
    const updatedProduct = await productService.updateProduct({ productId, product });
  
    res.status(200).json({
      data: updatedProduct,
      message: 'Product update'
    })

  } catch(err) {
    next(err)
  }

})

router.delete('/:productId', async (req, res, next) => {
  const { productId } = req.params;

  try {
    const product = await productService.deleteProduct({ productId });
  
    res.status(200).json({
      data: product,
      message: 'Product deleted'
    })

  } catch(err) {
    next(err)
  }

})

router.patch('/:productId', async (req, res, next) => {
  const { productId } = req.params;
  const { body: product } = req;

  try {
    const patchedProduct = await productService.patchProduct({ productId, product });
  
    res.status(200).json({
      data: patchedProduct,
      message: 'Product patched'
    })

  } catch(err) {
    next(err)
  }

})

module.exports = router;