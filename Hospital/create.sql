-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema newdb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema newdb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `newdb` DEFAULT CHARACTER SET utf8 ;
USE `newdb` ;

-- -----------------------------------------------------
-- Table `newdb`.`Medical_specialty`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `newdb`.`Medical_specialty` (
  `dep_id` INT NOT NULL,
  `dep_name` VARCHAR(45) NULL,
  `dep_phonenum` INT NULL,
  PRIMARY KEY (`dep_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `newdb`.`Doctor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `newdb`.`Doctor` (
  `dct_id` INT NOT NULL,
  `dct_name` VARCHAR(45) NULL,
  `dct_address` VARCHAR(45) NULL,
  `dct_phonenum` INT NULL,
  `dct_pass` INT NULL,
  `Medical_specialty_dep_id` INT NULL,
  `role` INT NULL,
  PRIMARY KEY (`dct_id`),
  INDEX `fk_Doctor_Medical_specialty1_idx` (`Medical_specialty_dep_id` ASC) VISIBLE,
  CONSTRAINT `fk_Doctor_Medical_specialty1`
    FOREIGN KEY (`Medical_specialty_dep_id`)
    REFERENCES `newdb`.`Medical_specialty` (`dep_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `newdb`.`Nurse`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `newdb`.`Nurse` (
  `nurse_id` INT NOT NULL,
  `nurse_name` VARCHAR(45) NULL,
  `nurse_address` VARCHAR(45) NULL,
  `nurse_phonenum` INT NULL,
  `nurse_pass` INT NULL,
  `Medical_specialty_dep_id` INT NULL,
  `role` INT NULL,
  PRIMARY KEY (`nurse_id`),
  INDEX `fk_Nurse_Medical_specialty1_idx` (`Medical_specialty_dep_id` ASC) VISIBLE,
  CONSTRAINT `fk_Nurse_Medical_specialty1`
    FOREIGN KEY (`Medical_specialty_dep_id`)
    REFERENCES `newdb`.`Medical_specialty` (`dep_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `newdb`.`Patient`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `newdb`.`Patient` (
  `patient_id` INT NOT NULL,
  `patient_name` VARCHAR(45) NULL,
  `patient_soc_secnum` INT NULL,
  `patient_gender` VARCHAR(45) NULL,
  `patient_adsress` VARCHAR(45) NULL,
  `patient_bloodtype` VARCHAR(45) NULL,
  `patient_height` INT NULL,
  `patient_weight` INT NULL,
  `patient_phonenum` INT NULL,
  `patient_pass` INT NULL,
  `role` INT NULL,
  PRIMARY KEY (`patient_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `newdb`.`Inpatient`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `newdb`.`Inpatient` (
  `room_info` INT NULL,
  `admission_datetime` DATETIME NULL,
  `discharge_datetime` DATETIME NULL,
  `Patient_patient_id` INT NOT NULL,
  PRIMARY KEY (`Patient_patient_id`),
  CONSTRAINT `fk_Inpatient_Patient`
    FOREIGN KEY (`Patient_patient_id`)
    REFERENCES `newdb`.`Patient` (`patient_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `newdb`.`Reservation`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `newdb`.`Reservation` (
  `Patient_patient_id` INT NULL,
  `Medical_specialty_dep_id` INT NULL,
  `res_num` INT NOT NULL AUTO_INCREMENT,
  `res_datetime` DATETIME NULL,
  PRIMARY KEY (`res_num`),
  INDEX `fk_Patient_has_Medical_specialty_Medical_specialty1_idx` (`Medical_specialty_dep_id` ASC) VISIBLE,
  INDEX `fk_Patient_has_Medical_specialty_Patient1_idx` (`Patient_patient_id` ASC) VISIBLE,
  CONSTRAINT `fk_Patient_has_Medical_specialty_Patient1`
    FOREIGN KEY (`Patient_patient_id`)
    REFERENCES `newdb`.`Patient` (`patient_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Patient_has_Medical_specialty_Medical_specialty1`
    FOREIGN KEY (`Medical_specialty_dep_id`)
    REFERENCES `newdb`.`Medical_specialty` (`dep_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `newdb`.`Examination`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `newdb`.`Examination` (
  `Doctor_dct_id` INT NOT NULL,
  `Patient_patient_id` INT NULL,
  `exam_date` DATETIME NULL,
  `exam_details` VARCHAR(45) NULL,
  INDEX `fk_Doctor_has_Patient_Patient1_idx` (`Patient_patient_id` ASC) VISIBLE,
  INDEX `fk_Doctor_has_Patient_Doctor1_idx` (`Doctor_dct_id` ASC) VISIBLE,
  CONSTRAINT `fk_Doctor_has_Patient_Doctor1`
    FOREIGN KEY (`Doctor_dct_id`)
    REFERENCES `newdb`.`Doctor` (`dct_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Doctor_has_Patient_Patient1`
    FOREIGN KEY (`Patient_patient_id`)
    REFERENCES `newdb`.`Patient` (`patient_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `newdb`.`Treatment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `newdb`.`Treatment` (
  `Nurse_nurse_id` INT NOT NULL,
  `Patient_patient_id` INT NULL,
  `treat_datetime` DATETIME NULL,
  `treat_details` VARCHAR(45) NULL,
  INDEX `fk_Nurse_has_Patient_Patient1_idx` (`Patient_patient_id` ASC) VISIBLE,
  INDEX `fk_Nurse_has_Patient_Nurse1_idx` (`Nurse_nurse_id` ASC) VISIBLE,
  CONSTRAINT `fk_Nurse_has_Patient_Nurse1`
    FOREIGN KEY (`Nurse_nurse_id`)
    REFERENCES `newdb`.`Nurse` (`nurse_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Nurse_has_Patient_Patient1`
    FOREIGN KEY (`Patient_patient_id`)
    REFERENCES `newdb`.`Patient` (`patient_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;


CREATE TABLE admins (
    admin_id INT NOT NULL AUTO_INCREMENT,
    admin_name VARCHAR(45) NOT NULL,
    admin_pass INT NOT NULL, -- Should be hashed in actual implementation
    role INT NOT NULL DEFAULT 1,
    PRIMARY KEY (admin_id)
);

