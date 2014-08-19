CREATE FUNCTION indispatch()
RETURNS trigger AS $$

BEGIN

UPDATE inland SET lt_dispatch_level = obs.named_lt_dispatch_level
FROM obs
WHERE obs.created_at = (SELECT MAX(created_at) FROM obs)
AND inland.cartodb_id = 1;

RETURN NEW;

END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER update_inland_dispatch
AFTER INSERT 
ON obs
FOR EACH ROW
EXECUTE PROCEDURE indispatch();
