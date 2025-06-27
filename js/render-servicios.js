document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('servicios-dinamicos');
  if (!container) {
    console.error('El contenedor para los servicios dinámicos no fue encontrado.');
    return;
  }

  let allServicesHTML = ''; // Acumular todo el HTML aquí

  serviciosData.forEach(servicio => {
    const tituloHTML = `<h1>${servicio.titulo}</h1>`;
    const subtituloHTML = servicio.subtitulo ? `<h4>${servicio.subtitulo}</h4>` : '';
    const descripcionHTML = `<p>${servicio.descripcion}</p>`;

    if (servicio.layout === 'texto-imagen') {
      allServicesHTML += `
        <section class="servicios">
          <div class="container">
            <div class="bloques-servicio">
              <div class="bloque">
                <div class="bloque-texto">
                  ${tituloHTML}
                  ${subtituloHTML}
                  ${descripcionHTML}
                </div>
                <img src="${servicio.imagen}" alt="${servicio.alt}">
              </div>
            </div>
          </div>
        </section>
      `;
    } else if (servicio.layout === 'imagen-texto') {
      allServicesHTML += `
        <div class="container">
          <div class="bloque-servicio-2">
            <img src="${servicio.imagen}" alt="${servicio.alt}" class="imagen-servicio-2">
            <div class="texto-servicio-2">
              ${tituloHTML}
              ${subtituloHTML}
              ${descripcionHTML}
            </div>  
          </div>
        </div>
      `;
    }
  });

  // Insertar todo el HTML generado de una sola vez
  container.innerHTML = allServicesHTML;
});