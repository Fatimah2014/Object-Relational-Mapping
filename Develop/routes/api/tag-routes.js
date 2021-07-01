const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
// find all tags
  // be sure to include its associated Product data
router.get('/',async (req, res) => {
  try {
    const tags = await Tag.findAll({
      include:[{model: Product}]})
  res.status(200).json(tags)
 } catch (err) {
    res.status(500).json(err);
  }
 });


  // find a single tag by its `id`
  // be sure to include its associated Product data
  router.get('/:id',async (req, res) => {
    try {
      const tag = await Tag.findByPk(req.params.id, {
        // Add Book as a second model to JOIN with
        include: [{ model: Product }],
      });
  
      if (!tag) {
        res.status(404).json({ message: 'No reader found with that id!' });
        return;
      }
  
      res.status(200).json(tag);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
    //   try{
  // const tag = await Tag.findByPk(rer.params.id, {
  //   include: [{model:Product}]
  // });
  
  // if (!tag) {
  //   res.status(404).json({ message: 'No reader found with that id!' });
  //   return;
  // }
/////******************note reminder tag add is not singling out the chosen id */
    // const {id} = req.params
  // try {
  //   const tag = await Tag.findByPk({
  //     where: {id},
     
    
//   res.status(200).json(tag)

//   } catch (err) {
//     res.status(500).json(err);
//   }

// });




  // create a new tag
router.post('/',async (req, res) => {
  try {
    const newCategory = await Tag.create(req.body);
    res.status(200).json(newCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});







  // update a tag's name by its `id` value
router.put('/:id',async (req, res) => {
  console.log('REQUEST!! ', req.body)
  const {id} = req.params
  try {
    const updateTag = await Tag.update({tag_name: req.body.tag_name },{ where: {id}});

    res.status(200).json(updateTag);
  } catch (err) {
    res.status(400).json(err);
  }
});







  // delete on tag by its `id` value
router.delete('/:id',async (req, res) => {
  const {id} = req.params
  try {
    const dltTag = await Tag.destroy({
      where:{id}
    });

    if (!dltTag) {
      res.status(404).json({ message: 'No reader found with that id!' });
      return;
    }

    res.status(200).json(dltTag);
  } catch (err) {
    res.status(500).json(err);
  } 
});
module.exports = router;
