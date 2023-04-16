import { listadoClientes } from "../selectores.js";
import {DB} from "../utils/db.js";

export default class UI{

    // mostrarClientes(){

    //     const objectStore = DB.transaction('crm').objectStore('crm');

    //     objectStore.openCursor().onsuccess = function (evento){

    //         const cursor = evento.target.result;

    //         if(cursor){
    //             const {nombre, correo, telefono, empresa} = cursor.value;
    //             console.log(nombre);

    //             const itemCliente = document.createElement('div');
    //             itemCliente.innerHTML = `
    //             <tr>
    //                 <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
    //                     <p class="text-sm leading-5 font-medium text-gray-700 text-lg  font-bold"> ${nombre} </p>
    //                     <p class="text-sm leading-10 text-gray-700"> ${correo} </p>
    //                 </td>
    //                 <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 ">
    //                     <p class="text-gray-700">${telefono}</p>
    //                 </td>
    //                 <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200  leading-5 text-gray-700">    
    //                     <p class="text-gray-600">${empresa}</p>
    //                 </td>
    //                 <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5">
    //                     <a href="editar-cliente.html?id=${id}" class="text-teal-600 hover:text-teal-900 mr-5">Editar</a>
    //                     <a href="#" data-cliente="${id}" class="text-red-600 hover:text-red-900">Eliminar</a>
    //                 </td>
    //             </tr>
    //             `

    //         }

    //     }
    // }

    imprimirAlerta(contenedor, mensaje, tipo){

        const alerta = document.querySelector('.alerta')

        if(!alerta){
            const divAlerta = document.createElement('P');
            divAlerta.classList.add('max-w-lg', 'border', 'alerta')
            let condicionCumplida = false;
        
            if(tipo === 'error'){
                divAlerta.classList.add('px-3', 'py-3', 'mt-3', 'bg-red-200', 'border-red-700', 'text-red-700');
                divAlerta.textContent = mensaje;
                contenedor.appendChild(divAlerta);
        
                condicionCumplida = true;
        
            }else{
                divAlerta.classList.add('px-3', 'py-3', 'mt-3', 'bg-green-200', 'border-green-700', 'text-green-700');
                divAlerta.textContent = mensaje;
                contenedor.appendChild(divAlerta);
        
                condicionCumplida = true;
        
            }
        
            if(condicionCumplida){
                setTimeout(() => {
                    divAlerta.remove();
                }, 2500);
            }
        }
    
    }

    limpiarHTML(){
        while(listadoClientes.firstChild){
            listadoClientes.removeChild(listadoClientes.firstChild);
        }
    }

}