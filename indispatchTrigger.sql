CREATE FUNCTION indispatch()
RETURNS trigger AS $$

BEGIN

UPDATE inland SET lt_dispatch_level = obs.named_lt_dispatch_level, timestamp = obs.named_timestamp, temperature = obs.named_lt_temperature, rh = obs.named_lt_relative_humidity, ic = obs.named_lt_ignition_component, sc = obs.named_lt_spread_component, bi = obs.named_lt_burning_index
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
