CREATE FUNCTION codispatch()
RETURNS trigger AS $$

BEGIN

UPDATE coastal SET ag_dispatch_level = obs.named_ag_dispatch_level
FROM obs
WHERE obs.created_at = (SELECT MAX(created_at) FROM obs)
AND coastal.cartodb_id = 1;

RETURN NEW;

END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER update_coastal_dispatch
AFTER INSERT 
ON obs
FOR EACH ROW
EXECUTE PROCEDURE codispatch();
