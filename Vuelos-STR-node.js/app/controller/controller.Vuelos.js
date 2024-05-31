import { pool } from "../config/db_mysql.js";
import { TokenSing } from "../middlewares/middlewares.js";

export const CrearVuelo = async(req, res) => {
  let info = req.body;
  try {
    let resultado = await pool.query(`
        insert into vuelos(
            ID_Vuelo,
            NumeroVuelo,
            ID_Aerolinea,
            Origen,
            Destino,
            FechaHoraSalida,
            FechaHoraLlegada,
            CapacidadPasajeros,
            Precio,
            Disponibles
        ) values 
        (
            ${info.ID_Vuelo}, 
            '${info.NumeroVuelo}', 
            ${info.ID_Aerolinea}, 
            '${info.Origen}', 
            '${info.Destino}', 
            '${info.FechaHoraSalida}', 
            '${info.FechaHoraLlegada}', 
            ${info.CapacidadPasajeros},
            ${info.Precio},
            '${info.Disponibles}'
        )
        `);

    if (resultado[0].affectedRows > 0) {
      res.json({
        respuesta: "El registro ah sido insertado correctamente",
      });
    } else {
      res.json({
        respuesta: "El registro no a sido insertado correctamente",
      });
    }
  } catch (error) {
    res.json({
      error: error,
      method: "post",
    });
  }
};

export const MostrarVuelo = async (req, res) => {
  let id = req.params.id;
  try {
    let resultado = await pool.query(
      `select * from vuelos  where  ID_Vuelo = ${id}`
    );
    res.json(resultado[0]);
  } catch (error) {
    res.json({
      error: error,
      method: "get",
    });
  }
};

export const ActualizarVuelo = async (req, res) => {
  let info = req.body;

  try {
    let resultado = await pool.query(`
        update vuelos
        set
        ID_Vuelo = ${info.ID_Vuelo},
        NumeroVuelo = '${info.NumeroVuelo}',
        ID_Aerolinea = ${info.ID_Aerolinea},
        Origen = '${info.Origen}',
        Destino = '${info.Destino}',
        FechaHoraSalida = '${info.FechaHoraSalida}',
        FechaHoraLlegada = '${info.FechaHoraLlegada}',
        CapacidadPasajeros = ${info.CapacidadPasajeros},
        Precio = '${info.Precio}',
        Disponibles = '${info.Disponibles}'
        where ID_Vuelo = ${info.ID_Vuelo}
        `);
    if (resultado[0].affectedRows > 0) {
      res.json({
        respuesta: "Registro Modificado",
      });
    } else {
      res.json({
        respuesta: "Registro no modificado, hay un error",
      });
    }
  } catch (error) {
    res.json({
      error: error,
      method: "put",
    });
  }
}

export const EliminarVuelo = async(req, res) =>{
    let info = req.body;
    try {
        let resultado = await pool.query(`
        delete from vuelos
        where idVuelo = ${info.idVuelo}
        `);

        if(resultado[0].affectedRows > 0) {
            res.json({
                respuesta: "Registro Eliminado correctamente"
            })
        }else{
            res.json({
                respuesta:"Hubo un error al elimar el registro"
            })
        }
    } catch (error) {
        res.json({
            "error": error,
            "method": "delete"
        })
    }
}

export const VueloConfig = async(req, res) =>{
  let Origen = req.body.Origen;
  let Destino = req.body.Destino;

  try {
    let resultado = await pool.query(`
    select Origen from vuelos
    where Origen = '${Origen}' and Destino = '${Destino}'
    `);
    if(resultado[0]==""){
      res.json({
        Respuesta: "Los Datos ingresados son incorrectos",
        estado: false
      });
    }else{
      let token = TokenSing({
        Origen:Origen,
        Destino:Destino
      })
      res.json({
        respuesta: "Los datos ingresados son correctos",
        estado: true,
        token:token
      });
    }
  } catch (error) {
    res.json({
      respuesta: "Error al ingresar los datos",
      type:error
    });
  }
}

export const ListarVuelos = async(req, res) =>{
  try {
    const resultado = await pool.query("select * from vuelos");
    res.json(resultado[0]);
  } catch (error) {
    res.json({
      "error": error,
      "method": "get"
    });
  }
}