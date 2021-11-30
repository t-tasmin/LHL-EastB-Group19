const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.post("/", (req, res) => {
    const order = req.body;
    
    console.log('//--------------------------------');  
    console.log(order);
    console.log('//--------------------------------'); 
    
    
    let orderf = {};
    for (let i in order) {
      if (typeof order[i] === 'object') {
        orderf[i] = order[i]
      }
    }
    console.log('orderf -->', orderf);

    if (Object.keys(orderf).length === 0) {
      const templateVars = { 
        script: 'Oops! Could not understand your order. Please assign a quantity to each checked dish only. We await you. Thank you!'
      }
      res.render('index', templateVars);
    } else if (Object.keys(orderf).length !== 0) {
      let faulty = false;
      for (let i in orderf) {
        for (let j of orderf[i]) {
          if (j.length === 0) {
            faulty = true;
            break;
          }
        }
      }
      if (faulty) {
        const templateVars = { 
          script: 'Oops! Could not understand your order. Please assign a quantity to each checked dish only. We await you. Thank you!'
        }
        res.render('index', templateVars);
      } else {
        res.render('index');
      }
    } 
  });
  return router;
};
  