// Obtener el elemento del DOM donde se insertarán las tarjetas de eventos
const eventosDiv = document.getElementById("eventos");

function filterEvents(data){
    let aux = [];

    for (const event of data.events) {
        if (event.date > data.currentDate ){
            aux.push(event)
        }
    }
    return aux
}

filterEvents(data).forEach(aux => {
    // Crear un div que contenga la tarjeta del evento
    const eventoDiv = document.createElement("div");
    eventoDiv.className = "card";

    // Agregar la imagen del evento a la tarjeta
    const imagen = document.createElement("img");
    imagen.src = aux.image;
    imagen.width = 355;
    imagen.height = 150;
    eventoDiv.appendChild(imagen);

    const button = document.createElement("button");
    button.textContent = aux.button;
    button.type = "button";
    button.innerText = "see more";
    eventoDiv.appendChild(button);

    // Agregar el nombre del evento a la tarjeta
    const nombre = document.createElement("h2");
    nombre.textContent = aux.name;
    eventoDiv.appendChild(nombre);

    // Agregar la descripción del evento a la tarjeta
    const descripcion = document.createElement("p");
    descripcion.textContent = aux.description;
    eventoDiv.appendChild(descripcion);

    // Agregar la fecha del evento a la tarjeta
    const fecha = document.createElement("p");
    fecha.textContent = aux.date;
    eventoDiv.appendChild(fecha);

    const precioo = document.createElement("p");
    precioo.textContent = "Price: $"
    eventoDiv.appendChild(precioo);

    const precio = document.createElement("p");
    precio.textContent = aux.price;
    eventoDiv.appendChild(precio);

    // Agregar la tarjeta del evento al contenedor de eventos
    eventosDiv.appendChild(eventoDiv);
});