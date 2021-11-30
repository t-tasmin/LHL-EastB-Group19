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

    
  //   let items = req.body.itemName;
  //   console.log("this Body ===>",req.body); //-------------------------------------------
  //   let numberOfItems = req.body.numberOfItems;
  //   numberOfItems = numberOfItems.filter((a) => a); 

  //   let itemNames=[];
  //   let unitPrices=[];
  //   let orders  = [];

  //   for (let i in items){
  //     let s= items[i].split("+");
  //     itemNames.push(s[0]);
  //     unitPrices.push(s[1]);
  //   }

  //   for (let index in itemNames)
  //   {
  //     orders[index] ={itemName: itemNames[index], unitPrice: unitPrices[index], numberOfItem: numberOfItems[index] ,totalPrice:numberOfItems[index]*unitPrices[index]};
  //   }

  //   console.log(orders);
  //   let orderVar = {orders};
  //   res.render("order_checkout",orderVar);
   
  //   queryParams = ['('+itemNames.join(',')+')'];
  //   let queryString = `
  //   UPDATE menu_dishes
  //   SET number_available = number_available -1
  //   WHERE name in $1
  //    `;
  //   console.log(queryString, queryParams);
    
  // });

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
          let qstring1 = `SELECT id, name, unit_price FROM menu_dishes
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
          
        console.log('this order=========>',orderArray); ///===================
        console.log('this checkout========>',order_checkout); ///==================

        let sttl = 0;
        for (let i = 0; i < orderArray.length; i++) {
          order_checkout[i]['qtt'] = Number(orderArray[i][1])
          order_checkout[i]['ttl'] = Number(orderArray[i][1])*order_checkout[i].unit_price;
          sttl += Number(orderArray[i][1])*order_checkout[i].unit_price;
        }
        order_checkout.push({'sttl': sttl, 'tax': '13%', 'gttl': sttl + ((sttl/100)*13)});

        console.log(order_checkout); //=======================

        // const templateVars = {order_checkout}
        // res.render('index', templateVars);
      }, 1000); //----------------------------------///////////////////////


        
      }
    } 
  });
  
  return router;
};
