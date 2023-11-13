const config = $(`[data-config]`).data('config');
const spiner = '<div class="spiner"><div><i class="fa fa-spinner fa-pulse fa-5x fa-fw "></i><br><span class="text-center" ></span></div></div>';

console.log(config)



function ajax(page,jsonSend,metod,funcion,error){
	
      $.ajax({
        type:metod,
        url: page,
        data:jsonSend,
        cache: false,
        contentType: false,
        processData: false,
        success:function(data){
        //   console.log(data);
          if(typeof funcion != 'undefined'){
          	funcion(data);
          }
         },
        error: function(data){
		//   console.log(data);
		  error(data);
          if(data.status == 404){
          	alerta("Esta pagina no ha sido encontrada, error 404 ","Error 404");
          }
        }
      });
}


const app = class{
	toggleMenu;
	db;
	constructor(){
		this.toggleMenu = 0;
		this.db = (new storage);
	}
	static preoloadIn(){
		if($("#modalPreload").length == 0){
			$(".containerDashboard").append($("<div id='modalPreload'></div>"));
		}
		$("#modalPreload").addClass('active');
		$("#modalPreload").html(spiner);
	}
	static preoloadOut(){
		$("#modalPreload").removeClass("active").addClass("off");
		setTimeout(function(){
			$("#modalPreload").removeClass("off");
			$("#modalPreload").empty();
		},200);
	}
	/* Cargamos la pagina */
	static loadApp(){
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
		this.closeloadApp(3000);
	}
	static closeloadApp(segundos){
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
					$("#loadPlatform").remove();
				}
			});
		},segundos);
	}
	/* Cargamos las vistas */	
	static solicitarPage(page,varGet){
		this.db.crearCookie("page",page);
		if(typeof varGet != 'undefined'){
			this.db.crearCookie("getData",varGet);
		}else{
			if(this.db.leerCookie('getData') != null){
				this.db.eliminarCookie('getData');
			}
		}
		this.cargarPage();
	}
	static cargarPage(){
		this.preoloadIn();
		formData = new FormData();
		if (this.db.leerCookie('page') != null) {
			var page = this.db.leerCookie('page');
			if(this.db.leerCookie('getData') != null){
				var getData = JSON.parse(atob(this.db.leerCookie('getData')));
				for (var i in getData) {
					// console.log(i,getData[i]);
					formData.append(i,getData[i]);
				}
			}
		}else{
			if(this.db.leerCookie(config.keySession) != null){
				var p = 0
				$("#listpanel li").each(function(){
					if(p == 0){
						page = $(this).data("page");
					}
					// console.log(p,$(this).text(),$(this).data("page"));
					p++;
				});
				this.db.crearCookie("page",page);
				setTimeout(function(){
					if(this.db.leerCookie(config.keySession) == null){
						msjAlerta("Se ha cerrado la sesión");
						window.location.href= 'index.php';
					}
				},3000);
				/* pagina por defetcto */
			}else{
				window.location.href= '../';
			}
		}
		this.barraSuperiorPerfil();
		if(page!=''){
			page = "views/"+page;
			ajax(page,formData,'POST',this.activarPagina);
		}else{
			msjAlerta('No hay una vista activa');
		}
		
	}
	static activarPagina(vistaPagina){
		$("#showPage").html(vistaPagina);
		var page = this.leerCookie('page');
		// console.log(page);
		$("#listpanel li.active").removeClass("active");
		if($("#listpanel li[data-page='"+page+"']")){
			$("#listpanel li[data-page='"+page+"']").addClass("active");
		}
		if($("#tbla-consulta")){
			button = $("#tbla-consulta").data("button");
			butonSel = $("#tbla-consulta").data("select");
			// console.log(button,butonSel);
			table('tbla-consulta',button,butonSel);
		}
		this.preoloadOut();
	}
	static barraSuperiorPerfil(){
		if($('#barraPerfil').children().length == 0) {
			// console.log('Not content');
			var dataUsr = JSON.parse(decodeStr(leerCookie(config.keySession)));
			// console.log(dataUsr);
			var divPerfil = document.createElement('div');
			if(dataUsr['picture'] == null){
				divPerfil.innerHTML = '<span>'+dataUsr['name']+' '+dataUsr['last_name']+'</span><div class="btnIcoPerfil"  id="fotoPerfilDashBoard"><i class="fas fa-user"></i> </div>';
			}else{
				divPerfil.innerHTML = '<span>'+dataUsr['name']+' '+dataUsr['last_name']+'</span><img src="img/perfiles/'+dataUsr['picture']+'" class="btnIcoPerfil" id="fotoPerfilDashBoard" >';
			}
			divPerfil.onclick= function(){
				// console.log('show popoves')
				upDataPerfil();
				
			}
			var btnMenu = $(`<div class="btnCallMenu"><i class="fas fa-ellipsis-v"></i></div>`);
			btnMenu.click(function(){
				closeMenu();
			});
			var btnClose = $(`<a id="btnCloseSesion" ><i class="fas fa-sign-out-alt"></i> Salir</a>`);
			$("#barraPerfil").append(btnMenu,divPerfil,btnClose);
			$("#btnCloseSesion").click(function(){
				eliminarCookie(config.keySession);
				eliminarCookie('page');
				eliminarCookie('getData');
				window.location.href="./";
			});
		}
	}
	static upDataPerfil(){
		if($("#formPerfil").length){
			$("#formPerfil").removeClass('in');
			setTimeout(() => {
				$("#formPerfil").remove();
			}, 500);
		}else{
			var dataUsr = getJson(decodeStr(leerCookie(config.keySession)));
			var title = $("p").html(`<p class="text-right" >Datos personales  <i class="fas fa-user-edit"></i></p>`);
			var formP = $("<form id='formPerfil' class='formPerfil'></form>");
			var preview = $("<div class='btnIcoPerfil preview' id='previewPerfil' ></div>");
			var fotoPerfil = $("<input type='file' class='form-control' id='fotoPerfilUp' >");
			var nombre = $(`<input type='text' value="${dataUsr['name']}" class='form-control' id='nameUp' placeholder='Nombres' data-error="Campo Requerido">`);
			var apellido = $(`<input type='text' value="${dataUsr['last_name']}" class='form-control' id='last_nameUp' placeholder='Apellidos' data-error="Campo Requerido">`);
			var input = $(`<input type='mail' value="${dataUsr['email']}" class='form-control' id='mailUp' placeholder='Correo' data-error="Campo Requerido">`);
			var pwd = $(`<input type='password' value='' class='form-control' id='pwdUp' placeholder='Nueva Contraseña' data-error="Las Contraseñas deben ser iguales" >`);
			var pwd2 = $(`<input type='password' value='' class='form-control' id='pwdUp2' placeholder='Repetir contraseña' data-error="Las Contraseñas deben ser iguales" >`);
			var save = document.createElement('a');
				save.innerHTML='Guardar';
				save.id='saveDataPerfil';
				save.className='btn btn-default form-control';
				
			
			fotoPerfil.change(function() { 
			  mostrarImgNew(this,'fotoPerfilDashBoard'); 
			});
			formP.append(title, preview, fotoPerfil, nombre, apellido, input, pwd, pwd2, save);
			$("#barraPerfil").append(formP);
			$("#saveDataPerfil").click(function(){
				validarCampos("formPerfil",['fotoPerfilUp','pwdUp','pwdUp2'],['pwdUp','pwdUp2']);
				var formData = new FormData();
					formData.append('action','updatePerfil');
					formData.append('nameUp',$("#nameUp").val());
					formData.append('last_nameUp',$("#last_nameUp").val());
					formData.append('mailUp',$("#mailUp").val());
					if(typeof $("#fotoPerfilUp")[0].files[0] != 'undefined'){
						formData.append('fotoUp',$("#fotoPerfilUp")[0].files[0]);
					}
					formData.append('pwdUp',$("#pwdUp").val());
					formData.append('usrId',dataUsr['id']);
				ajax(config.api,formData,'POST',(response)=>{
	
					if(response['success']){
							dataUsr['name'] = response['post']['nameUp'];
							dataUsr['last_name'] = response['post']['last_nameUp'];
							dataUsr['email'] = response['post']['mailUp'];
							if(typeof $("#fotoPerfilUp")[0].files[0] != 'undefined'){
								dataUsr['picture'] = response['post']['picture'];
							}
							crearCookie(config.keySession,encodeStr(JSON.stringify(dataUsr))) 
	
						$('#barraPerfil').empty();
						barraSuperiorPerfil();
					
					}
					// console.log(response,dataUsr);
					msjAlerta(response['msj'], 4000);
					$("#formPerfil").removeClass('in');
					setTimeout(function(){
						$("#formPerfil").remove();
					},500);
				}); 
			});
			setTimeout(function(){
				$("#formPerfil").addClass('in');
			},100);
		}
	}
	
	static closeMenu(){
		if(toggleMenu == 0){
			$(".menuLateral").addClass("off");
			$(".PageViewMenu").addClass("on");
			$(".btnCallMenu").addClass("on");
			toggleMenu = 1;
		}else{
			$(".menuLateral").removeClass("off");
			$(".PageViewMenu").removeClass("on");
			$(".btnCallMenu").removeClass("on");
			toggleMenu = 0;
		}
	}
}