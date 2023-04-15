import { conectarDB } from './utils/db.js'
import { validarCliente } from './funciones.js';
import { formulario } from './selectores.js'

(function () {

    document.addEventListener('DOMContentLoaded', () => {
        conectarDB();
    })

    formulario.addEventListener('submit', validarCliente)


})();