import UI from "./classes/UI.js";
import { DB } from "./db.js";
import { formulario, inputNombre, inputEmail, inputTelefono, inputEmpresa, listadoClientes } from "./selectores.js";

const ui = new UI();
let idCliente;

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
    idCliente = parametroURL.get('id');
    if(idCliente){
        setTimeout(() => {
            obtenerRegistro(idCliente)
        }, 100);
    }

}

export function eliminarCliente(evento){
    if(evento.target.classList.contains('eliminar')){
        const idEliminar = Number(evento.target.dataset.cliente);
        const confirmar = confirm('¿Está seguro de que desea eliminar este cliente?');
        if(confirmar){

            const transaction = DB.transaction(['clientes'], 'readwrite');
            const objectStore = transaction.objectStore('clientes');

            objectStore.delete(idEliminar);

            transaction.oncomplete = function () {
                evento.target.parentElement.parentElement.remove();
                console.log('Cliente eliminado...')
            }

            transaction.onerror = function (evento) {
                console.log('No se pudo eliminar el cliente | ERROR: ', evento);
            }

        }
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
            }

        }

    }

}

// Obtengo al cliente desde la base de datos para cargar nuevamente los datos al DOM con llenarFormulario()
function obtenerRegistro(id){

    const transaction = DB.transaction(['clientes'], 'readwrite');
    const objectStore = transaction.objectStore('clientes');

    const cliente = objectStore.openCursor();
    cliente.onsuccess = function (evento) {
        const cursor = evento.target.result;
        if(cursor){
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

export function actualizarCliente (evento) {
    evento.preventDefault();
    
    if(inputNombre.value === '' || inputEmail.value === '' || inputTelefono.value === '' || inputEmpresa.value === ''){
        ui.mostrarAlerta(formulario, 'Los campos son obligatorios.', 'error')
        return;
    }
    
    const clienteActualizado = {
        nombre: inputNombre.value,
        email: inputEmail.value,
        telefono: inputTelefono.value,
        empresa: inputEmpresa.value,
        id: Number(idCliente)
    }

    console.log(clienteActualizado);

    const transaction = DB.transaction(['clientes'], 'readwrite');
    const objectStore = transaction.objectStore('clientes');
    objectStore.put(clienteActualizado);

    transaction.oncomplete = function () {
        ui.mostrarAlerta(formulario, 'Cliente actualizado correctamente!', 'correcto')
    }

    transaction.onerror = function () {
        ui.mostrarAlerta(formulario, 'No se ha podido editar correctamente, intente nuevamente...', 'error');
    }

}

