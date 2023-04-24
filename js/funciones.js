import UI from "./classes/UI.js";
import { DB } from "./db.js";
import { formulario, inputNombre, inputEmail, inputTelefono, inputEmpresa } from "./selectores.js";

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

    console.log(cliente)
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
    }

}

export function editarCliente(){

    const parametroURL = new URLSearchParams(window.location.search);
    const idCliente = parametroURL.get('id');
    if(idCliente){
        setTimeout(() => {
            obtenerRegistro(idCliente)
        }, 100);
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
            }

        }

    }

}

function obtenerRegistro(id){

    const transaction = DB.transaction(['clientes'], 'readwrite');
    const objectStore = transaction.objectStore('clientes');

    const cliente = objectStore.openCursor();
    cliente.onsuccess = function (evento) {
        const cursor = evento.target.result;
        if(cursor){
            console.log(cursor.value)
            if(cursor.value.id === Number(id)){
                llenarFormulario(cursor.value);
            }
            cursor.continue();
        }
    }

}

function llenarFormulario(datos){
    const {nombre, email, telefono, empresa} = datos;

    inputNombre.value = nombre;
    inputEmail.value = email;
    inputTelefono.value = telefono;
    inputEmpresa.value = empresa;

}

