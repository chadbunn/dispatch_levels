ALTER TABLE coastal 
    ADD latest_report TIMESTAMP;
 
ALTER TABLE coastal 
    ALTER COLUMN latest_report 
        SET DEFAULT CURRENT_TIMESTAMP;
 
UPDATE coastal
    SET latest_report=CURRENT_TIMESTAMP;
 
CREATE OR REPLACE FUNCTION coastal_latest_report()
        RETURNS TRIGGER AS '
  BEGIN
    NEW.latest_report = NOW();
    RETURN NEW;
  END;
' LANGUAGE 'plpgsql';
 
CREATE TRIGGER coastal_latest_report_modtime BEFORE UPDATE
  ON coastal FOR EACH ROW EXECUTE PROCEDURE
  coastal_latest_report();
