import UI from "./classes/UI.js";
import { conectarDB, DB } from "./db.js";
import { formulario } from "./selectores.js";

const ui = new UI();

export function validarCliente (evento) {
    evento.preventDefault();

    const nombre = document.querySelector('#nombre').value;
    const email = document.querySelector('#email').value;
    const telefono = document.querySelector('#telefono').value;
    const empresa = document.querySelector('#empresa').value;

    if(nombre === '' || email === '' || telefono === '' || empresa === ''){
        ui.mostrarAlerta(formulario, 'Todos los campos son obligatorios.', 'error');
        return;
    }

    const cliente = {nombre, email, telefono, empresa, id: Date.now()};

    agregarCliente(cliente);

}

function agregarCliente(cliente){
    console.log(cliente);
    conectarDB();
    const transaction = DB.transaction(['clientes'], 'readwrite');
    const objectStore = transaction.objectStore('clientes');

    objectStore.add(cliente);

    transaction.onerror = function () {
        console.log('No se pudo completar la transacción correctamente.');
    }

    transaction.oncomplete = function () {
        console.log('Cliente agregado!');
    }


}