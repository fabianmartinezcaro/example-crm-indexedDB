export default class UI{

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

}