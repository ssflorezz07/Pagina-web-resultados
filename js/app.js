function formatFecha(fechaStr) {
    try {
        const d = new Date(fechaStr);
        return d.toLocaleDateString('es-CO', { day: '2-digit', month: 'short', year: 'numeric' });
    } catch (e) { return fechaStr; }
}

async function loadResultados() {
    const resultadosDiv = document.getElementById("resultados");
    if (!resultadosDiv) return;

    // Determinar base absoluto para construir la URL del JSON
    const baseHref = document.querySelector('base')?.getAttribute('href') || './';
    const baseAbsolute = new URL(baseHref, window.location.href).href;

    const pathsToTry = [
        'data/resultados.json',
        new URL('data/resultados.json', baseAbsolute).href
    ];

    let data = null;
    let lastError = null;

    for (const p of pathsToTry) {
        try {
            const resp = await fetch(p);
            if (!resp.ok) throw new Error(`HTTP ${resp.status} for ${p}`);
            data = await resp.json();
            break;
        } catch (err) {
            lastError = err;
            console.warn('Intento de carga fallido:', p, err);
        }
    }

    if (!data) {
        resultadosDiv.innerHTML = '<p>No se pudieron cargar los resultados.</p>';
        console.error('No se pudo cargar data/resultados.json:', lastError);
        return;
    }

    if (!data.resultados || !data.resultados.length) {
        resultadosDiv.innerHTML = '<p>No hay resultados disponibles.</p>';
        return;
    }

    resultadosDiv.innerHTML = '';

    data.resultados.forEach(partido => {
        const tarjeta = document.createElement('article');
        tarjeta.className = 'tarjeta';
        tarjeta.tabIndex = 0;

        const equipos = document.createElement('div');
        equipos.className = 'equipos';

        const equipoLocal = document.createElement('div');
        equipoLocal.className = 'equipo';
        const logoL = document.createElement('img');
        logoL.className = 'logo-img';
        logoL.src = partido.escudoLocal || 'images/placeholder.png';
        logoL.alt = partido.local;
        logoL.onerror = function() { this.style.display = 'none'; };
        const nombreL = document.createElement('small');
        nombreL.textContent = partido.local;
        equipoLocal.appendChild(logoL);
        equipoLocal.appendChild(nombreL);

        const marcador = document.createElement('div');
        marcador.className = 'marcador';
        const parts = (partido.marcador || '').split('-').map(s=>s.trim());
        marcador.innerHTML = `${parts[0] || ''} <span class="sep">-</span> ${parts[1] || ''}`;

        const equipoVis = document.createElement('div');
        equipoVis.className = 'equipo';
        const logoV = document.createElement('img');
        logoV.className = 'logo-img';
        logoV.src = partido.escudoVisitante || 'images/placeholder.png';
        logoV.alt = partido.visitante;
        logoV.onerror = function() { this.style.display = 'none'; };
        const nombreV = document.createElement('small');
        nombreV.textContent = partido.visitante;
        equipoVis.appendChild(logoV);
        equipoVis.appendChild(nombreV);

        equipos.appendChild(equipoLocal);
        equipos.appendChild(marcador);
        equipos.appendChild(equipoVis);

        const meta = document.createElement('div');
        meta.className = 'meta';
        const fecha = document.createElement('div');
        fecha.className = 'fecha';
        fecha.textContent = formatFecha(partido.fecha);
        const estado = document.createElement('div');
        estado.className = 'estado';
        estado.textContent = 'Final';

        meta.appendChild(fecha);
        meta.appendChild(estado);

        tarjeta.appendChild(equipos);
        tarjeta.appendChild(meta);

        resultadosDiv.appendChild(tarjeta);
    });
}

// Ejecutar después de que el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadResultados);
} else {
    loadResultados();
}