const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.post("/", (req, res) => {
      const order = req.body;
      let orderf = {};
      for (let i in order) {
        if (typeof order[i] === 'object') {
          orderf[i] = order[i]
        }
      }
      if (Object.keys(orderf).length === 0) {
        const templateVars = { 
          script: 'Oops! Could not understand your order. Please assign a quantity number to checked dishes only. We await you. Thank you!'
        }
        res.render('index', templateVars);
      } else {
        for (let i in orderf) {
          for (let j of orderf[i]) {
            if (typeof j === 'undefined') {
              const templateVars = { 
                script: 'Oops! Could not understand your order. Please assign a quantity number to checked dishes only. We await you. Thank you!'
              }
              res.render('index', templateVars);
              break;
            }
          }
        }
      }

      console.log('//--------------------------------');  
      console.log(order);
      console.log('//--------------------------------'); 
      res.render('index');  
    });
  return router;
};
  