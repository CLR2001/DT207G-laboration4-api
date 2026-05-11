import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
const router = express.Router();

/* -------------------------------------------------------------------------- */
/*                                     GET                                    */
/* -------------------------------------------------------------------------- */
router.get('/', async (req, res) => {
  const user = await User.find({});
  res.json(user);
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        error: 'Not found',
        message: `ID not found`
      });
    }

    res.json(user);

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
    const newUser = new User(req.body);
    const savedUser = await newUser.save();

    res.status(201).json({
      message: 'User saved successfully',
      data: saveduser
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

router.post('/login', async (req, res) => {
  const { username, email, password } = req.body;

  const user = await User.findOne({ 
    $or: [ {username}, {email} ]
  });

   if (!user) {
    return res.status(401).json({
      error: 'Invalid input',
      message: `Invalid login credentials`
    });
   }

   const correctPassword = await bcrypt.compare(password, user.password);

   if (!correctPassword) {
    return res.status(401).json({
      error: 'Invalid input',
      message: `Invalid login credentials`
    });
   }

   const payload = {_id: user._id}
   const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {expiresIn: '1h'});
   res.status(200).json({
      message: 'Successfully logged in',
      token: token
    });
});

/* -------------------------------------------------------------------------- */
/*                                     PUT                                    */
/* -------------------------------------------------------------------------- */
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true, 
      runValidators: true
    });

    if (!updatedUser) {
      return res.status(404).json({
        error: 'Not found',
        message: `ID not found`
      });
    }

    res.json({
      message: 'User updated successfully',
      data: updatedUser
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
    const deletedUser = await User.findByIdAndDelete(id);
    
    if (!deletedUser) {
      return res.status(404).json({
        error: 'Not found',
        message: `ID not found`
      });
    }

    res.json({
      message: 'User deleted successfully',
      data: deletedUser
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