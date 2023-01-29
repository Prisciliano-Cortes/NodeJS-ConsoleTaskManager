require('colors');
const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { inquirerMenu, pausa, leerInput, listadoTareasBorrar, confirmar, mostrarListadoCheckList } = require('./helpers/inquirer');
const Tareas = require('./models/tareas');
console.clear();

const main = async() => {

    let opt = '';
    const tareas = new Tareas();

    const tareasDB = leerDB();

    if(tareasDB) {
        // Establecer las tareas
        tareas.cargarTareasFomArray( tareasDB )
    }

    await pausa()

    do {
        // Imprime el menú
        opt = await inquirerMenu();
        
        switch (opt) {
            case '1':
                const desc = await leerInput('Descripción: ');
                tareas.crearTarea(desc)
            break;
        
            case '2':
                tareas.listadoCompleto();
            break;

            case '3': //* Listar completadas
                tareas.listarPendientesCompletadas(true)
            break;
            case '4': //* Listar pendientes
                tareas.listarPendientesCompletadas(false)
            break;
            case '5': //* Completado | pendiente
                const ids = await mostrarListadoCheckList( tareas.listadoArr );
                tareas.toggleCompletadas(ids)
            break;
            case '6': //* Borrar tarea
                const id = await listadoTareasBorrar( tareas.listadoArr )
                // TODO: Confirmación eliminar
                if (id !== '0') {
                    const ok = confirmar('¿Estás seguro?');
                    if (ok) {
                        tareas.borrarTarea(id)
                        console.log('Tarea borrada correctamente')
                    }
                }
            break;
        }

        guardarDB( tareas.listadoArr )

        await pausa();

    } while ( opt !== '0' );

}

main();