<?php 
        /**
         * Automatically generated script 
         * Creation Date: 2023-11-12 23:09:03 
         * Autor: Nicolas Hernandez 
         * version:1
         * App: Prueba Técnica
         * Informacion: 
         * Esta clase contiene los servicios que se van a utilizar, inicialmente la clase contiene un servicio (mtodo) de ejemplo; 
         * el cual ayuda a entender el desarrollo de un servicio autodocumentado facilitando luego el uso del mismo.
         **/
        
        class UsuariosController extends Controller implements UsuariosControllerInterfaces{
            
            function __construct($postData){
                try{
                    parent::__construct($postData);
                    $this->table = "USUARIOS";
                }catch(Exception $e) {
                    $code = $e->getCode() ?? 500;
                    $this->logs([$code, $e->getMessage()]);
                    return $this->response([],$code,$e->getMessage());
                }
            }

            public function login($select="t.*"){ 
                try{
                    /* Se agregan al arreglo los parametros requeridos para el funcionamiento del metodo */
                    /* optional_vars => Campos por lo cual se desea filtrar */
                    $paramRequired = array(
                        "usr" => "Correo o Cedula",
                        "pwd" => "Contraseña",
                    );
                    // $this->logs($this->encrypt_decrypt("encrypt", "987654321"));
                    $validMethods = ["GET","POST"];
                    $erno = self::validParameters("loguin",$paramRequired,"Obtiene el listado de Users");
                    // validacion de parametros
                    $success = false;
                    if($erno["error"]){
                        throw new Exception($erno["msj"], 1);
                    }elseif(!in_array($this->params["requestMethod"],$validMethods)){
                        throw new Exception("El Método HTTP es incorrecto \nMétodos http request admitidos [" . implode(",", $validMethods) ."]", 1);
                    }else{
                        $post = array();
                        $tabla = "$this->table t";
                        $condicion = [
                            "selects" => "$select",
                            "condition" => [
                                "LOGIN = ? and PWD = ? and ESTADO = ?",
                                $this->params['usr'],
                                $this->encrypt_decrypt("encrypt", $this->params['pwd']),
                                1
                            ]
                        ];
                        $data = $this->model->getDataTable($tabla,$condicion);
                        if(count($data)>0){
                            $data[0]["modules"][] = [
                                "icon" => "fa fa-file-o",
                                "view" => "Documentos/Documentos",
                                "name" => "Mis Documentos"
                            ];
                            $data = $data[0];
                            return $this->response($data,200);
                        }else{
                            return $this->response($data,400,"Usuario o contraseña incorrectos");
                        }
                    }

                }catch(Exception $e) {
                    return $this->response([],500,$e->getMessage());
                }
            }
        
        
        }
         ?>