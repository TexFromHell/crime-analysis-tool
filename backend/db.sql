-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema my_db
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema my_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `my_db` DEFAULT CHARACTER SET utf8 ;
USE `my_db` ;

-- -----------------------------------------------------
-- Table `my_db`.`crime_record`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `my_db`.`crime_record` ;

CREATE TABLE IF NOT EXISTS `my_db`.`crime_record` (
  `crime_id` VARCHAR(255) NULL,
  `date` VARCHAR(255) NULL,
  `long` VARCHAR(255) NULL,
  `lat` VARCHAR(255) NULL,
  `location` VARCHAR(255) NULL,
  `crime` VARCHAR(255) NULL,
  `id` INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
