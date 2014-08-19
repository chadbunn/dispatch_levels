CREATE FUNCTION dispatch()
RETURNS trigger AS $$

BEGIN

UPDATE inland SET lt_dispatch_level = obs.named_lt_dispatch_level
FROM obs
WHERE obs.created_at = (SELECT MAX(created_at) FROM obs)
AND inland.cartodb_id = 1;

UPDATE coastal SET ag_dispatch_level = obs.named_ag_dispatch_level
FROM obs
WHERE obs.created_at = (SELECT MAX(created_at) FROM obs)
AND coastal.cartodb_id = 1;

END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER update_dispatch
AFTER INSERT 
ON obs
FOR EACH ROW
EXECUTE PROCEDURE dispatch(); 
