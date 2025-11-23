-- CreateTable
CREATE TABLE `Students` (
    `kode` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(191) NOT NULL,
    `alamat` VARCHAR(191) NOT NULL,
    `tgl` DATETIME(3) NOT NULL,
    `jurusan` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Students_kode_key`(`kode`),
    PRIMARY KEY (`kode`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
