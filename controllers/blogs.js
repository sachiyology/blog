const Blog = require('../models/blog')
const Comment = require('../models/comment');
const router = require('express').Router();


// Create
  router.post('/', async(req, res) => {
    try{
      const createdBlog = await Blog.create(req.body)
      res.status(200).json(createdBlog)
    }catch(error){
      console.error(error)
      res.status(400).json({ message: error.message })
    }
  })


// Read
  /* Index */
    router.get('/', async (req, res) => {
      try{
        const foundBlogs = await Blog.find({})
        res.status(200).json(foundBlogs)
      }catch(error){
        console.error(error);
        res.status(400).json({ message: error.message });
      }
    })
  /* Show */
  router.get('/:id', async (req, res) => {
    try{
      const foundBlog = await Blog.findById(req.params.id)
      res.status(200).json(foundBlog)
    }catch(error){
      console.error(error);
      res.status(400).json({ message: error.message });
    }
  })

// Update
  /* Update */
  router.put('/:id', async (req, res) => {
    try {
      const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true })
      res.status(200).json(updatedBlog)
    }catch(error){
      console.error(error);
      res.status(400).json({ message: error.message })
    }
  })

  /* Add Comment */
  // Create A Comment
  // Take said comment and add it to the comment array of the ....
  // ....Blog in question
  // Send back a relevant response


  /*
    const createdComment = await Comment.create(req.body)
    const updatedBlog = await Blog.findByIdAndUpdate()

  */
  router.put('/:id/addComment', (req, res) => {
    //store the query
    const createCommentQuery = Comment.create(req.body)
    // actually run query
    createCommentQuery.exec((err, createdComment) => {
      if (err){
        console.error(err);
        res.status(400).json({ message: err.message});
      } else {
        const updateBlogQuery = Blog.findByIdAndUpdate(req.params.id, { $addToSet: { comments: createdComment._id }}, { new: true })
        // actually run it
        updateBlogQuery.exec((err, updatedBlog) => {
              if(err){
                console.error(err);
                res.status(400).json({ message: err.message })
              } else {
                res.status(200).json(createdComment)
              }
        })
      }
    })
  })

// Delete

router.delete('/:id', async (req, res) => {
  try{
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedBlog);
  } catch(error){
    console.error(error);
    res.status(400).json({ message: error.message})
  }
})

module.exports = router;
