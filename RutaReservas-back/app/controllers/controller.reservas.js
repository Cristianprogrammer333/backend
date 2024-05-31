import { pool } from "../../config/db_mysql.js";
import { tokenSing } from "../middlewares/middleware.reserva.js";

export const CrearReserva = async(req, res) =>{
    let info = req.body;
    try {
        let resultado = await pool.query(`
        insert into reservass (
            ID_Reserva,
            ID_Vuelo,
            ID_Pasajero,
            FechaReserva,
            EstadoReserva,
            AsientoAsignado,
            PrecioTotal
        )values(${info.ID_Reserva}, ${info.ID_Vuelo}, ${info.ID_Pasajero}, '${info.FechaReserva}', '${info.EstadoReserva}', '${info.AsientoAsignado}', ${info.PrecioTotal})
        `)
        if(resultado[0].affectedRows > 0){
            res.json({
                "respuesta":"Reserva creada correctamente"
            });
        }else{
            res.json({
                "respuesta": "Reserva creada incorrectamente"
            });
        }
    } catch (error) {
        res.json({
            "error": error,
            "method": "post"
        });
    }
}

export const MostrarReserva = async(req, res) =>{
    let id = req.params.id;
    try {
        const resultado = await pool.query(`select * from reservass where ID_Reserva = ${id}`);
        // console.log(resultado[0]);
        res.json(resultado[0]);
    } catch (error) {
        res.json({
            "error": error,
            "method": "get"
        });
    }
};

export const ActualizarReserva = async(req, res) =>{
    let info = req.body;
    try {
        let resultado = await pool.query(`
        update reservass
        set
        ID_Reserva = ${info.ID_Reserva},
        ID_Vuelo = ${info.ID_Vuelo},
        ID_Pasajero = ${info.ID_Pasajero},
        FechaReserva = '${info.FechaReserva}',
        EstadoReserva = '${info.EstadoReserva}',
        AsientoAsignado = '${info.AsientoAsignado}',
        PrecioTotal = ${info.PrecioTotal}
        where  ID_Reserva = ${info.ID_Reserva}
        `);
        if(resultado[0].affectedRows > 0){
            res.json({
                "respuesta":"La reserva a sido actualizada correctamente",
            });
        }else{
            res.json({
                "respuesta": "La reserva no podido actualizarse",
            });
        }
    } catch (error) {
        res.json({
            "error": error,
            "method": "put"
        });
    }
}

export const EliminarReserva = async(req, res) =>{
    let info = req.body;
    try {
        let resultado = await pool.query(`
        delete from reservass
        where ID_Reserva = ${info.ID_Reserva}
        `);

        if (resultado[0].affectedRows > 0) {
            res.json({
                "respuesta": "Reserva eliminada correctamente",
            });
        } else {
            res.json({
                "respuesta": "No se pudo Eliminar la reserva",
            });
        }
    } catch (error) {
        res.json({
            "error": error,
            "method": "delete"
        });
    }
}

export const VerificarReserva = async(req, res) => {
    let ID_Reserva = req.body.ID_Reserva;
    let ID_Vuelo = req.body.ID_Vuelo;
    try {
        let resultado = await pool.query(`
        select ID_Reserva from reservass
        where ID_Reserva = '${ID_Reserva}' and ID_Vuelo = '${ID_Vuelo}'
        `);

        if(resultado[0]==""){
            res.json({
                respuesta:"Verificación incorrecta",
                estado: false
            });
        }else{
            let token = tokenSing({
                ID_Reserva:ID_Reserva,
                ID_Vuelo:ID_Vuelo
            });
            res.json({
                "respuesta": "Verificación correcta",
                "estado": true,
                token:token
            });
        }
    } catch (error) {
        res.json({
            respuesta: "Error al verificarse",
            type: error
        });
    }
}

export const ListarReservas = async(req, res) =>{

    try {
        const resultado = await pool.query("select * from reservass");
        res.json(resultado[0]);

    } catch (error) {
        res.json({
            "error": error,
            "method": get
        });
        
    };
};

