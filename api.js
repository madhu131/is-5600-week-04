const path = require('path')
const Products = require('./products')
const autoCatch = require('./lib/auto-catch')

 /**
 * Handle the root route
 * @param {object} req
 * @param {object} res
*/
function handleRoot (req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
}

/**
 * List all products
 */
async function listProducts(req, res) {
  const { offset = 0, limit = 25, tag } = req.query

  res.json(
    await Products.list({
      offset: Number(offset),
      limit: Number(limit),
      tag
    })
  )
}

/**
 * Get a single product
 */
async function getProduct(req, res, next) {
  const { id } = req.params

  const product = await Products.get(id)
  if (!product) return next()
  res.json(product)
}

/**
 * Create a new product
 */
async function createProduct(req, res) {
  const product = await Products.create(req.body);
  res.status(201).json(product);
}



/**
 * Update a product (PUT)
 */
async function updateProduct(req, res) {
  const result = await Products.update(req.params.id, req.body)
  res.status(200).json(result)
}

/**
 * Delete a product (DELETE)
 */
async function deleteProduct(req, res) {
  await Products.remove(req.params.id)
  res.status(202).json({
    message: "Product deleted",
    id: req.params.id
  })
}


module.exports = autoCatch({
  handleRoot,
  listProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
})