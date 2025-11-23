import express from "express"
import {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent
} from "../controllers/studentsController.js";
import { validationBodyStudent } from "../middlewares/validation.js";

const router = express.Router();

//routing
router.get('/api/students', getAllStudents);
router.get('/api/students/:id', getStudentById);
router.post('/api/students', validationBodyStudent, createStudent);
router.put('/api/students/:id', validationBodyStudent, updateStudent);
router.delete('/api/students/:id', deleteStudent);

// ekspor
export default router;
