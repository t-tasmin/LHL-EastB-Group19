/*
 * All routes for Menus are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    const queryString = `
    SELECT * 
    FROM menu_dishes;
    `;
  
    db.query(queryString)
      .then(data => {
        const menus = data.rows;
        const menuVar= {menus};
        res.render("menus_show", menuVar);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.post("/", (req, res) => {

  const order = req.body; 
    
    let orderf = {};
    for (let i in order) {
      if (typeof order[i] === 'object') {
        orderf[i] = order[i]
      }
    }

    if (Object.keys(orderf).length === 0 ) {
      const templateVars = { 
        script: 'Oops! Please assign a quantity to each checked dish only and enter a valid phone number. We await you. Thank you!'
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
          script: 'Oops! Could not process your order. Please return to the menu and assign a quantity to each desired and checked dish only. We await you. Thank you!'
        }
        res.render('index', templateVars);
      } else {
        let orderArray = [];
        for (let i in orderf) {
          orderArray.push(orderf[i]);
        }
        
        let order_checkout = [];
        for (let j of orderArray) {
          let qstring1 = `SELECT * FROM menu_dishes
                          WHERE name = $1;`;
          let values1 = [j[0]];
          db.query(qstring1, values1)
          .then((res) => {
            const dish = res.rows;
            order_checkout.push(dish[0]);
          })
          .catch((err) => {console.log(err.message)}); 
        }

        setTimeout(() => {

          let sttl = 0;
          for (let i = 0; i < orderArray.length; i++) {
            order_checkout[i]['qtt'] = Number(orderArray[i][1])
            order_checkout[i]['ttl'] = Number(orderArray[i][1])*order_checkout[i].unit_price;
            sttl += Number(orderArray[i][1])*order_checkout[i].unit_price;
          }
          order_checkout.push({'sttl': sttl, 'tax': '13%', 'gttl': sttl + ((sttl/100)*13)});

          const templateVars = {order_checkout}
          res.render('order_checkout', templateVars);

        }, 1000);
        
      }
    } 
  });
  
  return router;
};
