import { Router } from "express";
import { actulizarUsuario, 
    crearUsuario, 
    eliminarUsuario, 
    mostrarUsuario,
    loginUsuario, 
    listarUsuario} from "../controllers/controllers.usuario.js";
import { validarPermiso } from "../middlewares/middleware.usuario.js";

const rutaUsuario = Router();

rutaUsuario.post("/usuario", validarPermiso,crearUsuario);
rutaUsuario.get("/usuario/:id", mostrarUsuario)
rutaUsuario.get("/usuario", listarUsuario)
rutaUsuario.post("/login", loginUsuario);
rutaUsuario.put("/usuario", validarPermiso,actulizarUsuario);
rutaUsuario.delete("/usuario", validarPermiso,eliminarUsuario);

export default rutaUsuario;


