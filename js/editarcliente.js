import { conectarDB } from "./db.js";
import { editarCliente } from "./funciones.js"
import { formulario } from "./selectores.js";
import { actualizarCliente } from "./funciones.js";

(function(){

    document.addEventListener('DOMContentLoaded', () => {
        
        conectarDB();
        editarCliente();
        formulario.addEventListener('submit', actualizarCliente);
    
    })


})()