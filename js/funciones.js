import {nombre, correo, telefono, empresa, formulario} from './selectores.js';
import UI from './classes/UI.js';

const ui = new UI();

const objCliente = {
    nombre: '',
    correo: '',
    telefono: '',
    empresa: ''
}

export function validarCliente(evento){
    evento.preventDefault();

    if(nombre.value === '' || correo.value === '' || telefono.value === '' || empresa.value === ''){
        ui.imprimirAlerta(formulario, 'Los campos son obligatorios.', 'error');
        return;
    }

    ui.imprimirAlerta(formulario, 'Se ha agregado un nuevo cliente!', 'correcto')

}

function agregarCliente(cliente){

}
