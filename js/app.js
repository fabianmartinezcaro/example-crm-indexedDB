import {creardbClientes} from './db.js'
import { obtenerClientes } from './funciones.js';

(function () {

    document.addEventListener('DOMContentLoaded', () => {
        creardbClientes();
    })

    if(window.indexedDB.open('dbClientes', 1)){
        obtenerClientes();
    }

})()