import prisma from "../config/prisma.js";

// FUNGSI READ
  // Read All Data
export const getAllStudents = async (req, res) => {
  try {
    const students = await prisma.students.findMany();

    return res.json(students); 
  } catch (error) {
    console.error("Gagal mengambil semua data:", error);
    return res.status(500).json({ message : error.message });
  }
};

  // Read Data by id 
export const getStudentById = async (req, res) => {
  try {
    const siswaId = req.params.id; 
    
    const student = await prisma.students.findUnique({
      // Mencari berdasarkan Primary Key (kode_siswa) yang bertipe String
      where: { 
        kode_siswa : siswaId 
      }
    });

    if (!student) {
      return res.status(404).json({ message: 'Data tidak ditemukan!'});
    }

    // PERBAIKAN: Mengubah 'Student' menjadi 'student'
    return res.json(student);

  } catch (error) {
    console.error(`Gagal mengambil data ${req.params.id}:`, error);
    return res.status(500).json({ message : error.message });
  }
}

// FUNGSI CREATE
export const createStudent = async (req, res) => {
    try {
        const { nama_siswa, alamat_siswa, tanggal_siswa, jurusan_siswa } = req.body;

        // Logic kode siswa baru
        const kodeTerakhir = await prisma.students.findFirst({
            orderBy: { kode_siswa: 'desc' }, 
            select: { kode_siswa: true },
        });

        // PERBAIKAN LOGIKA: Menggunakan satu variabel untuk kode berikutnya
        let nextCodeNumber = 1;

        if (kodeTerakhir) {
            const nomorTerakhirStr = kodeTerakhir.kode_siswa.substring(1); 
            const nomorTerakhir = parseInt(nomorTerakhirStr, 10);
            
            if (!isNaN(nomorTerakhir)) {
                nextCodeNumber = nomorTerakhir + 1;
            }
        }
        
        const kode_siswa = 'S' + String(nextCodeNumber).padStart(3, '0');

        // konversi tgl jadi objek prisma
        let dateObject = tanggal_siswa;
        if (typeof tanggal_siswa === 'string') {
            dateObject = new Date(tanggal_siswa); 
            
            if (isNaN(dateObject)) {
                return res.status(400).json({ msg: "Format tanggal tidak valid. Harap gunakan YYYY-MM-DD." });
            }
        }

        const data = {
            kode_siswa,
            nama_siswa, 
            alamat_siswa, 
            tanggal_siswa: dateObject,
            jurusan_siswa
        };

        const newStudent = await prisma.students.create({ data });
        
        return res.status(201).json({
            msg: "Data siswa berhasil ditambahkan!",
            data: newStudent
        });

    } catch (error) {
        console.error("Gagal menambahkan data:", error);
        return res.status(400).json({ msg: error.message });
    }
};

// FUNGSI UPDATE

export const updateStudent = async (req, res) => {
  try {
    const siswaId = req.params.id; 

    const existingStudent = await prisma.students.findUnique({
      where: { kode_siswa: siswaId },
    });

    if (!existingStudent) {
      return res.status(404).json({ msg: "Data siswa tidak ditemukan untuk diupdate!" });
    }

    const { nama_siswa, alamat_siswa, tanggal_siswa, jurusan_siswa } = req.body;
    
    // konversi tgl
    let dateObject = tanggal_siswa;
    if (tanggal_siswa && typeof tanggal_siswa === 'string') {
        dateObject = new Date(tanggal_siswa);
        if (isNaN(dateObject)) {
            return res.status(400).json({ msg: "Format tanggal tidak valid. Harap gunakan YYYY-MM-DD." });
        }
    }
    
    // Buat objek data untuk update
    const dataToUpdate = {
        // Menggunakan spread operator untuk hanya menyertakan field yang ada di body
        ...(nama_siswa && { nama_siswa }),
        ...(alamat_siswa && { alamat_siswa }),
        ...(jurusan_siswa && { jurusan_siswa }),
        ...(tanggal_siswa && { tanggal_siswa: dateObject }),
    };

    const updatedStudent = await prisma.students.update({
      where: { kode_siswa: siswaId },
      data: dataToUpdate,
    });

    return res.status(200).json({
      msg: "Data siswa berhasil diupdate!",
      data: updatedStudent,
    });
  } catch (error) {
    console.error("Gagal mengupdate data:", error);
    return res.status(400).json({ msg: error.message }); 
  }
};

// FUNGSI DELETE
export const deleteStudent = async (req, res) => {
  try {
    const siswaId = req.params.id; 

    const existingStudent = await prisma.students.findUnique({
        where: { kode_siswa: siswaId },
    });

    if (!existingStudent) {
        return res.status(404).json({ msg: "Data siswa tidak ditemukan untuk dihapus!" });
    }

    await prisma.students.delete({
      where: { kode_siswa: siswaId },
    });

    return res.status(200).json({
      msg: `Data siswa dengan ID ${siswaId} berhasil dihapus.`,
    });
  } catch (error) {
    console.error("Gagal menghapus data:", error);
    return res.status(500).json({ msg: error.message }); 
  }
};