/**
 * maneja las alertas de la aplicacion
 * @param { string } msj - Mensaje de la alerta
 * @param { string } type - [info - warning] Tipo del color de la alerta
 * @param { number } time - tiempo de espera de la alerta default 3000
 * 
*/
const message = (content='body', msj="",type="info",time=3000) => {
    let bodyMsj = `
                <div id="alert-app" class="animate__animated animate__fadeInRight alert-app ${type} ">
                    <div class="alert-app-msj" >${msj}</div>
                </div>
                `;
    if($("#alert-app").length > 0){
        $("#alert-app").remove();
    }
    $(content).append(bodyMsj)
    setTimeout(() => {
        $(`#alert-app`).removeClass('animate__fadeInRight')
        $(`#alert-app`).addClass('animate__fadeOutRight')
    }, time);
    
    setTimeout(() => {
        $(`#alert-app`).remove()
    }, (time+300));
}

const validarFecha = (fecha)  => {
    const fechaActual = new Date();
    const fechaLimite = new Date(fecha);
    
    return fechaActual.getTime() < fechaLimite.getTime();
  }

const renderHtml = (html, data,pattern=/{{(.*?)}}/g) => {
    return html.replace(pattern, (match, key) => {
        const keys = key.trim().split(".");
        let value = data;
        for (const k of keys) {
            value = value[k];
            if (typeof value === "undefined") {
                return match;
            }
        }
        return value;
    });
  }

const loader = (containerLoading = "body", hidden = false) => {

    let imgLoader = ``;
        // imgLoader = `<img src="/images/logoEsol.png" alt="Cargando">`;
    if ($("#containerLoading").length == 0) {
        var htmlLoading = $('<div class="containerLoading in" id="containerLoading"></div>');
        htmlLoading.html(`<div class="doubleLine"> <div></div> <div></div> <div> <div></div> </div> <div> <div></div> </div> <div class="imgCenter">${imgLoader}</div></div>`);
        $(containerLoading).append(htmlLoading);
        if (hidden == true) {
            setTimeout(function () {
                $("#containerLoading").removeClass('in');
                $("#containerLoading").remove();
            }, 1000);
        }
    } else {
        if(hidden !== 'keep'){
                $("#containerLoading").removeClass('in');
                setTimeout(function () {
                    $("#containerLoading").remove();
                }, 500);
        }
    }
}

const renderTable = (id) => {
	let optionsTable = {
        pageLength: 10,
        language: {
            processing:     "Traitement en cours...",
            search:         "Buscar en la consulta:",
            lengthMenu:    "Mostrar _MENU_ Registros",
            info:           "Mostrando del _START_ hasta el _END_ de _TOTAL_ registros",
            infoEmpty:      "No hay registros para mostrar",
            infoFiltered:   "_MAX_ Registros en total",
            infoPostFix:    "",
            loadingRecords: "Cargando...",
            zeroRecords:    "No hay registros para mostrar",
            emptyTable:     "No hay registros para mostrar",
            paginate: {
                first:      "Primero",
                previous:   "Anterior",
                next:       "Siguiente",
                last:       "último"
            },
            aria: {
                sortAscending:  ": Activar para ordenar la columna en orden ascendente",
                sortDescending: ": Activar para ordenar la columna en orden descendente"
            }
        }
    }
	if($(id).length > 0){
		$(id).DataTable( optionsTable );
		$(".pagination").addClass("pagination-sm");
	}
	
}
export { message, validarFecha, renderHtml, loader, renderTable }