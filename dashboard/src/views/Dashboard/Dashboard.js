import {config, db, rest } from "../../db/index.js"
import { loader, message } from "../../utilities/utilities.js"

const Dashboard = () => {
  
  const ini = async () => {
    // console.log("LOAD Dashboard")
    const modules = (new db).getStorage(config.keySessionModules, true)
    modules.map((k) => {
      $(`#listpanel`).append(optionMenu(k))
    });
    eventOption();
    infoUser();
  }

  const optionMenu = (op) => {
    return `<li class="" data-page='${config.srcModuldes + op.view}' >
              <i class="${op.icon}"></i> <span>${op.name}</span>
          </li>`;
  }
  const eventOption = () => {
    $(`[data-page]`).on('click', function(){
      $("#listpanel li.active").removeClass("active");
      const v = $(this).data();
      if(v.page){
        loader('#modalPreload');
        (new rest).load(v.page).then(html => {
          $('#showPage').html(html)
          loader('#modalPreload',true);
          $(this).addClass('active');
        }).catch(err => console.log(err))
      }else{
        message('#modalPreload',"Resource not found","error",3000);
      }
    });
    $(`#listpanel li`)[0].click();
  }
  const infoUser = () => {
    const ss = (new db).getStorage(config.keySession, true)
    const htmlInfo = `<div>
      <span><i class="fa fa-user-circle" aria-hidden="true"></i> ${ss.NOMBRE_COMPLETO} </span> 
      |
      <a id="btnCloseSesion" ><i class="fas fa-sign-out-alt"></i> Cerrar Sesion</a>
    </div>`;
    $("#barraPerfil").html(htmlInfo)
    $("#btnCloseSesion").click(function(){
      Swal.fire({
        title: '¿Estás seguro?',
        html: '¿Desea salir y cerrar la sesion?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, estoy seguro',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            (new db).deleteStorage();
            window.location.reload();
        }
    });
    })
  }
  
  const build = () => {
    ini()
  }
  
  return build()
}
Dashboard();