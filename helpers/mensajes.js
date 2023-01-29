require('colors');

const monstrarMenu = () => {

    return new Promise( ( resolve ) => {
        console.clear();
    
        console.log('========================'.green);
        console.log('Seleccione una opción'.green);
        console.log('========================\n'.green);
    
        console.log(`${ '1.'.yellow } Crear nueva tarea`);
        console.log(`${ '2.'.yellow } Listar tareas`);
        console.log(`${ '3.'.yellow } Listar tareas completadas`);
        console.log(`${ '4.'.yellow } Listar tareas pendientes`);
        console.log(`${ '5.'.yellow } Completar tareas`);
        console.log(`${ '6.'.yellow } Borrar una tarea`);
        console.log(`${ '0.'.yellow } Salir \n`);
    
        const readline = require('readline').createInterface({ 
            input: process.stdin, 
            output: process.stdout 
        });

        readline.question('Seleccione una opción: ', (opcion) => {

            readline.close();
            resolve(opcion);

        });

    });
}

const pausa = () => {
    return new Promise( ( resolve ) => {
        const readline = require('readline').createInterface({ 
            input: process.stdin, 
            output: process.stdout 
        });
    
        readline.question(`\nPresione ${'ENTER'.red} para continuar\n`, () => {
            readline.close();
            resolve();
        });
    });
}

module.exports = {
    monstrarMenu,
    pausa
}