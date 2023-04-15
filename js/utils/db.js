export let DB;

export function creardbClientes(){

    const dbClientes = window.indexedDB.open('dbClientes', 1);

    dbClientes.onerror = function () {
        console.log('Ha ocurrido un error')
    }

    dbClientes.onsuccess = function () {
        DB = dbClientes.result;
        console.log(DB);
    }

    dbClientes.onupgradeneeded = function (evento) {
        
        const db = evento.target.result;
        console.log(db);

        const objectStore = db.createObjectStore('crm', {
            KeyPath: 'id',
            autoIncrement: true
        })
        
        objectStore.createIndex('nombre', 'nombre', {unique: false})
        objectStore.createIndex('correo', 'correo', {unique: true})
        objectStore.createIndex('telefono', 'telefono', {unique: false})
        objectStore.createIndex('empresa', 'empresa', {unique: false})
        objectStore.createIndex('id', 'id', {unique: true})

        console.log('DB creada correctamente!')

    }

}


export function conectarDB(){
    const conectarDB = window.indexedDB.open('crm', 1);

    conectarDB.onerror = function () {
        console.log('Hubo un error');
    }

    conectarDB.onsuccess = function () {
        DB = conectarDB.result;
        console.log(DB)
    }

}