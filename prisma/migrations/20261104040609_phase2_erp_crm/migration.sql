-- AlterTable
ALTER TABLE `Activity` ADD COLUMN `done` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `dueAt` DATETIME(3) NULL,
    ADD COLUMN `projectId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Client` ADD COLUMN `address` VARCHAR(191) NULL,
    ADD COLUMN `contactName` VARCHAR(191) NULL,
    ADD COLUMN `email` VARCHAR(191) NULL,
    ADD COLUMN `notes` TEXT NULL,
    ADD COLUMN `phone` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Invoice` ADD COLUMN `description` VARCHAR(191) NULL,
    ADD COLUMN `dueAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `Project` ADD COLUMN `approvedAt` DATETIME(3) NULL,
    ADD COLUMN `liveAt` DATETIME(3) NULL,
    ADD COLUMN `liveUrl` VARCHAR(191) NULL,
    ADD COLUMN `notes` TEXT NULL,
    ADD COLUMN `ownerId` VARCHAR(191) NULL,
    ADD COLUMN `previewAt` DATETIME(3) NULL,
    ADD COLUMN `previewUrl` VARCHAR(191) NULL,
    ADD COLUMN `startedAt` DATETIME(3) NULL;

-- CreateIndex
CREATE INDEX `Activity_projectId_idx` ON `Activity`(`projectId`);

-- CreateIndex
CREATE INDEX `Activity_dueAt_idx` ON `Activity`(`dueAt`);

-- CreateIndex
CREATE INDEX `Project_status_idx` ON `Project`(`status`);

-- AddForeignKey
ALTER TABLE `Project` ADD CONSTRAINT `Project_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Activity` ADD CONSTRAINT `Activity_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Project`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
