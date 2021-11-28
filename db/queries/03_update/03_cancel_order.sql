UPDATE orders
SET end_time = NULL
WHERE id = $2;