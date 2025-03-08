import {configureStore} from "@reduxjs/toolkit"
import { noteReducer } from "./noteSlice"
import { authReducer } from "./authSlice"

export const store=configureStore({
   reducer:{
      auth:authReducer,
      note:noteReducer
   }
})