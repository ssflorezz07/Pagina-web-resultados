const resultadosDiv = document.getElementById("resultados");

fetch("data/resultados.json")
    .then(response => response.json())
    .then(data => {
        data.resultados.forEach(partido => {
            resultadosDiv.innerHTML += `
                <div class="tarjeta">
                    <strong>${partido.local}</strong>
                    ${partido.marcador}
                    <strong>${partido.visitante}</strong>
                    <p>Fecha: ${partido.fecha}</p>
                </div>
            `;
        });
    })
    .catch(error => {
        resultadosDiv.innerHTML = "No se pudieron cargar los resultados";
    });