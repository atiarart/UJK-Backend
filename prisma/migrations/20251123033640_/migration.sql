/*
  Warnings:

  - The primary key for the `students` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `alamat` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `jurusan` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `kode` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `nama` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `tgl` on the `students` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[kode_siswa]` on the table `Students` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `alamat_siswa` to the `Students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jurusan_siswa` to the `Students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kode_siswa` to the `Students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nama_siswa` to the `Students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tanggal_siswa` to the `Students` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Students_kode_key` ON `students`;

-- AlterTable
ALTER TABLE `students` DROP PRIMARY KEY,
    DROP COLUMN `alamat`,
    DROP COLUMN `jurusan`,
    DROP COLUMN `kode`,
    DROP COLUMN `nama`,
    DROP COLUMN `tgl`,
    ADD COLUMN `alamat_siswa` VARCHAR(191) NOT NULL,
    ADD COLUMN `jurusan_siswa` VARCHAR(191) NOT NULL,
    ADD COLUMN `kode_siswa` VARCHAR(191) NOT NULL,
    ADD COLUMN `nama_siswa` VARCHAR(191) NOT NULL,
    ADD COLUMN `tanggal_siswa` DATETIME(3) NOT NULL,
    ADD PRIMARY KEY (`kode_siswa`);

-- CreateIndex
CREATE UNIQUE INDEX `Students_kode_siswa_key` ON `Students`(`kode_siswa`);
