export default class UI{

    imprimirAlerta(contenedor, mensaje, tipo){

        const divAlerta = document.createElement('P');
        let condicionCumplida = false;
    
        if(tipo === 'error'){
            divAlerta.classList.add('px-3', 'py-3', 'mt-3', 'bg-red-500', 'text-white');
            divAlerta.textContent = mensaje;
            contenedor.appendChild(divAlerta);
    
            condicionCumplida = true;
    
        }else{
            divAlerta.classList.add('px-3', 'py-3', 'mt-3', 'bg-green-500', 'text-white');
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