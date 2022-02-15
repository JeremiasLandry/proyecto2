'use strict';

const app = $('.app');

// Aplicacion que evalua el promedio de alumnos
window.addEventListener('hashchange',()=>{
	if(location.hash === "#/pages/materias.html"){
		app.html(`
		<div class="h1container">
			<h1>Materias</h1>
	  	</div>
	  	<!-- CARDS DE LAS MATERIAS -->
	 	<div class="row row-cols-1 row-cols-md-3 g-4 materiasContainer" id='cardsContainer'></div>`);

		const URLGET = "../data/materias.json";

		$(document).ready(() => { 
			$.get(URLGET, function (respuesta, estado) {
				if(estado === "success"){
					let misDatos = respuesta;
					for (const dato of misDatos) {
					$(".materiasContainer").prepend(`<div class="col">
															<div class="card h-100">
																<img src="${dato.imagen}" class="card-img-top" alt="${dato.alt}">
																<div class="card-body">
																	<h5 class="card-title">${dato.materia}</h5>
																</div>
															</div>
														</div>`);
					}  
				}
			});
		});

	}else if(location.hash === "#/pages/profesores.html"){
		app.html(`<div class="h1container">
					<h1>CONÓCE A LOS PROFESORES</h1>
				  </div>
				  <div class="row row-cols-1 row-cols-md-3 g-4 profesoresContainer" id='cardsContainer'></div>`);
		const URLGET = "../data/profesores.json";

		$(document).ready(() => { 
			$.get(URLGET, function (respuesta, estado) {
				if(estado === "success"){
				let misDatos = respuesta;
				for (const dato of misDatos) {
					$(".profesoresContainer").prepend(`
					<div class="col">
                  		<div class="card h-100">
                    		<img src="${dato.fotoUrl}" class="card-img-top" alt="...">
                    		<div class="card-body">
                      			<h5 class="card-title">${dato.nombre}</h5>
                      			<p class="card-text">${dato.materia}</p>
                   			</div>
                    		<div class="card-footer">
                      			<small class="text-muted">${dato.update}</small>
                    		</div>
                  		</div>
               		 </div>
					`);
							  }  
						  }
					  });
				  });
	}
})
//Lista que usaremos para almacenar a los alumnos
let listaAlumnos = [];

// 1.IMPRIMIMOS LO QUE TENEMOS GUARDADO EN EL LOCALSTORAGE
if (localStorage.getItem("listaAlumnos") === null){
	//SI NO HAY NADA GUARDADO, CARGAMOS USUARIOS POR DEFECTO PARA QUE POR LO MENOS SE VEA ALGO EN PANTALLA.
	$(document).ready(function(){
		$.getJSON("../data/users.json",function(respuesta, estado){
			if(estado === 'success'){
				let users = respuesta;
				for (const user of users){
					if (user.promedioFinal >= 7){
						$('.registroAlumnos').append(`<div>
														<div class='main'>
															<p class='previewUser'>${user.name} ${user.lastName}</p>
															<p class='previewResult'>aprobo con un promedio de ${user.promedioFinal}</p>
														</div><br>
													</div>`);
					}else{
						$('.registroAlumnos').append(`<div>
														<div class='main'>
															<p class='previewUser'>${user.name} ${user.lastName}</p>
															<p class='previewResult'>desaprobo con un promedio de ${user.promedioFinal}</p>
														</div><br>
													</div>`);
					}
				}
			}
		})
	});
}else{
	//SI EL LOCALSTORAGE TIENE KEYS GUARDADAS, LAS MOSTRAMOS EN PANTALLA
	
		let student = localStorage.getItem('listaAlumnos');
		let alumnoParse = JSON.parse(student)
		for (let alumno of alumnoParse){
			if (alumno.promedioFinal >= 7){
				$('.registroAlumnos').append(`<div>
												<div class='main'>
													<p class='previewUser'>${alumno.nombre} ${alumno.apellido}</p>
													<p class='previewResult'>aprobo con un promedio de ${alumno.promedioFinal}</p>
												</div><br>
											</div>`);
			}else{
				$('.registroAlumnos').append(`<div>
												<div class='main'>
													<p class='previewUser'>${alumno.nombre} ${alumno.apellido}</p>
													<p class='previewResult'>desaprobo con un promedio de ${alumno.promedioFinal}</p>
												</div><br>
											</div>`);
			}
		}
	
}

// 2.CLASE ALUMNO QUE VAMOS A UTILIZAR

class Alumno{
	constructor(nombre,apellido,edad,promedioFinal){
		this.nombre = nombre;
		this.apellido = apellido;
		this.edad = edad;
		this.promedioFinal = promedioFinal;
	}
}

// 3.LISTAS Y ESTADOS
let notaFinal = 0;
let materias = ['Matematica','Biologia','Quimica','Fisica','Historia','Geografia'];

//4.FUNCIONES 
           
        //4.1 Calcula el promedio de las notas del alumno en todas las materias
function Promedio(nota){
	let cantidad = materias.length;
	return nota / cantidad;
}

		//4.2 Funcion que crea el modal con el form para registrar a un alumno
function Modal(){
	$('body').prepend(`<div class="modalContainer">
							<div class='modal'>
								<form>
									<p class='tituloModal'>INGRESE LOS SIGUIENTES DATOS</p>
									<div class = 'datos'>
										<input placeholder='Nombre del Alumno' class='datosAlumno' type="text" id="fname" name="fname" required><br>
										<input placeholder='Apellido del Alumno' class='datosAlumno' type="text" id="lname" name="lname" required><br>
										<input placeholder='Edad del Alumno' class='datosAlumno' type="text" id="age" name="age" required><br>
									</div>
									<p class='tituloModal'>CALIFICACION DEL ALUMNO</p>
									<div class='grupoDeMaterias'>
										<div class='materiasGrupo1'>
											<label class='materia' for="matematica">Calificacion en Matematica:</label>
											<input type="number" id="matematica" name="matematica"
												min="1" max="10"><br>
											<label class='materia' for="biologia">Calificación en Biología:</label>
											<input type="number" id="biologia" name="biologia"
												min="1" max="10">
										</div>
										<div class='materiasGrupo2'>
											<label class='materia' for="quimica">Calificación en Quimica:</label>
											<input type="number" id="quimica" name="quimica"
												min="1" max="10"><br>
											<label class='materia' for="fisica">Calificación en Física:</label>
											<input type="number" id="fisica" name="fisica"
												min="1" max="10">
										</div>
										<div class='materiasGrupo3'>
											<label class='materia' for="historia">Calificación en Historia:</label>
											<input type="number" id="historia" name="historia"
												min="1" max="10"><br>
											<label class='materia' for="geografia">Calificación en Geografía:</label>
											<input type="number" id="geografia" name="geografia"
												min="1" max="10">
										</div>
									</div>
									<div class='modalBtnGroup'>
										<button type="button" onclick='almacenarValores()' class='saveBtn'>CALCULAR PROMEDIO</button>
										<button type="button"  onclick='deleteModal()' class='quitBtn'>CANCELAR</button>
									</div>
								</form>
							</div>
						</div>`);
	
}
       // 4.3 Función que elimina el modal

function deleteModal(){
	$('.modalContainer').remove()
}
        //4.4 Funcion que almacena los valores de los inputs, y agrega una vista previa de los resultados del alumno a la pagina principal.

const almacenarValores = () =>{
	
	// Sumamos todas las calificaciones (NOTAS) y dividimos esa suma por la cantidad  de materias.
	let nota = parseInt($('#matematica').val()) + parseInt($('#biologia').val()) + parseInt($('#quimica').val()) + parseInt($('#historia').val()) + parseInt($('#fisica').val()) + parseInt($('#geografia').val());

	notaFinal += nota;

	let promedioFinal = parseInt(Promedio(notaFinal));

	// Comparacion para saber si el alumno aprobó o desaprobó. Se mostrara el resultado en un bloque de codigo en la pagina principal.
	if (promedioFinal >= 7){
		$('.registroAlumnos').append(`<div>
										<div class='main'>
											<p class='previewUser'>${$('#fname').val()} ${$('#lname').val()}</p>
											<p class='previewResult'>aprobo con un promedio de ${promedioFinal}</p>
										</div><br>
									</div>`);
	}else{
		$('.registroAlumnos').append(`<div>
										<div class='main'>
											<p class='previewUser'>${$('#fname').val()} ${$('#lname').val()}</p>
											<p class='previewResult'>desaprobo con un promedio de ${promedioFinal}</p>
										</div><br>
									</div>`);
	}

	// Crea un objeto alumno con los datos entregados por el usuario
	const alumno1 = new Alumno($('#fname').val(),$('#lname').val(),$('#age').val(),promedioFinal);

	// Agrega el alumno al Storage, para poder ver el registro cuando recargues la página.
	//Si en LocalStorage hay algo guardado, entonces actualizamos la lista con el nuevo alumno
	if (localStorage.getItem("listaAlumnos") !== null){
		const oldInfo = JSON.parse(localStorage.getItem('listaAlumnos'));
		oldInfo.push(alumno1);
		localStorage.setItem(`listaAlumnos`, JSON.stringify(oldInfo));
	}else{
		//Si no hay nada guardado, almacenamos la lista en localStorage por primera vez
		listaAlumnos.push(alumno1);
		localStorage.setItem(`listaAlumnos`, JSON.stringify(listaAlumnos));
	}


	//Por ultimo, el modal se elimina, para poder volver a la pagina principal y ver los resultados.
	deleteModal();

	notaFinal = 0;
}

//5.AGREGAMOS FUNCIONALIDAD AL BOTON 'AÑADIR ALUMNO'.

$('.buttonGroup-Add').click(Modal)



