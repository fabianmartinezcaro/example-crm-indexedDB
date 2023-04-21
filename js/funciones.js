import UI from "./classes/UI.js";
import { DB } from "./db.js";
import { formulario, listadoClientes } from "./selectores.js";

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

    const transaction = DB.transaction(['clientes'], 'readwrite');
    const objectStore = transaction.objectStore('clientes');

    objectStore.add(cliente);

    transaction.onerror = function () {
        console.log('No se pudo completar la transacción correctamente.');
    }

    transaction.oncomplete = function () {
        ui.mostrarAlerta(formulario, 'Cliente agregado!', 'correcto');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 3000);
    }

}

export function obtenerClientes(){
    const abrirConexion = window.indexedDB.open('dbClientes', 1);

    abrirConexion.onerror = function () {
        console.log('Hubo un error');
    }

    abrirConexion.onsuccess = function () {
        console.log('Se ha conectado correctamente!')
        let DB = abrirConexion.result;

        const objectStore = DB.transaction('clientes').objectStore('clientes');

        objectStore.openCursor().onsuccess = function (evento) {
            const cliente = evento.target.result;

            if(cliente){
                ui.mostrarCliente(cliente.value);
                cliente.continue();
            }else{
                console.log('No hay registros')
            }

        }
    }

}