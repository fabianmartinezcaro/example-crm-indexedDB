import {creardbClientes} from './db.js'
import { eliminarCliente, obtenerClientes } from './funciones.js';
import { listadoClientes } from './selectores.js';

(function () {

    document.addEventListener('DOMContentLoaded', () => {
        creardbClientes();
    })

    if(window.indexedDB.open('dbClientes', 1)){
        obtenerClientes();
    }

    listadoClientes.addEventListener('click', eliminarCliente);

})()