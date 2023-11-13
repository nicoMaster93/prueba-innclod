<?php 
        /**
         * Automatically generated script 
         * Creation Date: 2023-11-12 23:09:03 
         * Autor: Nicolas Hernandez 
         * version:1
         * App: Prueba Técnica
         * Informacion: 
         * Esta clase contiene los metodos que se van a utilizar en los servicios que se generan, con el fin de validar parametros, logs y respuestas http.
         **/
        
         class Controller {
            protected $param;
            protected $model;
            protected $table;
            function __construct($postData){
                try{
                    include_once(__DIR__."/../models/classBD.php");
                    $this->model = (new classBD);
                    $this->params = $postData;
                    $jsonBody = json_decode(file_get_contents("php://input"),true);
                    if(is_array($jsonBody)){
                        if(count($jsonBody) > 0 ){
                            $this->params = array_merge($this->params, $jsonBody);
                        }
                    }
                }catch(Exception $e) {
                    return $this->response([],500,$e->getMessage());
                }
            }
            protected function validParameters($accion="",$parametrosValidos = array(),$description=""){
                $req = array();
                if(!empty($description)){
                    $description = "\n\n<h4>Descripción de la acción</h4>\n\n<p>$description</p>";
                }
                $ernoTitle = $description."\n\n<h4>Parametros de la acción <b>[ $accion ]</b></h4><p>Estos son los parametros requeridos</p>\n";
                $error = false;
                
                foreach ($parametrosValidos as $key => $value) {
                    if(is_array($value) && array_key_exists("optional_vars",$parametrosValidos)){
                        $errorParam = "\n\n<h4> Parametros Opcionales  <b>[ $accion ]</b> </h4>\n";
                        $errorParam .= "\n<li> @Param [debugAction] => boolean (true/false) || Testea el servicio en ambiente de pruebas, aplica unicamente para los servicios que: [Inserten, Actualicen o Eliminen]. </li>";
                        array_push($req,$errorParam);
                        foreach ($value as $ko => $vo) {
                            $errorParam = "\n<li> @Param [$ko] =>  $vo . </li>";
                            array_push($req,$errorParam);
                        }
                    }else{
                        if(!array_key_exists($key,$this->params)){
                            $error = true;
                        }
                        if(empty($value)){
                            $value = "Campo Obligatorio";
                        }
                        $errorParam = "\n<li> @Param [$key] => $value . </li>";
                        array_push($req,$errorParam);
                        
                    }
                }
                if($error){
                    $resp = array("error" => $error, "msj" => $ernoTitle.implode("",$req));
                }else{
                    $resp = array("error" => $error);
                }
                return $resp;
            }
            public function logs($msj="", $prefix=""){
                /* Creamos folder logs si no existe */
                $folderLogs = __DIR__ . "/../logs/";
                if(!is_dir($folderLogs)){
                    $originalUmask = umask(0);
                    if(mkdir($folderLogs,0777)){
                        umask($originalUmask);
                    };
                }
                if(empty($msj)){
                    $msj = "[".date("Y-m-d H:i:s")."] Parametros recibidos\n" . print_r($this->params,1);
                }else{
                    $msj = "\n[".date("Y-m-d H:i:s")."] ". print_r($msj,1);
                }
                $fileName = __DIR__ . "/../logs/log-"."$prefix".date("Y-m-d").".log";
                error_log($msj, 3, $fileName );
                chmod($fileName, 0664);
            }
            protected function response($data,$code,$msj=""){
                $resp = array(
                    "code" => $code,
                    "message" => $msj,
                    "result" => $data,
                );            
                // $this->logs(print_r($resp,1));     
                return $resp;
            }
            protected function encrypt_decrypt($action, $string){
                $output = false;
                $encrypt_method = $this->env("ENCRYPT_METHOD");
                $secret_key = $this->env("KEY_ENCRYPT");
                $secret_iv = $this->env("IV_SECRET");
                // hash
                $key = hash("sha256", $secret_key);
                // iv - encrypt method AES-256-CBC expects 16 bytes - else you will get a warning
                $iv = substr(hash("sha256", $secret_iv), 0, 16);
                if ( $action == "encrypt" ) {
                    $output = openssl_encrypt($string, $encrypt_method, $key, 0, $iv);
                    $output = base64_encode($output);
                } else if( $action == "decrypt" ) {
                    $output = openssl_decrypt(base64_decode($string), $encrypt_method, $key, 0, $iv);
                }
                return $output;
            }
            protected function env(string $key = ""){
                if(empty($key)){
                    return $_ENV;
                }else{
                    return $_ENV[$key];
                }
            }
            protected function code(string $tipo, string $proceso, int $consecutivo) {
                return "$tipo-$proceso-$consecutivo";
            }
            /**
             * Fin de los métodos internos de la clase 
             */
            
        }
         ?>