document.addEventListener('DOMContentLoaded', function () {
    const formulario = document.getElementById('formularioServicio');
    const contenedorServicios = document.getElementById('contenedorServicios');

    let serviciosGuardados = JSON.parse(localStorage.getItem('servicios')) || [];

    renderizarServicios();

    formulario.addEventListener('submit', function (e) {
        e.preventDefault();

        const nombre = document.getElementById('nombreCliente').value.trim();
        const tipo = document.getElementById('tipoServicio').value.trim();
        const fecha = document.getElementById('fechaServicio').value.trim();
        const costo = document.getElementById('costoServicio').value.trim();
        const notas = document.getElementById('notasServicio').value.trim();
        

        if (!nombre || !tipo || !fecha || !costo) {
            alert('Por favor completa todos los campos obligatorios.');
            return;
        }

        const nuevoServicio = { nombre, tipo, fecha, costo, notas };
        serviciosGuardados.push(nuevoServicio);

        try {
            localStorage.setItem('servicios', JSON.stringify(serviciosGuardados));
        } catch (e) {
            if (e.name === 'QuotaExceededError') {
                alert('El almacenamiento está lleno.');
                return;
            }
        }

        renderizarServicios();
        formulario.reset();
    });

    function renderizarServicios() {
        contenedorServicios.innerHTML = '';

        serviciosGuardados.forEach((servicio, index) => {
            const div = document.createElement('div');
            div.classList.add('item-servicio');
            div.innerHTML = `
                <div>
                    <strong>${servicio.tipo}</strong><br>
                    Cliente: ${servicio.nombre}<br>
                    Fecha: ${servicio.fecha}<br>
                    Costo: $${servicio.costo}<br>
                    ${servicio.notas ? `Notas: ${servicio.notas}` : ''}
                </div>
                <button type="button" data-index="${index}">Eliminar</button>
            `;
            contenedorServicios.appendChild(div);
        });

        
        document.querySelectorAll('button[data-index]').forEach(boton => {
            boton.addEventListener('click', function () {
                const index = parseInt(this.getAttribute('data-index'));
                serviciosGuardados.splice(index, 1);
                localStorage.setItem('servicios', JSON.stringify(serviciosGuardados));
                renderizarServicios();
            });
        });
    }
});
