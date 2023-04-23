import { DB } from "../db.js";
import { listadoClientes } from "../selectores.js";

export default class UI{

    mostrarCliente(cliente){
        
        const objectStore = DB.transaction('clientes').objectStore('clientes');

        objectStore.openCursor().onsuccess = function (evento) {

            const cursor = evento.target.result;

            if(cursor){

                const {nombre, email, telefono, empresa, id} = cliente;
                console.log('hello')
                listadoClientes.innerHTML += `<tr>
                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                        <p class="text-sm leading-5 font-medium text-gray-700 text-lg font-bold"> ${nombre} </p>
                        <p class="text-sm leading-10 text-gray-700"> ${email} </p>
                    </td>
                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 ">
                        <p class="text-gray-700">${telefono}</p>
                    </td>
                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200  leading-5 text-gray-700">    
                        <p class="text-gray-600">${empresa}</p>
                    </td>
                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5">
                        <a href="editar-cliente.html?id=${id}" class="text-teal-600 hover:text-teal-900 mr-5">Editar</a>
                        <a href="#" data-cliente="${id}" class="text-red-600 hover:text-red-900">Eliminar</a>
                    </td>
                </tr>
                `;
                
            }

        }

    }

    mostrarAlerta(contenedor, mensaje, tipo){

        let condicionCumplida = false;
        const divAlerta = document.createElement('DIV');
        divAlerta.textContent = mensaje;

        if(tipo === 'error'){
            divAlerta.classList.add('py-3', 'px-4', 'mt-4', 'text-white', 'bg-red-500');
            contenedor.appendChild(divAlerta);
            condicionCumplida = true;
        }else{
            divAlerta.classList.add('py-3', 'px-4', 'mt-4', 'text-white', 'bg-green-500');
            contenedor.appendChild(divAlerta);
            condicionCumplida = true;
        }

        if(condicionCumplida){
            setTimeout(() => {
                divAlerta.remove();
            }, 3000);
        }

    }

    limpiarHTML(){
        while(listadoClientes.firstChild){
            listadoClientes.removeChild(listadoClientes.firstChild);
        }
    }

}