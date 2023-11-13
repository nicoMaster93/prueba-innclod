function getJson(data){
	return JSON.parse(data);
}
function jsonStr(data){
	return JSON.stringify(data);
}
function encodeStr(str){
	var enc = window.btoa(str);
	return enc;
}
function decodeStr(enc){
	var dec = window.atob(enc)
	return dec;
}
function confirmarAction(rawJs, funcionAceptar){
	js = getJson( decodeStr(rawJs) );
	var aler = '<div class="msjAlertaIn">'+
		'<div class="animated fadeInDown cuerpoAlert">'+
			'<div class="demo-card-wide mdl-card mdl-shadow--2dp">'+
			  '<div class="mdl-card__title ">'+
			    '<h2 class="mdl-card__title-text">Confirma esta accion</h2>'+
			  '</div>'+
			  '<div class="mdl-card__supporting-text" >'+
			    js['msj_confirmacion']+
			  '</div>'+	
			  '<div class="mdl-card__actions mdl-card--border">'+
			    '<a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" id="AceptarDelete" >Aceptar</a>'+
			    ' <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" id="CancelarDelete" >Cancelar</a>'+
			  '</div>'+
			  '<div class="mdl-card__menu">'+
			    '<button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect" id="CancelarDelete2">'+
			      '<i class="far fa-times-circle"></i>'+
			    '</button>'+
			  '</div>'+
			'</div>'+
		'</div>'+
	'</div>';
	// $('#'+id).addClass('animated zoomInUp');
	$('#showPage').append(aler);
	document.getElementById('CancelarDelete').addEventListener('click',function(){
		$('.cuerpoAlert').removeClass('fadeInDown');
		$('.cuerpoAlert').addClass('zoomOutUp'); 
		setTimeout(function(){
			$('.msjAlertaIn').remove();
		},1000); },false);
	document.getElementById('CancelarDelete2').addEventListener('click',function(){
		$('.cuerpoAlert').removeClass('fadeInDown');
		$('.cuerpoAlert').addClass('zoomOutUp'); 
		setTimeout(function(){
			$('.msjAlertaIn').remove();
		},1000); },false);
	document.getElementById('AceptarDelete').addEventListener('click',function(){
		$('.cuerpoAlert').removeClass('fadeInDown');
		$('.cuerpoAlert').addClass('zoomOutUp'); 
		$('.msjAlertaIn').remove();
		funcionAceptar(js);
	 },false);
}
function table(id,btons,butonSel){
	optionsTable = {
			pageLength: 50,
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
			},
			
		     // dom: 'lBf',
	        
	}
	if(typeof btons == 'undefined' || btons == true){
		optionsTable['dom'] = 'Bfrtip';
	        if(typeof butonSel == 'undefined'){
	        		optionsTable['buttons'] = ['print', { extend: 'excelHtml5', title: 'Excel' }, 'pdf', 'colvis'];
	        
	        }else{
	        		btonsArr = [];
	        		btons = butonSel.split(",");
	        		for (var i = 0; i < btons.length; i++) {
	        			switch(btons[i]){
	        				case 'visibles':
	        					btonsArr.push('colvis');
	        				break;
	        				case 'excel':
	        					btonsArr.push({ extend: 'excelHtml5', title: 'Excel' });
	        				break;
	        				default:
    						// code block
	        					btonsArr.push(btons[i]);
	        			}
	        		}
	        		optionsTable['buttons'] = btonsArr;

	        }
	}

	if(document.getElementById(id)){
		var table = $('#'+id).DataTable( optionsTable );

		$(".pagination").addClass("pagination-sm");
	}
	
}
function mostrarImgNew(evt,divImg,NidImage,showName=false){
      var files = evt.files; // FileList object
      // var files = evt.files; // FileList object
      // Obtenemos la imagen del campo "file".
      for (var i = 0, f; f = files[i]; i++) {
        //Solo admitimos imágenes.
        if (!f.type.match('image.*')) {
            continue;
        }
 
        var reader = new FileReader();
 
        reader.onload = (function(theFile){
            return function(e) {
              // Insertamos la imagen
            //   console.log(theFile.name);
              if(showName){
				  if( divImg != ''){	
					  $(`#${divImg}`).after("<span>"+theFile.name+"</span>");
					  
				  }else{
					  $(evt).after("<span>"+theFile.name+"</span>");
				  }
              }
	            if( divImg != ''){
		             var NewImage = ['<img src="', e.target.result,'" title="', escape(theFile.name), '" class="img-responsive thumbnail" />'].join('');	
		             document.getElementById(divImg).innerHTML = NewImage;
		             $(`#${divImg}`).addClass("on");
		         }else{
		            document.getElementById(NidImage).src=e.target.result;
		            document.getElementById(NidImage).title=escape(theFile.name);
	        	 }
	        	 if(document.getElementById('val_img')){
	        	 	document.getElementById('val_img').value = 1;
	        	 }
            };
        })(f);
 
        reader.readAsDataURL(f);
      }
}
function alertaEncode(msjAler,bg_title,func,data){
	var msj = decodeStr(msjAler);
	alerta(msj,bg_title,func,data);
}
function alerta(msjAler,bg_title,func,data){
	var aler = '<div class="msjAlertaIn">'+
		'<div class="animated fadeInUp cuerpoAlert">'+
			'<div class="demo-card-wide mdl-card mdl-shadow--2dp">'+
			  '<div class="mdl-card__title ">'+
			    '<h2 class="mdl-card__title-text">'+bg_title+'</h2>'+
			  '</div>'+
			  '<div class="mdl-card__supporting-text" >'+
			    msjAler+
			  '</div>'+	
			  '<div class="mdl-card__actions mdl-card--border">'+
			    '<a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" id="cerrarAlert" >Aceptar</a>'+
			  '</div>'+
			  '<div class="mdl-card__menu">'+
			    '<button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect" id="cerrarAlert2">'+
			      '<i class="far fa-times-circle"></i>'+
			    '</button>'+
			  '</div>'+
			'</div>'+
		'</div>'+
	'</div>';
	// $('#'+id).addClass('animated zoomInUp');
	$('#showPage').append(aler);
	$(".msjAlertaIn").click(function(){
		$('.cuerpoAlert').removeClass('fadeInUp');
		$('.cuerpoAlert').addClass('fadeOutDown');
		setTimeout(function(){
			$('.msjAlertaIn').remove();
		},1000);	
	});
	$(".cuerpoAlert").click(function(e){
		 e.stopPropagation();
		if(typeof func != 'undefined'){
				if(typeof data != 'undefined'){
				func(data);
			}else{
				func();
			}
		}
	});
	document.getElementById('cerrarAlert').addEventListener('click',function(){
		$('.cuerpoAlert').removeClass('fadeInUp');
		$('.cuerpoAlert').addClass('fadeOutDown'); 
		setTimeout(function(){
			$('.msjAlertaIn').remove();
			 if(typeof func != 'undefined'){
				 if(typeof data != 'undefined'){
					func(data);
				}else{
					func();
				}
			}
		},1000); 
	},false);
	document.getElementById('cerrarAlert2').addEventListener('click',function(){
		$('.cuerpoAlert').removeClass('fadeInUp');
		$('.cuerpoAlert').addClass('fadeOutDown'); setTimeout(function(){
			$('.msjAlertaIn').remove();
			if(typeof func != 'undefined'){
				if(typeof data!= 'undefined'){
					func(data);
				}else{
					func();
				}
			}
		},1000);
	},false);
}

function soloNumeros(e){
	var key = window.Event ? e.which : e.keyCode
	return (key >= 48 && key <= 57)
}


function removeItemFromArr( arr, item ) {
    return arr.filter( function( e ) {
        return e !== item;
    } );
}

function validarCampos(idFormulario,camposLibres,camposIguales,svice=false,funcionRespuesta,paramAdicional=null){
  var frm = document.getElementById(idFormulario);
  var formData = new FormData(frm);
  if(paramAdicional!= null && (typeof paramAdicional == 'object') ){
	formData.append('objParam',jsonStr(paramAdicional)); 
  }
  var error = 0;
  
  $(".input-error").removeClass('input-error');
  $(".label-error").remove();
  for (i=0;i<frm.elements.length;i++) {
    if(frm[i].type != 'button'){
		if(typeof frm[i].id != 'undefined'){
			if($("#"+frm[i].id).val() == ''){
				// console.log($("#"+frm[i].id));
				$("#"+frm[i].id).addClass('input-error');
				if(typeof camposLibres != 'undefined'){
					var a = camposLibres.indexOf(frm[i].id);
					if(a < 0){
						error++;
						
						if($("#"+frm[i].id).data('error')){ // Agrego el label del error 
							var lberror = $("<span class='label-error' ></span>").text("* "+$("#"+frm[i].id).data('error'));
							$("#"+frm[i].id).after(lberror);
						}
					}else{
						$("#"+frm[i].id).removeClass('input-error');
					} 
				}else{
					error++;
				}
			}else{
			
				if(frm[i].type == 'email'){
					if(validarEmail( $("#"+frm[i].id).val() ) == false ){
					$("#"+frm[i].id).addClass('input-error');         
					error++;
					} 
				}else{
					// if(frm[i].type == 'checkbox'){
					//   if($("#"+frm[i].id).is(':checked')){
					//     formData.append(frm[i].id,$("#"+frm[i].id).val());
					//   }
					// }else{
					//   if(frm[i].type == 'file'){
					//     formData.append(frm[i].id,$("#"+frm[i].id)[0].files[0]);
					//   }else{
					//     formData.append(frm[i].id,$("#"+frm[i].id).val().trim());
					//   }          
					// }
				}
			}
		}
    }
    
  }
  if(error == 0){
    var resp = {'successForm':true};
    if(typeof camposIguales != 'undefined' || camposIguales != ''){
      if($("#"+camposIguales[0]).val() === $("#"+camposIguales[1]).val()){
        	var resp = {'successForm':true};
        }else{
            $("#"+camposIguales[0]).addClass('input-error');
            var lberror = $("<span class='label-error' ></span>").text("* Las contraseñas deben ser iguales");
            $("#"+camposIguales[0]).after(lberror);
            $("#"+camposIguales[1]).addClass('input-error');
            var lberror2 = $("<span class='label-error' ></span>").text("* Las contraseñas deben ser iguales");
            $("#"+camposIguales[1]).after(lberror2);
    		var resp = {'successForm':false};
        }
    }
  }else{
    var resp = {'successForm': false};
  }
  if(resp['successForm'] == true){
	if(svice){
		formData.append(actionApi,svice); 
		ajax(config.api,formData,'POST',funcionRespuesta);
	}else{
		return resp['successForm'];
	}
  }else{
	msjAlerta('Debes llenar todos los campos requeridos');
  }
}

function validarEmail(valor) {
  if (/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(valor)){
   //alert("La dirección de email " + valor + " es correcta.");
   return true;
  } else {
   //alert("La dirección de email es incorrecta.");
   return false;
  }
}
function getBase64(file) {
   var reader = new FileReader();
   reader.readAsDataURL(file);
   reader.onload = function () {
    //  console.log(reader.result);
   };
   reader.onerror = function (error) {
    //  console.log('Error: ', error);
   };
}
function msjAlerta(msj,time=3000){
    var alerta = $("<div class='alertaMsjApp animated fadeInUp' id='alertaMsjApp' ></div>").html(msj);
    $('body').append(alerta);
    setTimeout(function(){
        $("#alertaMsjApp").removeClass("fadeInUp");
        $("#alertaMsjApp").addClass("fadeOutDown");
	},time);
	var timeRm = time+500;
    setTimeout(function(){
            $("#alertaMsjApp").remove();
    },timeRm);
}
function moveSection(id,container){
	$(container).scrollTop(0);
	var elementContainerPositionTop = $(container).offset().top;
	var elementIdPositionTop = $(id).offset().top;
	var tope = (elementIdPositionTop - elementContainerPositionTop);
	$(container).animate({ scrollTop:tope }, 'slow');
	// console.log(elementIdPositionTop, elementContainerPositionTop);
}

function arraySearch(arr,key){
	var exist = arr.indexOf(key);
	if(exist >= 0){
		return true;
	}else{
		return false;
	}
}
