-- AlterTable
ALTER TABLE `hero_banners` ADD COLUMN `image1536` VARCHAR(500) NULL,
    ADD COLUMN `image1920` VARCHAR(500) NULL,
    ADD COLUMN `image2560` VARCHAR(500) NULL,
    ADD COLUMN `imageMobile` VARCHAR(500) NULL;

-- AlterTable
ALTER TABLE `project_configurations` ADD COLUMN `image` VARCHAR(500) NULL;

-- AlterTable
ALTER TABLE `projects` ADD COLUMN `aboutDeveloperImage` VARCHAR(500) NULL,
    ADD COLUMN `aboutDeveloperText` TEXT NULL,
    ADD COLUMN `connectivitiesDescription` TEXT NULL,
    ADD COLUMN `disclaimer` TEXT NULL,
    ADD COLUMN `financeBy` VARCHAR(255) NULL,
    ADD COLUMN `floorPlanImage` VARCHAR(500) NULL,
    ADD COLUMN `mahareraQr` VARCHAR(500) NULL,
    ADD COLUMN `mahareraUrl` VARCHAR(500) NULL;
