import express from 'express';
import authenticateToken from '../middleware/authenticate-token.js';
import path from 'path';
import { fileURLToPath } from 'url';
const router = express.Router();

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

/* -------------------------------------------------------------------------- */
/*                                     GET                                    */
/* -------------------------------------------------------------------------- */
router.get('/',authenticateToken, async (req, res) => {
  const imagePath = path.join(dirname, '../images/darwin.jpg');
  res.sendFile(imagePath, (error) => {
    if(error) {
      res.status(404).json({
        error: 'Not found',
        message: `Image not found`
      });
    }
  });
});

export default router;