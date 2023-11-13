import { rest } from "../../../db/index.js"
import { renderTable, loader } from "../../../utilities/utilities.js"
const ViewDocumentos = () => {
    const ini = async () => {
        console.log("Load Documentos")
        getDataSync();
        eventRegister();
    }
    const eventRegister = () => {
        $("#newRegister").click(function(e){
           $("#modalForm").modal('show');
        })
        eventForm();
    }
    const getDataSync = async () => {
        // renderTable('tbla-consulta')
        const [process, tipoDocs] = await Promise.all([
            (new rest()).get('GetProcess'),
            (new rest()).get('GetTipoDocs')
        ]);
        /* Inflo el selector de procesos */
        $(`#proceso_doc`).append(optionSelect("", "-Seleccione-"))
        process.result.map((k) => {
            $(`#proceso_doc`).append(optionSelect(k.PRO_ID, k.PRO_NAME))
        });
        /* Inflo el selector de tipos de Documentos */
        $(`#tipo_doc`).append(optionSelect("", "-Seleccione-"))
        tipoDocs.result.map((k) => {
            $(`#tipo_doc`).append(optionSelect(k.TIP_ID, k.TIP_NOMBRE))
        });
        /* Renderizo la tabla */
        loadTable();
        
    }
    const optionSelect = (id,label) => {
        return `<option value="${id}">${label}</option>`;
    }
    const rowDataTable = (row) => {
        return `<tr>
                    <td align="center" >${buttonsTable(row)}</td>
                    <td align="center" >${row.DOC_CODIGO}</td>
                    <td align="center" >${row.DOC_NOMBRE}</td>
                    <td align="center" >${row.DOC_CONTENIDO}</td>
                    <td align="center" >${row.TIP_NOMBRE}</td>
                    <td align="center" >${row.PRO_NAME}</td>
                </tr>`;
    }
    const buttonsTable = (row) => {
        return `
        <div class="containerButtonTable">
            <button data-row='${JSON.stringify(row)}' data-action="update" title="Editar" class="btn btn-rounded btn-info">
                <i class="fa fa-pencil-alt" aria-hidden="true"></i>
            </button>
            <button data-row='${JSON.stringify(row)}' data-action="delete" title="Borrar" class="btn btn-rounded btn-danger">
                <i class="fa fa-trash" aria-hidden="true"></i>
            </button>
        </div>
        `;
    }

    const saveDocument = async (formData) => {
        let resp;
        let endPoint;
        loader('#modalPreload');
        if($("#docId").val() == ""){
            /* insert */
            endPoint = 'CreateDocuments'
        }else{
            /* update */
            endPoint = 'UpdateDocuments'
        }
        resp = await (new rest()).post(endPoint,formData,false)

        if(resp.code == 200){
            Swal.fire("Exito",resp.message,"success");
            $("#cancelForm").trigger('click')
            loadTable();
        }else{
            Swal.fire("Error",resp.message,"error");
        }
        loader('#modalPreload',true);
    }
    const eventsTable = () => {
        $("[data-action]").click(function(e){
            e.preventDefault();
            const action = $(this).data('action');
            const data = $(this).data('row')
            console.log(data)
            switch (action) {
                case 'update':
                    $(`#nombre_doc`).val(data.DOC_NOMBRE)
                    $(`#tipo_doc`).val(data.DOC_ID_TIPO)
                    $(`#proceso_doc`).val(data.DOC_ID_PROCESO)
                    $(`#contenido_doc`).val(data.DOC_CONTENIDO)
                    $(`#docId`).val(data.DOC_ID)
                    $("#modalForm").modal('show')
                break;
                case 'delete':
                    Swal.fire({
                        title: '¿Estás seguro?',
                        html: '¿Desea eliminar el registro?<br>Esta acción no se puede deshacer',
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Sí, estoy seguro',
                        cancelButtonText: 'Cancelar'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            loader('#modalPreload');
                            (new rest).delete('DeleteDocuments',{id: data.DOC_ID}).then(resp => {
                                let title = ''
                                let type = ''
                                if(resp.code == 200){
                                    title = '¡Confirmado!';
                                    type = 'success';
                                    loadTable();
                                }else{
                                    title = '¡Error!';
                                    type = 'error';
                                }
                                loader('#modalPreload',true);
                                Swal.fire( title, resp.message, type );
                            })
                        }
                    });
                    
                break;
            }
        });
    }
    const eventForm = () => {
        $("#formView").submit(async function(e){
            e.preventDefault();
            let formData = new FormData($(this)[0]);
            saveDocument(formData)
        });
        /* Cancelar form */
        $("#cancelForm").click(function(e){
            $("#formView").trigger('reset');
            $("#docId").val('');
            $("#modalForm").modal('hide');
        })
    }
    const loadTable = () => {
        
        $(`#tbla-consulta`).DataTable().destroy()
        $(`#tbla-consulta tbody`).empty();
        (new rest()).get('GetDocuments').then((rows) => {
            /* Renderizo la tabla */
            rows.result.map((k) => {
                $(`#tbla-consulta tbody`).append(rowDataTable(k))
            });
            renderTable("#tbla-consulta");
            eventsTable();
        });
    }
    const build = () => {
        ini()
    }
    return build()
}
ViewDocumentos()