import { pool } from "../config/db_mysql.js";
import bcrypt from "bcrypt";
// import { tokenSing } from "../middlewares/middleware.usuario.js";

export const crearUsuario = async(req, res)=>{
    const { identificacion, nombre, correo, contrasena, telefono } = req.body;

    try {
        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(contrasena, 10);

        // Guardar el usuario con la contraseña encriptada y otros campos
        await pool.query(`
            INSERT INTO usuarios (identificacion, nombre, correo, contrasena, telefono)
            VALUES (?, ?, ?, ?, ?)
        `, [identificacion, nombre, correo, hashedPassword, telefono]);

        res.json({
            respuesta: "Usuario registrado correctamente",
            estado: true
        });
    } catch (error) {
        res.json({
            respuesta: "Error en el registro",
            type: error
        });
    }

}
export const mostrarUsuario = async(req, res)=>{

    let id = req.params.id;

    try {

        const resultado = await pool.query(`select * from usuarios`);
        res.json(resultado[0]);

    } catch (error) {
        res.json({
            "error":error,
            "method": "get"
        })
    }

}
export const actulizarUsuario = async(req, res)=>{

    let info = req.body;

    try {
        let resultado = await pool.query(`
            update usuarios
            set 
            identificacion = '${info.identificacion}',
            nombre = '${info.nombre}',
            correo = '${info.correo}',
            contrasena = '${info.contrasena}',
            telefono = '${info.telefono}'
            where idusuario = ${info.idusuario}
        `)

        if (resultado[0].affectedRows > 0 ){
            res.json({
                respuesta:"registro modificado"
            })
        }else{
            res.json({
                respuesta:"No modifico nada"
            })
        }
        
    } catch (error) {
        res.json({
            "error":error,
            "method": "put"
        })
    }

}
export const eliminarUsuario = async(req, res)=>{

    let info = req.body;

    try {
        let resultado = await pool.query(`
            delete from usuarios
            where idusuario = ${info.idusuario}
        `)

        if (resultado[0].affectedRows > 0 ){
            res.json({
                respuesta:"registro borrado"
            })
        }else{
            res.json({
                respuesta:"No borro nada"
            })
        }
        
    } catch (error) {
        res.json({
            "error":error,
            "method": "delete"
        })
    }

}


