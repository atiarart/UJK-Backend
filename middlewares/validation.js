export const validationBodyStudent = (req, res, next) => {
  const { nama_siswa, alamat_siswa, tanggal_siswa, jurusan_siswa } = req.body;

  if (
    !nama_siswa || 
    !alamat_siswa || 
    !tanggal_siswa || 
    !jurusan_siswa ||
    nama_siswa.trim() === '' || 
    alamat_siswa.trim() === '' || 
    jurusan_siswa.trim() === '' 
  ) {
    return res.status(400).json({ 
      message: "Tidak boleh ada data kosong." 
    });
  } 
  
  next();
} 