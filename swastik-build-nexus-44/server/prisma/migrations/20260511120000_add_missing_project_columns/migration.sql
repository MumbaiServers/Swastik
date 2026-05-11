-- AlterTable
ALTER TABLE `projects` ADD COLUMN `fullDescription` LONGTEXT NULL,
    ADD COLUMN `tag` VARCHAR(100) NULL,
    ADD COLUMN `maharera` VARCHAR(100) NULL,
    ADD COLUMN `isActive` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `googleMapsUrl` TEXT NULL,
    ADD COLUMN `amenitiesImage` VARCHAR(500) NULL,
    ADD COLUMN `connectivitiesImage` VARCHAR(500) NULL,
    ADD COLUMN `overviewImage` VARCHAR(500) NULL,
    ADD COLUMN `towerType` VARCHAR(20) NOT NULL DEFAULT 'single',
    ADD COLUMN `wingDetails` LONGTEXT NULL,
    ADD COLUMN `cardImage` VARCHAR(500) NULL;

-- CreateTable
CREATE TABLE IF NOT EXISTS `custom_pages` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `slug` VARCHAR(255) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `content` LONGTEXT NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `custom_pages_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
