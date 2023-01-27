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
const taskForm = document.getElementById("task-form");
const tasksContainer = document.getElementById("tasks-container"); //ES LA FUNCIÓN QUE GENERARÁ LA VENTANA DE ELEMENTOS EN BASE DE DATOS DONDE SE HA COLCAOD ESE ID EN EL HTML
const historialContainer = document.getElementById("historial-container");

const profilePill = document.getElementById("perfil");
const totalFolios  =document.getElementById("total-folios");
const abiertosFolios = document.getElementById("abiertos-folios");
let ultimoFolio = 0;

//  OBTENER EL ÚLTIMO FOLIO
GetUtil((querySnapshot) => { 
  querySnapshot.forEach((doc) => {
    const folio = doc.data(); //Por cada documento que recorra, queremos ver los datos obtenidos
    if (folio.ultFolio){
      ultimoFolio = folio.ultFolio;
      console.log( "Folio Registrado 1:",ultimoFolio) 
      }
    })
  });


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
    tasksContainer.innerHTML = "";  //REINICIA LA TARJETA QUE MUESTRA DATOS ANTES DE COLOCAR LA ACTUALIZACIÓN DE DATOS
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
      if (task.estado != "rechazado" && task.estado != "asignado" ){
        tasksContainer.innerHTML += `  
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
        //con task.title obtiene los valres que están así guardados desde el DOC.data hecho que se guarda en la variable task

      }
      
    });





    //RECHAZAR --------------- 
    /* CÓDIGO PARA MODAL RECHAZAR*/
    const btnsOpenModal = tasksContainer.querySelectorAll('.active-modal');
    const modal = document.querySelector('.modal');
    const btnsCloseModal = document.querySelectorAll('.modal_x');

    var btnToDelete; /* Variable global que permite tener a la mano un elemento con
    el ID del taskcontainer con el que se interactuó*/

    btnsOpenModal.forEach((btn) =>
      btn.addEventListener('click', (e)=>{
        e.preventDefault();

        modal.classList.add('modal--show');
        btnToDelete = btn.dataset.id; /*Variable global*/
        })
    );

    btnsCloseModal.forEach((btn2) =>
        btn2.addEventListener('click',  (e) => {
          e.preventDefault();

          modal.classList.remove('modal--show');
        })
    );
    

    //CLICK AL BOTÓN DE RECHAZAR Y ENTREGAR FORMULARIO
    const btnrechazarForm = document.getElementById('btn-rechazar-form');
    const rechazarForm = document.getElementById("rechazar-form");
    const timestamp1 = Date.now();
    const fechaRech = new Date(timestamp1);

    btnrechazarForm.addEventListener("click", async (e) =>{
      e.preventDefault();
      try {
        const RechazarIdAgente = rechazarForm["rechazar-id"];
        const RechazarRazon = rechazarForm["rechazar-razon"];
        
        await updateTask(btnToDelete, {  /*Categoriza
        como rechazado el task y añade al expediente la información nueva*/
          estado: "rechazado",
          FechaRechazado: fechaRech, 
          RechazadoIdAgente: RechazarIdAgente.value,
          RechazadoRazon: RechazarRazon.value,
        });
        
        rechazarForm.reset(); //Vacias los inputs una vez que se ha guardado la información
        modal.classList.remove('modal--show');
        btnToDelete = "";
        
        //ENVIAR CORREO DE AVISO
        

        } catch (error) {
          console.log(error);
        }

    });






    
    //ASIGNAR --------------- 
    /* CÓDIGO PARA MODAL ASIGNAR*/
    const btnsOpenModalAsig = tasksContainer.querySelectorAll('.active-modalAsig');
    const modalAsig = document.querySelector('.modalAsig');
    const btnsCloseModalAsig = document.querySelectorAll('.modal_xAsig');

    var btnToAssign; /*Variable global de taskcontainer usado al asignar*/

    btnsOpenModalAsig.forEach((btn3) =>
      btn3.addEventListener('click', (e)=>{
        e.preventDefault();

        btnToAssign = btn3.dataset.id; /*Variable global*/
        modalAsig.classList.add('modal--showAsig');
        })
    );

    btnsCloseModalAsig.forEach((btn4) =>
      btn4.addEventListener('click', (e) => {
        e.preventDefault();

        modalAsig.classList.remove('modal--showAsig');
        console.log(btnToAssign)
      })
      );

    //CLICK AL BOTÓN DE ASIGNAR Y ENTREGAR FORMULARIO
    const btnasginarForm = document.getElementById('btn-asignar-form');
    const asignarForm = document.getElementById("asignar-form");
    const timestamp = Date.now();
    const fechaAsig = (new Date(timestamp)).toString();

    btnasginarForm.addEventListener("click", async (e) =>{
      e.preventDefault();
      try {
        const AsignarArea = asignarForm["asignar-area"]
        const AsignarIdAgente = asignarForm["asignar-id"];
        const AsignarComments = asignarForm["asignar-comments"];
        const nuevoFolio = ultimoFolio++;
        console.log("Folio que se registra:", nuevoFolio)
        
        await updateTask(btnToAssign, {  /*Categoriza
        como rechazado el task y añade al expediente la información nueva*/
          estado: "asignado",
          FechaAsignado: fechaAsig, 
          AsignarArea: AsignarArea.value,
          AsignarIdAgente: AsignarIdAgente.value,
          AsignarComments: AsignarComments.value,
          folio: nuevoFolio,
        });
        asignarForm.reset(); //Vacias los inputs una vez que se ha guardado la información
        modalAsig.classList.remove('modal--showAsig');
        btnToAssign = "";

        await updateFolio({ultFolio: nuevoFolio}) //Actualiza el valor del último folio que se tiene

      } catch (error) {
        console.log(error);
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

