import express from 'express';
import Example from '../models/user.model.js';
const router = express.Router();

/* -------------------------------------------------------------------------- */
/*                                     GET                                    */
/* -------------------------------------------------------------------------- */
router.get('/', async (req, res) => {
  const example = await Example.find({});
  res.json(example);
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const example = await Example.findById(id);

    if (!example) {
      return res.status(404).json({
        error: 'Not found',
        message: `ID not found`
      });
    }

    res.json(example);

  } catch (error) {
    res.status(500).json({ 
      error: 'Internal error',
      message: error.message 
    });
  }
});

/* -------------------------------------------------------------------------- */
/*                                    POST                                    */
/* -------------------------------------------------------------------------- */
router.post('/', async (req, res) => {
  try {
    const newExample = new example(req.body);
    const savedexample = await newExample.save();

    res.status(201).json({
      message: 'example saved successfully',
      data: savedExample
    });

  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        error: 'Validation error',
        message: `Inputs didn't validate correctly`,
        details: error.errors 
      });
    }

    res.status(500).json({ 
      error: 'Internal error',
      message: error.message 
    });
  }
});

/* -------------------------------------------------------------------------- */
/*                                     PUT                                    */
/* -------------------------------------------------------------------------- */
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedExample = await Example.findByIdAndUpdate(id, req.body, {
      new: true, 
      runValidators: true
    });

    if (!updatedExample) {
      return res.status(404).json({
        error: 'Not found',
        message: `ID not found`
      });
    }

    res.json({
      message: 'example updated successfully',
      data: updatedExample
    });

  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        error: 'Validation error',
        message: `Inputs didn't validate correctly`,
        details: error.errors 
      });
    }

    res.status(500).json({ 
      error: 'Internal error',
      message: error.message 
    });
  }
});

/* -------------------------------------------------------------------------- */
/*                                   DELETE                                   */
/* -------------------------------------------------------------------------- */
router.delete('/:id', async (req, res) => { 
  try {
    const  { id } = req.params;
    const deletedExample = await Example.findByIdAndDelete(id);
    
    if (!deletedExample) {
      return res.status(404).json({
        error: 'Not found',
        message: `ID not found`
      });
    }

    res.json({
      message: 'example deleted successfully',
      data: deletedExample
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      error: 'Internal error',
      message: error.message 
    });
  }
});

export default router;