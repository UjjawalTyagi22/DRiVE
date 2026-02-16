const express = require('express');
const router = express.Router();
router.get('/', (req, res) => {
  res.json({ message: 'Module route working!' }); // change message for each file
});
module.exports = router;
