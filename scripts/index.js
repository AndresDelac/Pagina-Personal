
class Activity {
    constructor(id, title, description, imgUrl){
        this.id = id;
        this.title = title;
        this.description = description;
        this.imgUrl = imgUrl;
    }
}

class Repository {
    constructor(){
        this.activities = [];
        this.id = 0;
    }

    getAllActivities(){
        return this.activities;
    }

    createActivity(title, description, imgUrl){
        this.id++;
        const activity = new Activity(this.id, title, description, imgUrl);
        this.activities.push(activity);
    }
}

const repository = new Repository();

function handler(event) {
    event.preventDefault(); 

    const tituloInput = document.getElementById('tituloInput').value;
    const descripcionInput = document.getElementById('descripcionInput').value;
    const imagenInput = document.getElementById('imagenInput').value;

    if (!tituloInput || !descripcionInput || !imagenInput) {
        alert('Por favor complete todos los campos');
        return;
    }

    repository.createActivity(tituloInput, descripcionInput, imagenInput);
    convertirATarjetas();
}

function convertirATarjetas() {
    const contenedorDeActividades = document.getElementById('contenedorDeActividades');
    contenedorDeActividades.innerHTML = '';

    const todasLasActividades = repository.getAllActivities();

    todasLasActividades.forEach(activity => {
        const tarjeta = crearTarjeta(activity);
        contenedorDeActividades.appendChild(tarjeta);
    });
}

function crearTarjeta(activity) {
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('activity-card');

    const  form = document.getElementById('formularioTarjeta')
    const titulo = document.createElement('h3');
    titulo.textContent = activity.title;

    const descripcion = document.createElement('p');
    descripcion.textContent = activity.description;

    const imagen = document.createElement('img');
    imagen.src = activity.imgUrl;

    cardDiv.appendChild(titulo);
    cardDiv.appendChild(descripcion);
    cardDiv.appendChild(imagen);

    form.reset()
    return cardDiv;
}

const formularioTarjeta = document.getElementById('formularioTarjeta');
formularioTarjeta.addEventListener('submit', handler);

