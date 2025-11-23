import prisma from "../config/prisma";

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

    return res.json(latpro);

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

        let kodeBaru = 1;
        if (kodeTerakhir) {
            const nomorTerakhirStr = kodeTerakhir.kode_siswa.substring(1); 
            const nomorTerakhir = parseInt(nomorTerakhirStr);
            nomorBaru = nomorTerakhir + 1;
        }

        const kode_siswa = 'S' + String(kodeBaru).padStart(3, '0');

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

// FUNGSI UPDADE
// --- 3. FUNGSI UPDATE (Mengubah Data) ---
// ****************************************

/**
 * Mengubah data Latpro berdasarkan kode_siswa.
 * Method: PUT/PATCH /api/latpro/:id
 */
export const updateLatpro = async (req, res) => {
  try {
    // 1. Ambil ID dari URL params sebagai STRING
    const siswaId = req.params.id; 

    // 2. Cek apakah data yang akan diupdate ada.
    const existingLatpro = await prisma.latpro.findUnique({
      where: { kode_siswa: siswaId },
    });

    if (!existingLatpro) {
      return res.status(404).json({ msg: "Data siswa tidak ditemukan untuk diupdate!" });
    }

    // 3. Ambil data baru dari body
    const { nama_siswa, alamat_siswa, tanggal_siswa, jurusan_siswa } = req.body;
    
    // --- KONVERSI TANGGAL UNTUK UPDATE ---
    let dateObject = tanggal_siswa;

    // Konversi hanya jika tanggal_siswa dikirim dan berupa string
    if (tanggal_siswa && typeof tanggal_siswa === 'string') {
        dateObject = new Date(tanggal_siswa);
        if (isNaN(dateObject)) {
            return res.status(400).json({ msg: "Format tanggal tidak valid. Harap gunakan YYYY-MM-DD." });
        }
    }
    // ------------------------------------
    
    // 4. Buat objek data untuk update
    const dataToUpdate = {
        // Menggunakan spread operator untuk hanya menyertakan field yang ada di body
        ...(nama_siswa && { nama_siswa }),
        ...(alamat_siswa && { alamat_siswa }),
        ...(jurusan_siswa && { jurusan_siswa }),
        ...(tanggal_siswa && { tanggal_siswa: dateObject }),
    };

    // 5. Lakukan operasi UPDATE di Prisma
    const updatedLatpro = await prisma.latpro.update({
      where: { kode_siswa: siswaId },
      data: dataToUpdate,
    });

    // 6. Kirim respons sukses
    return res.status(200).json({
      msg: "Data siswa berhasil diupdate!",
      data: updatedLatpro,
    });
  } catch (error) {
    console.error("Gagal mengupdate data:", error);
    return res.status(400).json({ msg: error.message }); 
  }
};

// --- 4. FUNGSI DELETE (Menghapus Data) ---
// ******************************************

/**
 * Menghapus data Latpro berdasarkan kode_siswa.
 * Method: DELETE /api/latpro/:id
 */
export const deleteLatpro = async (req, res) => {
  try {
    // 1. Ambil ID dari URL params sebagai STRING
    const siswaId = req.params.id; 

    // 2. Cek apakah data yang akan dihapus ada (untuk respons 404).
    const existingLatpro = await prisma.latpro.findUnique({
        where: { kode_siswa: siswaId },
    });

    if (!existingLatpro) {
        return res.status(404).json({ msg: "Data siswa tidak ditemukan untuk dihapus!" });
    }

    // 3. Lakukan operasi DELETE di Prisma
    await prisma.latpro.delete({
      where: { kode_siswa: siswaId },
    });

    // 4. Kirim respons sukses
    return res.status(200).json({
      msg: `Data siswa dengan ID ${siswaId} berhasil dihapus.`,
    });
  } catch (error) {
    console.error("Gagal menghapus data:", error);
    // Menggunakan Status 500 karena ini biasanya kegagalan database atau server.
    return res.status(500).json({ msg: error.message }); 
  }
};




