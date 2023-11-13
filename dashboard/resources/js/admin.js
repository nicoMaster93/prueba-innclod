

function editarFormulario(formEncode,funcion){
	// $("<body>").animate({ scrollTop:0 }, 'slow');
	var json = JSON.parse(decodeStr(formEncode));
	for(var i in json){
	// console.log($("#"+i)[0], typeof $("#"+i)[0]);
		if($("#"+i) && typeof $("#"+i)[0] != 'undefined'){
			if($("#"+i)[0]['localName'] == 'img'){
				$("#"+i).attr('src',json[i]);
			}else if($("#"+i)[0]['localName'] == 'div'){
				$("#"+i).append($(`<img src="${json[i]}" class="img-responsive">`)); 
			}else{
				$("#"+i).val(json[i]);
			}	
		}
	}
	if(typeof funcion == 'function'){
		funcion(json);
	}
}


/*----------------------------------------------------------------------[ funciones generales]------------------------------------------------*/

/*----------------------------------------------------------------------[ funciones generales]------------------------------------------------*/


function vallogin(){
	var usr = $("#usr").val();
	var pwd = $("#pwd").val();
	if(usr != '' && pwd != ''){
		var formData = new FormData(document.getElementById("formLogin"));
		const cdn = config.api + config.endPoint.loguin;
		ajax(cdn,formData,'POST',(resp)=>{
			// console.log(resp);
			if(resp['success']){
				(new storage).createStorage(config.keySession,encodeStr(JSON.stringify(resp['data'])));
				window.location.href="./views/";
			}else{
				$("#msjError").html('Usuario o contraseña incorrectos');
				msjAlerta('Usuario o contraseña incorrectos');
			}
		});
	}else{
		$("#msjError").html('Debe llenar los campos');

	}	
}
/*----------------------------------------------------------------------[ funciones generales]------------------------------------------------*/

/*----------------------------------------------------------------------[ funciones generales]------------------------------------------------*/


function forgetPwd(){
	var pwd = $("#email").val();
	if( pwd != ''){
		var formData = new FormData(document.getElementById("formLogin"));
		formData.append('val','LOGIN');
		ajax(config.api,formData,'POST',(resp)=>{
			msjAlerta(response['msj']);
		});
	}else{
		$("#msjError").html('Debe llenar los campos');
	}	
}
