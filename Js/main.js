// Obtener el elemento del DOM donde se insertarán las tarjetas de eventos
const eventosDiv = document.getElementById("eventos");

// Recorrer el objeto data.events y generar una tarjeta HTML para cada evento
data.events.forEach(evento => {
    // Crear un div que contenga la tarjeta del evento
    const eventoDiv = document.createElement("div");
    eventoDiv.className = "card";

    // Agregar la imagen del evento a la tarjeta
    const imagen = document.createElement("img");
    imagen.src = evento.image;
    imagen.width = 355;
    imagen.height = 150;
    eventoDiv.appendChild(imagen);

    const button = document.createElement("button");
    button.textContent = evento.button;
    button.type = "button";
    button.innerText = "see more";
    eventoDiv.appendChild(button);

    // Agregar el nombre del evento a la tarjeta
    const nombre = document.createElement("h2");
    nombre.textContent = evento.name;
    eventoDiv.appendChild(nombre);

    // Agregar la descripción del evento a la tarjeta
    const descripcion = document.createElement("p");
    descripcion.textContent = evento.description;
    eventoDiv.appendChild(descripcion);

    // Agregar la fecha del evento a la tarjeta
    const fecha = document.createElement("p");
    fecha.textContent = evento.date;
    eventoDiv.appendChild(fecha);

    const precioo = document.createElement("p");
    precioo.textContent = "Price: $"
    eventoDiv.appendChild(precioo);

    const precio = document.createElement("p");
    precio.textContent = evento.price;
    eventoDiv.appendChild(precio);

    // Agregar la tarjeta del evento al contenedor de eventos
    eventosDiv.appendChild(eventoDiv);
});