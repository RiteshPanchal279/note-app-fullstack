import express from "express"
import { addNote, deleteNote, getNote,updateNote } from "../controller/note_controller.js"
import isAuthenticated from "../middleware/isAuthenticated.js"

const router = express.Router()

router.route('/addnote').post(isAuthenticated,addNote)
router.route('/getnote').post(isAuthenticated,getNote)
router.route('/delete/:id').delete(isAuthenticated,deleteNote)
router.put("/update/:id", isAuthenticated, updateNote);


export default router;
