import {conectarDB} from './db.js'
import { formulario } from './selectores.js';
import { validarCliente } from './funciones.js'

(function(){

    document.addEventListener('DOMContentLoaded', () => {
        conectarDB();
        formulario.addEventListener('submit', validarCliente)
    })

})()