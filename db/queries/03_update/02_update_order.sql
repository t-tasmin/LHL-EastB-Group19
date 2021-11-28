UPDATE orders
SET end_time = $1
WHERE id = $2;