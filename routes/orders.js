const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.post("/", (req, res) => {
      const order = req.body;
      console.log(order);  
    });
  return router;
};
  