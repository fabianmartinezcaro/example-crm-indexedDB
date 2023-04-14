import {nombre, correo, telefono, empresa} from './selectores.js';

const objCliente = {
    nombre: '',
    correo: '',
    telefono: '',
    empresa: ''
}

export function validarCliente(evento){
    evento.preventDefault();

    if(nombre === ''){
        console.log('Nombre vacío...')
    }

}