<?php 
        /**
         * Automatically generated script 
         * Creation Date: 2023-11-12 23:14:48 
         * Autor: Nicolas Hernandez 
         * version:1
         * App: Prueba Técnica
         * Informacion: 
         * Esta clase contiene los servicios que se van a utilizar, inicialmente la clase contiene un servicio (mtodo) de ejemplo; 
         * el cual ayuda a entender el desarrollo de un servicio autodocumentado facilitando luego el uso del mismo.
         **/
        
        class ProcesosController extends Controller implements ProcesosControllerInterfaces{
            
            function __construct($postData){
                try{
                    parent::__construct($postData);
                    $this->table = "PROC_PROCESO";
                }catch(Exception $e) {
                    $code = $e->getCode() ?? 500;
                    $this->logs([$code, $e->getMessage()]);
                    return $this->response([],$code,$e->getMessage());
                }
            }
            public function getAllProcesos($select="t.*"){ 
                try{
                    /* Se agregan al arreglo los parametros requeridos para el funcionamiento del metodo */
                    /* optional_vars => Campos por lo cual se desea filtrar */
                    $paramRequired = array(
                        "optional_vars" => array(
                            "id" => "Id Procesos",
                            "status" => "Id status",
                        )
                    );
                    $validMethods = ["GET"];
                    $erno = self::validParameters("getAllProcesos",$paramRequired,"Obtiene el listado de Procesos");
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
                            "selects" => $select,
                            "condition" => [""]
                        ];
                        if(array_key_exists("id",$this->params)){
                            $condicion["condition"] = ["id = ?", $this->params["id"]];
                        }
                        if(array_key_exists("status",$this->params)){
                            $condicion["condition"][0] = (!empty($condicion["condition"][0]) ? $condicion["condition"][0] . " and " : "" ) . "status in (?)";
                            $condicion["condition"][] = $this->params["status"];
                        }
                        $data = $this->model->getDataTable($tabla,$condicion);
                        if(count($data)>0){
                            return $this->response($data,200);
                        }else{
                            return $this->response($data,400,"No hay registros");
                        }
                    }

                }catch(Exception $e) {
                    $code = $e->getCode() ?? 500;
                    $this->logs([$code, $e->getMessage()]);
                    return $this->response([],$code,$e->getMessage());
                }
            }
        
        }
         ?>