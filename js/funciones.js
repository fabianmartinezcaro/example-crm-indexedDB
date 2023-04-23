import UI from "./classes/UI.js";
import { DB } from "./db.js";
import { formulario, nombre, email, telefono, empresa } from "./selectores.js";

const ui = new UI();

export function validarCliente (evento) {
    evento.preventDefault();

    if(nombre.value === '' || email.value === '' || telefono.value === '' || empresa.value === ''){
        ui.mostrarAlerta(formulario, 'Todos los campos son obligatorios.', 'error');
        return;
    }

    const cliente = {
        nombre: nombre.value, 
        email: email.value, 
        telefono: telefono.value, 
        empresa: empresa.value, 
        id: Date.now()
    };

    agregarCliente(cliente);

}

function agregarCliente(cliente){

    const transaction = DB.transaction(['clientes'], 'readwrite');
    console.log(DB)
    const objectStore = transaction.objectStore('clientes');

    objectStore.add(cliente);

    transaction.onerror = function () {
        console.log('No se pudo completar la transacción correctamente.');
    }

    transaction.oncomplete = function () {
        ui.mostrarAlerta(formulario, 'Cliente agregado!', 'correcto');
    }

}

export function editarCliente(){

    const parametroURL = new URLSearchParams(window.location.search);
    const idCliente = parametroURL.get('id');
    console.log(idCliente)

    const abrirConexion = window.indexedDB.open('dbClientes', 1);

    abrirConexion.onerror = function () {
        console.log('Hubo un error');
    }

    abrirConexion.onsuccess = function () {
        console.log('Se ha conectado correctamente!')
        let DB = abrirConexion.result;

        const objectStore = DB.transaction('clientes', 'readwrite').objectStore('clientes');


        objectStore.openCursor().onsuccess = function (evento) {
            const cliente = evento.target.result;
            
            console.log('ID INDEXED:', cliente.value.id)
            console.log('ID CLIENTE:', parseInt(idCliente))
            if(cliente.value.id === parseInt(idCliente)){
                const nombre = document.querySelector('#nombre').value;
                const email = document.querySelector('#email').value;
                const telefono = document.querySelector('#telefono').value;
                const empresa = document.querySelector('#empresa').value;

                cliente.update({nombre, email, telefono, empresa, id: cliente.value.id});
            }   

        }

    }
    
}

export function eliminarCliente(id){
    console.log('Eliminando...', id)
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
                return;
            }

        }

    }

}

function obtenerRegistro(id){
    console.log(id)
}

