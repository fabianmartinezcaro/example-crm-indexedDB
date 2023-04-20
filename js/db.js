export let DB;

export function creardbClientes () {

    const dbClientes = window.indexedDB.open('dbClientes', 1);

    dbClientes.onerror = function () {
        console.log('Ha ocurrido un error');
    }

    dbClientes.onsuccess = function (evt) {
        console.log('Se ha creado correctamente!', evt);
        DB = dbClientes.result;
        console.log(DB);
    }

    dbClientes.onupgradeneeded = function (evento) {
        
        const db = evento.target.result;
        const objectStore = db.createObjectStore('clientes', {keyPath: 'id', autoIncrement: true});
        
        objectStore.createIndex('nombre', 'nombre', {unique: false});
        objectStore.createIndex('correo', 'correo', {unique: true});
        objectStore.createIndex('telefono', 'telefono', {unique: false});
        objectStore.createIndex('empresa', 'empresa', {unique: false});
        objectStore.createIndex('id', 'id', {unique: true});

        console.log('DB creada correctamente!');

    }

}


export function conectarDB () {

    const conectarDB = window.indexedDB.open('dbClientes', 1);

    conectarDB.onerror = function () {
        console.log('Hubo un error en la conexión...')
    }

    conectarDB.onsuccess = function () {
        DB = conectarDB.result;
        console.log('Se ha completado la conexión desde función ConectarDB()')
    }

}