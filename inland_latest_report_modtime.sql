ALTER TABLE inland 
    ADD latest_report TIMESTAMP;
 
ALTER TABLE inland 
    ALTER COLUMN latest_report 
        SET DEFAULT CURRENT_TIMESTAMP;
 
UPDATE inland
    SET latest_report=CURRENT_TIMESTAMP;
 
CREATE OR REPLACE FUNCTION inland_latest_report()
        RETURNS TRIGGER AS '
  BEGIN
    NEW.latest_report = NOW();
    RETURN NEW;
  END;
' LANGUAGE 'plpgsql';
 
CREATE TRIGGER inland_latest_report_modtime BEFORE UPDATE
  ON inland FOR EACH ROW EXECUTE PROCEDURE
  inland_latest_report();
