INSERT INTO orders (
  menu_items,   -- ARRAY OF ARRAYS [[1,2,3],[2,3,4]] -> [[item_id, qnty, unit_price]]
  item_names,
  customer_name ,
  customer_phone ,
  total_paid ,
  start_time ,
  end_time
)
VALUES
('[[1,2,10],[2,3,15]]','["Curry Chicken","Butter Chicken"]' ,'jone','647-746-1021', 65, '2021-11-27 12:52:51.337466','2021-11-27 13:12:51.337466');