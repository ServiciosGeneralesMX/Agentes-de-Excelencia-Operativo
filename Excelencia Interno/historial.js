//https://www.youtube.com/watch?v=itNsRn1kjLU

import {
    onGetTasks,
    saveTask,
    deleteTask,
    getTask,
    updateTask,
    getTasks,
    GetUtil,
    updateFolio,
} from "./firebase.js";
// ELEMENTS FROM DOC
const taskForm = document.getElementById("task-form");
const historialContainer = document.getElementById("historial-container");


const profilePill = document.getElementById("perfil");
const totalFolios  =document.getElementById("total-folios");
const abiertosFolios = document.getElementById("abiertos-folios");

//FILTER BUTTONS
let fitlroForm = document.getElementById("filtro-form")

let filtroLimpiar = document.getElementById("filtro-limpiar");
let filtroTodos = document.getElementById("filtro-todos");
let filtroAbiertos = document.getElementById("filtro-abiertos");
let filtroCerrados = document.getElementById("filtro-cerrados");
let filtroRechazados = document.getElementById("filtro-rechazados");


//FILTERS OF FOLIOS
fitlroForm.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("escuchando  a FORMULARIO")
    historialContainer.innerHTML = ``;



    filtroTodos.addEventListener("click", async (e) => {
        e.preventDefault();
        console.log("escuchando  a TODOS")
        historialContainer.innerHTML = ``;
        try {
            await onGetTasks((querySnapshot) => {
            querySnapshot.forEach((doc) => { //FireBase llama Query Snapshot a objetos que se pueden recorrer. FOR EACH es para REVISAR LOS DATOS 1 A 1
            const task = doc.data(); 
            if (task.folio){}else {task.folio="na"};
            if (task.estado){}else {task.estado="Pendiente"};
            if (task.AsignarArea){}else {task.AsignarArea="na"};
            historialContainer.innerHTML += `  
                    <div class="card margin-top">
                        <h3 class="contenedor__titulo-a margin-top" >${task.title}</h3>
                        <div class="date_position">  ${task.fecha} </div>
        
                        <div class="layout">
                            <div class="grow1">
                                <p> <span>- Descripción:</span> ${task.description}</p>
                                <p> <span>- Ubicación:</span> ${task.location}</p>
                                <p> <span>- Contacto:</span> ${task.contact}</p>
                            </div>
                            <div>
                                <p> <span>- Folio: </span> ${task.folio}</p>
                                <p> <span>- Estado: </span> ${task.estado}</p>
                                <p> <span>- Área:</span> ${task.AsignarArea}</p>
                            </div>

                        </div>
                    </div>`;
            });
            });
        } catch (error) { console.log(error); } 
});
/*     const obj = {a: 2, b: 4, c: 13};

const values = Object.values(obj);
console.log(values); // 👉️ [2, 4, 13]

const result = values.filter(num => num % 2 === 0);
console.log(result); // 👉️ [2, 4] */
    filtroAbiertos.addEventListener("click", async (e) => {
        e.preventDefault();
        console.log("escuchando  a ABIERTOS")
        try {

            await onGetTasks((querySnapshot) => {
            querySnapshot.forEach((doc) => { //FireBase llama Query Snapshot a objetos que se pueden recorrer. FOR EACH es para REVISAR LOS DATOS 1 A 1
            const task = doc.data(); 
            if(task.estado !== "rechazado" ){
                if( task.estado !== "cerrado"){
                    if (task.folio){}else {task.folio="na"};
                    if (task.estado){}else {task.estado="Pendiente"};
                    if (task.AsignarArea){}else {task.AsignarArea="na"};

                    historialContainer.innerHTML += `  
                        <div class="card margin-top">
                            <h3 class="contenedor__titulo-a margin-top" >${task.title}</h3>
                            <div class="date_position">  ${task.fecha} </div>
            
                            <div class="layout">
                                <div class="grow1">
                                    <p> <span>- Descripción:</span> ${task.description}</p>
                                    <p> <span>- Ubicación:</span> ${task.location}</p>
                                    <p> <span>- Contacto:</span> ${task.contact}</p>
                                </div>
                                <div>
                                    <p> <span>- Folio: </span> ${task.folio}</p>
                                    <p> <span>- Estado: </span> ${task.estado}</p>
                                    <p> <span>- Área:</span> ${task.AsignarArea}</p>
                                </div>
                            </div>
                        </div>`;

            }}
            }); });
            } catch (error) { console.log(error); } 

    }); 

    filtroCerrados.addEventListener("click", async (e) => {
        e.preventDefault();
        console.log("escuchando  a Cerrados")
        try {

            await onGetTasks((querySnapshot) => {
            querySnapshot.forEach((doc) => { //FireBase llama Query Snapshot a objetos que se pueden recorrer. FOR EACH es para REVISAR LOS DATOS 1 A 1
            const task = doc.data(); 
            if(task.estado === "cerrado" ){
                    if (task.folio){}else {task.folio="na"};
                    if (task.estado){}else {task.estado="Pendiente"};
                    if (task.AsignarArea){}else {task.AsignarArea="na"};

                    historialContainer.innerHTML += `  
                        <div class="card margin-top">
                            <h3 class="contenedor__titulo-a margin-top" >${task.title}</h3>
                            <div class="date_position">  ${task.fecha} </div>
            
                            <div class="layout">
                                <div class="grow1">
                                    <p> <span>- Descripción:</span> ${task.description}</p>
                                    <p> <span>- Ubicación:</span> ${task.location}</p>
                                    <p> <span>- Contacto:</span> ${task.contact}</p>
                                </div>
                                <div>
                                    <p> <span>- Folio: </span> ${task.folio}</p>
                                    <p> <span>- Estado: </span> ${task.estado}</p>
                                    <p> <span>- Área:</span> ${task.AsignarArea}</p>
                                </div>
                            </div>
                        </div>`;
            }
            }); });
            } catch (error) { console.log(error); } 
        });



    filtroRechazados.addEventListener("click", async (e) => {
        e.preventDefault();
        console.log("escuchando  a Rechazados")
        try {
            await onGetTasks((querySnapshot) => {
            querySnapshot.forEach((doc) => { //FireBase llama Query Snapshot a objetos que se pueden recorrer. FOR EACH es para REVISAR LOS DATOS 1 A 1
            const task = doc.data(); 
            if(task.estado === "rechazado" ){
                    if (task.folio){}else {task.folio="na"};
                    if (task.estado){}else {task.estado="Pendiente"};
                    if (task.AsignarArea){}else {task.AsignarArea="na"};

                    historialContainer.innerHTML += `  
                        <div class="card margin-top">
                            <h3 class="contenedor__titulo-a margin-top" >${task.title}</h3>
                            <div class="date_position">  ${task.fecha} </div>
            
                            <div class="layout">
                                <div class="grow1">
                                    <p> <span>- Descripción:</span> ${task.description}</p>
                                    <p> <span>- Ubicación:</span> ${task.location}</p>
                                    <p> <span>- Contacto:</span> ${task.contact}</p>
                                </div>
                                <div>
                                    <p> <span>- Folio: </span> ${task.folio}</p>
                                    <p> <span>- Estado: </span> ${task.estado}</p>
                                    <p> <span>- Área:</span> ${task.AsignarArea}</p>
                                </div>
                            </div>
                        </div>`;
            }
            }); });
            } catch (error) { console.log(error); } 

        });
});


filtroLimpiar.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("escuchando  a LIMPIAR")
    historialContainer.innerHTML += '';
        },false);




/* filtroTodos.addEventListener("click", async (e) => {
    e.preventDefault();
    historialContainer.innerHTML += "";

    try {
    console.log("escuchando  a Todos") 
    
    onGetTasks((querySnapshot) => {
    querySnapshot.forEach((doc) => { //FireBase llama Query Snapshot a objetos que se pueden recorrer. FOR EACH es para REVISAR LOS DATOS 1 A 1
    const task = doc.data(); 
    historialContainer.innerHTML += `  
            <div class="card margin-top">
                <h3 class="contenedor__titulo-a margin-top" >${task.title}</h3>
                <div class="date_position">  ${task.fecha} </div>

                <div class="layout">
                    <div class="grow1">
                        <p> <span>- Descripción:</span> ${task.description}</p>
                        <p> <span>- Ubicación:</span> ${task.location}</p>
                        <p> <span>- Contacto:</span> ${task.contact}</p>
                    </div>

                    <div class="btns-taskContainer">
                        <button class="btn btn-primary active-modal boton" data-id="${doc.id}">
                          Rechazar
                        </button>

                        <button class="btn btn-secondary active-modalAsig boton" data-id="${doc.id}">
                           Asignar
                        </button>
                    </div>
                </div>
            </div>`;
    });
    });
    } catch (error) { console.log(error); } 

filtroAbiertos.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("escuchando  a Abiertos")
    historialContainer.innerHTML += ``;

    });

filtroCerrados.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("escuchando  a Cerrados")
    });

filtroRechazados.addEventListener("click", (e) => {
    console.log("escuchando  a Rechazados")
    e.preventDefault();
    });
 }); */




// window.addEventListener("DOMContentLoaded", async (e) => { 
//     onGetTasks((querySnapshot) => {
//         querySnapshot.forEach((doc) => { //FireBase llama Query Snapshot a objetos que se pueden recorrer. FOR EACH es para REVISAR LOS DATOS 1 A 1
//             const task = doc.data(); 
//             historialContainer.innerHTML += ``;
//                 filtroTodos.addEventListener("click", (e) => {
//                     e.preventDefault();
                    
//                     if(FilTodos == false){ 
//                         historialContainer.innerHTML += `  
//                             <div class="card margin-top">
//                             <h3 class="contenedor__titulo-a margin-top" >${task.title}</h3>
//                             <div class="date_position">  ${task.fecha} </div>

//                             <div class="layout">
//                                 <div class="grow1">
//                                 <p> <span>- Descripción:</span> ${task.description}</p>
//                                 <p> <span>- Ubicación:</span> ${task.location}</p>
//                                 <p> <span>- Contacto:</span> ${task.contact}</p>
//                                 </div>

//                                 <div class="btns-taskContainer">
//                                 <button class="btn btn-primary active-modal boton" data-id="${doc.id}">
//                                     Rechazar
//                                 </button>

//                                 <button class="btn btn-secondary active-modalAsig boton" data-id="${doc.id}">
//                                     Asignar
//                                 </button>
//                                 </div>

//                             </div>
//                             </div>`;
//                         FilTodos = true; 
//                     } else{ 
//                         historialContainer.innerHTML += ``;
//                         FilTodos = false; 
//                     }

//                 });

//             console.log("escuchando  a Todos", FilTodos)
//         });

//         filtroAbiertos.addEventListener("click", (e) => {
//             e.preventDefault();
//             if(FilAbiertos == false){ FilAbiertos = true; } else{ FilAbiertos = false; }
//             console.log("escuchando  a Abiertos", FilAbiertos)
//         });

//         filtroCerrados.addEventListener("click", (e) => {
//             e.preventDefault();
//             if(FilCerrados == false){ FilCerrados = true; } else{ FilCerrados = false; }
//             console.log("escuchando  a Cerrados", FilCerrados)
//         });

//         filtroRechazados.addEventListener("click", (e) => {
//             e.preventDefault();
//             if(FilRechazados == false){ FilRechazados = true; } else{ FilRechazados = false; }
//             console.log("escuchando  a Rechazados", FilRechazados)
//         });
//     });
// }); //END OF DOMContentLoaded Window










let ultimoFolio = 0;

// OBTAIN LAST FOLIO REGISTERED IN DB
GetUtil((querySnapshot) => { 
querySnapshot.forEach((doc) => {
    const folio = doc.data(); //Por cada documento que recorra, queremos ver los datos obtenidos
    if (folio.ultFolio){
    ultimoFolio = folio.ultFolio;
    console.log( "Folio Registrado 1:",ultimoFolio) 
    }
    })
});
//ADD NEW ENTRANCES
taskForm.addEventListener("submit", async (e) => {  //AGREGAR NUEVAS ENTRADAS
e.preventDefault();
const nuevoFolio2 = ultimoFolio++;
console.log(nuevoFolio2)

const title = taskForm["task-title"];
const description = taskForm["task-description"];
const location = taskForm["task-location"];
const contact = taskForm["task-contact"];
const agent = taskForm["task-agent"];
const estado = "asignado";
const photo = taskForm["task-photo"];
const timestamp = Date.now();
const fechaAsig = (new Date(timestamp)).toString();

try {
    await saveTask(
    title.value, 
    description.value, 
    location.value, 
    contact.value,
    agent.value,
    fechaAsig,
    estado, 
    nuevoFolio2,
    ); //Se mandan todos los elementos obtenidos con .value directamente
} catch (error) {
console.log(error)};

taskForm.reset(); //Vacias los inputs una vez que se ha guardado la información
title.focus(); //regresar el cursor al título
console.log("folio que debe actualizar:", nuevoFolio2)
await updateFolio({ultFolio: nuevoFolio2})

});


//STADISTICS DEPLOYMENT
window.addEventListener("DOMContentLoaded", async (e) => { //Cuando se haya cargado la página, se ejecutará un evento
    let nombrePerfil;
    GetUtil((querySnapshot) => { 
        querySnapshot.forEach((doc) => {
        const perfil = doc.data(); //Por cada documento que recorra, queremos ver los datos obtenidos
        if (perfil.nombre){
            nombrePerfil = perfil.nombre;
            console.log( "Nombre usuario",nombrePerfil) 
            }
        })
        profilePill.innerHTML += `
        <h4>${nombrePerfil}</h4> 
        <img src="img/perfil-def.jpeg" alt="foto de perfil" class="profile-pic">
        `;
    });
    //DESPLIEGUE DE FOTO Y NOMBRE DE PERFIL

    onGetTasks((querySnapshot) => { //Este getTask se ve afectado por la función de "DOMContentLoaded", pues en cuanto carga
        //la página, obtiene los datos TAMBIÉN CUANDO SE ACTUALICE LA BASE DE DATOS
        totalFolios.innerHTML="";
        abiertosFolios.innerHTML="";
        var contadorFolios = 0;
        var contadorAbiertos = 0;

        querySnapshot.forEach((doc) => { //FireBase llama Query Snapshot a objetos que se pueden recorrer. FOR EACH es para REVISAR LOS DATOS 1 A 1
        const task = doc.data(); //Por cada documento que recorra, queremos ver los datos obtenidos
        contadorFolios ++;
        //Cargará esta estructura HTML fijada en el HTML donde se encuentre el ID = TaskContainer
        //Se colocan como string " " para que HTML lo interprete y lo añada
        if (task.estado != "cerrado" && task.estado != "rechazado" ){
            contadorAbiertos ++;
        }
        });
        totalFolios.innerHTML += `
        ${contadorFolios}
        `;
        abiertosFolios.innerHTML += `
        ${contadorAbiertos}
        `;
    });
}); //END OF DOMContentLoaded Window

