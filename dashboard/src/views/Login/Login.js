import {config, db, rest } from "../../db/index.js"

const Login = () => {
  
  const ini = async () => {
    // console.log("LOAD LOGIN")
    console.log("Login", config )

    $(`#formLogin`).submit(async function(e){
      e.preventDefault()
      var usr = $("#usr").val();
      var pwd = $("#pwd").val();
      if(usr != '' && pwd != ''){
        const login = await (new rest()).post('Login', {usr, pwd}).catch(err => { 
          $("#msjError").html(err);
         });
          
        if(login.code == 200){
            /* Cargamos los modulos habilitados */
            const modules = login.result.modules;
            (new db).createStorage(config.keySessionModules, JSON.stringify(modules))
            delete login.result.modules;
            /* Cargamos los datos de la sesion del usuario */
            const usrInfo = login.result;
            (new db).createStorage(config.keySession, JSON.stringify(usrInfo))
            /* Reiniciamos la vista */
            window.location.reload()
          }else{
            $("#msjError").html('Usuario o contraseña incorrectos');
          }
        // ajax(cdn,formData,'POST',(resp)=>{
        //   // console.log(resp);
        // });
      }else{
        $("#msjError").html('Debe llenar los campos');
      }
    })


  }
  
  const build = () => {
    ini()
  }
  
  return build()
}
Login();