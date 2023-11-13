// import config from "../db/.config/config.js"
import {config, db, rest } from "../db/index.js"
import { renderHtml } from "../utilities/utilities.js"

const app = () => {
  
  const ini = async () => {
    /* Validamos la sesion del usuario */
    let tmp = null
    if((new db).getStorage(config.keySession)){
      tmp = await (new rest).load(`src/views/Dashboard/Dashboard`)
      tmp = renderHtml(tmp, {client: config.client})
    }else{
      tmp = await (new rest).load(`src/views/Login/Login`)
    }
    return tmp;
  }
  const loadApp = () => {
		$('.containerDashboard').css('opacity',0);
		$("#loadPlatform").empty();
		$("#loadPlatform").addClass("active");
		var container = $("<div class='bodyLoad' ></div>");
		var containerLogo = $("<div></div>");
		
		var logP1 = document.createElement("img");
			logP1.src = "resources/img/iconostema/logo.png";
			logP1.className = "logoCenter animated slideInDown";
		setTimeout(function(){
			$(".bodyLoad").addClass("active");
		},500);
		setTimeout(function(){
			containerLogo.append(logP1);
		},1000);
		container.append(containerLogo);
		$("#loadPlatform").append(container);
		// closeloadApp(3000);
	}

  const closeloadApp = (segundos) => {
		$('.containerDashboard').css('opacity',1);
		setTimeout(function(){
			$("#loadPlatform").animate({
				"opacity" : "0",
				"duration":500
				},{
				"complete" : function() {
					$("#loadPlatform").removeClass("active");        
					$("#loadPlatform").attr("style","");        
					$(".bodyLoad").removeClass("active");
					$("#loadPlatform").empty();
				}
			});
		},segundos);
	}
  const build = () => {
    loadApp();
    ini().then((html) => {
      $(`#root`).html( html );
      closeloadApp(3000);
    })
  }
  
  return build()
}
app();