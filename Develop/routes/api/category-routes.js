const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
// find all categories
  // be sure to include its associated Products
router.get('/',async (req, res) => {
  
  try {
    const categories = await Category.findAll({include:[{model: Product}]})
  res.status(200).json(categories)
 } catch (err) {
    res.status(500).json(err);
  }
 });

router.get('/:id',async (req, res) => {
const {id} = req.params
  try {
    const category = await Category.findAll({
      where:{id},
      include:[{model: Product}]
  })
  res.status(200).json(category)

  } catch (err) {
    res.status(500).json(err);
  }
  // find one category by its `id` value
  // be sure to include its associated Products

});

router.post('/',async (req, res) => {
  try {
    const newCategory = await Reader.create(req.body);
    res.status(200).json(newCategory);
  } catch (err) {
    res.status(400).json(err);
  }
  // create a new category


});

router.put('/:id',async (req, res) => {
  try {
    const updateCategory = await Reader.create(req.body);
    res.status(200).json(updateCategory);
  } catch (err) {
    res.status(400).json(err);
  }
  // update a category by its `id` value
});

router.delete('/:id',async (req, res) => {
  try {
    const dltCategories = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!dltCategories) {
      res.status(404).json({ message: 'No reader found with that id!' });
      return;
    }

    res.status(200).json(dltCategories);
  } catch (err) {
    res.status(500).json(err);
  } 
  // delete a category by its `id` value
});

module.exports = router;
