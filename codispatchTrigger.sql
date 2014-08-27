CREATE FUNCTION codispatch()
RETURNS trigger AS $$

BEGIN

UPDATE coastal SET ag_dispatch_level = obs.named_ag_dispatch_level, timestamp = obs.named_timestamp, temperature = obs.named_ag_temperature, rh = obs.named_ag_relative_humidity, ic = obs.named_ag_ignition_component, sc = obs.named_ag_spread_component, bi = obs.named_ag_burning_index
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
