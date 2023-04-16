import {formulario} from './selectores.js';
import {DB, conectarDB} from './utils/db.js';
import UI from './classes/UI.js';

const ui = new UI();

export function validarCliente(evento){
    evento.preventDefault();

    const nombre = document.querySelector('#nombre').value;
    const correo = document.querySelector('#email').value;
    const telefono = document.querySelector('#telefono').value;
    const empresa = document.querySelector('#empresa').value;

    if(nombre.value === '' || correo.value === '' || telefono.value === '' || empresa.value === ''){
        ui.imprimirAlerta(formulario, 'Los campos son obligatorios.', 'error');
        return;
    }

    const objCliente = {nombre, correo, telefono, empresa};

    agregarCliente(objCliente);
    console.log(objCliente);
    ui.imprimirAlerta(formulario, 'Se ha agregado un nuevo cliente!', 'correcto');

}


function agregarCliente(clienteNuevo){
    conectarDB();
    const transaction = DB.transaction(['clientes'], 'readwrite');
    const objectStore = transaction.objectStore('clientes');

    transaction.onerror = function () {
        console.log('Error al crear la base de datos');
    }

    transaction.oncomplete = function() {
        console.log('Objeto agregado a la base de datos');
    };


    objectStore.add(clienteNuevo);

}
