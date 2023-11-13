<?php 
        /**
         * Automatically generated script 
         * Creation Date: 2023-11-12 23:13:44 
         * Autor: Nicolas Hernandez 
         * version:1
         * App: Prueba Técnica
         * Informacion: 
         * Esta clase contiene los servicios que se van a utilizar, inicialmente la clase contiene un servicio (mtodo) de ejemplo; 
         * el cual ayuda a entender el desarrollo de un servicio autodocumentado facilitando luego el uso del mismo.
         **/
        
        class DocumentosController extends Controller implements DocumentosControllerInterfaces{
            
            function __construct($postData){
                try{
                    parent::__construct($postData);
                    $this->table = "DOC_DOCUMENTO";
                }catch(Exception $e) {
                    $code = $e->getCode() ?? 500;
                    $this->logs([$code, $e->getMessage()]);
                    return $this->response([],$code,$e->getMessage());
                }
            }
            /**
             * Inicio de los métodos públicos
             * Los métodos públicos representan cada servicio al que pueden acceder desde el api
             */
            
            public function getAllDocumentos($select="t.*"){ 
                try{
                    /* Se agregan al arreglo los parametros requeridos para el funcionamiento del metodo */
                    /* optional_vars => Campos por lo cual se desea filtrar */
                    $paramRequired = array(
                        "optional_vars" => array(
                            "id" => "Id Documentos",
                            "status" => "Id status",
                        )
                    );
                    $validMethods = ["GET"];
                    $erno = self::validParameters("getAllDocumentos",$paramRequired,"Obtiene el listado de Documentos");
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
                            "selects" => "$select, p.PRO_NAME, td.TIP_NOMBRE",
                            "condition" => [""],
                            "joins" => "
                                INNER JOIN PROC_PROCESO p on p.PRO_ID = t.DOC_ID_PROCESO
                                INNER JOIN TIP_TIPO_DOC td on td.TIP_ID = t.DOC_ID_TIPO
                            "
                        ];

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
            
            public function createDocumentos($required=[]){ 
                try{
                    /* Se agregan al arreglo los parametros requeridos para el funcionamiento del metodo */
                    /* optional_vars => es una llave reservada para identificar valores opcionales */
                    $paramRequired = array(
                        "nombre_doc" => "Nombre del documento",
                        "tipo_doc" => "Id del tipo de documento",
                        "proceso_doc" => "Id del Proceso del documento",
                        "contenido_doc" => "Contenido del documento",
                        "optional_vars" => array(
                            "docId" => "Id del Documento"
                        )
                    );
                    if($required){
                        $paramRequired = $required;
                    }
                    $validMethods = ["POST","PUT"];
                    $erno = self::validParameters("createDocumentos",$paramRequired,"METHOD:POST,PUT || de Documentos");
                    // validacion de parametros
                    $success = false;
                    if($erno["error"]){
                        throw new Exception($erno["msj"], 400);
                    }elseif(!in_array($this->params["requestMethod"],$validMethods)){
                        throw new Exception("El Método HTTP es incorrecto \nMétodos http request admitidos [" . implode(",", $validMethods) ."]", 400);
                    }else{
                        $time = date("Y-m-d H:i:s");
                        $post = [
                            "DOC_NOMBRE" => $this->params["nombre_doc"],
                            "DOC_ID_TIPO" => $this->params["tipo_doc"],
                            "DOC_ID_PROCESO" => $this->params["proceso_doc"],
                            "DOC_CONTENIDO" => $this->params["contenido_doc"],
                        ];

                        if(!array_key_exists("docId", $this->params) || empty($this->params["docId"])){
                            $indicador = $this->model->getDataTableBySql("SELECT IFNULL(MAX(DOC_ID), 0 ) indicador FROM DOC_DOCUMENTO");
                            $indicador = $indicador[0]["indicador"] + 1;
                        }else{
                            $indicador = $this->params["docId"];
                        }

                        /* Obtenemos los prefijos para sacar el Codigo */
                        $tipoDocs = $this->model->getDataTable("TIP_TIPO_DOC",["condition" => ["TIP_ID=?",  $this->params["tipo_doc"]]]);
                        $process = $this->model->getDataTable("PROC_PROCESO",["condition" => ["PRO_ID=?",  $this->params["proceso_doc"]]]);
                        $post["DOC_CODIGO"] = $this->code($tipoDocs[0]["TIP_PREFIJO"], $process[0]["PRO_PREFIJO"], $indicador);

                        $msj =  "Error al insertar el nuevo registro";
                        $condicionUpdate = "";
                        if(!empty($this->params["docId"])){
                            $condicionUpdate = " WHERE DOC_ID = {$this->params["docId"]}";
                        }
                        $save = $this->model->saveTable($this->table, $post, $condicionUpdate);
                        if($save){
                            $code=true;
                            $msj =  "Se registró correctamente";
                            if(!empty($this->params["docId"])){
                                $msj =  "Se actualizó correctamente";
                            }
                            return $this->response([],200,$msj);
                        }else{
                            throw new Exception($msj, 400);
                        }
                    }
        
                }catch(Exception $e) {
                    $code = $e->getCode() ?? 500;
                    $this->logs([$code, $e->getMessage()]);
                    return $this->response([],$code,$e->getMessage());
                }
            }
            
            public function updateDocumentos(){ 
                try{
                    $paramRequired = array(
                        "nombre_doc" => "Nombre del documento",
                        "tipo_doc" => "Id del tipo de documento",
                        "proceso_doc" => "Id del Proceso del documento",
                        "contenido_doc" => "Contenido del documento",
                        "docId" => "Id del Documento"
                    );
                    return $this->createDocumentos($paramRequired);
        
                }catch(Exception $e) {
                    $code = $e->getCode() ?? 500;
                    $this->logs([$code, $e->getMessage()]);
                    return $this->response([],$code,$e->getMessage());
                }
            }
            
            public function deleteDocumentos(){ 
                try{
                    /* Se agregan al arreglo los parametros requeridos para el funcionamiento del metodo */
                    /* optional_vars => es una llave reservada para identificar valores opcionales */
                    $paramRequired = array(
                        "id" => "Id Documentos",
                    );
                    $validMethods = ["DELETE"];
                    $erno = self::validParameters("deleteDocumentos",$paramRequired,"METHOD:DELETE || Eliminar registro de Documentos");
                    // validacion de parametros
                    $success = false;
                    if($erno["error"]){
                        throw new Exception($erno["msj"], 1);
                    }elseif(!in_array($this->params["requestMethod"],$validMethods)){
                        throw new Exception("El Método HTTP es incorrecto \nMétodos http request admitidos [" . implode(",", $validMethods) ."]", 1);
                    }else{
                        $msj = "Error al eliminar el registro";
                        $delete = $this->model->deleteDataTable($this->table, ["DOC_ID = ?", $this->params["id"]]);
                        if($delete){
                            $msj = "Se eliminó el registro correctamente";
                            return $this->response([],200,$msj);
                        }
                    }
                }catch(Exception $e) {
                    $code = $e->getCode() ?? 500;
                    $this->logs([$code, $e->getMessage()]);
                    return $this->response([],$code,$e->getMessage());
                }
            }

            public function getAllTipoDocs($select="t.*"){ 
                try{
                    /* Se agregan al arreglo los parametros requeridos para el funcionamiento del metodo */
                    /* optional_vars => Campos por lo cual se desea filtrar */
                    $paramRequired = array(
                        "optional_vars" => array(
                            "id" => "Id Documentos",
                            "status" => "Id status",
                        )
                    );
                    $validMethods = ["GET"];
                    $erno = self::validParameters("getAllTipoDocs",$paramRequired,"Obtiene el listado de Tipos de Documentos");
                    // validacion de parametros
                    $success = false;
                    if($erno["error"]){
                        throw new Exception($erno["msj"], 1);
                    }elseif(!in_array($this->params["requestMethod"],$validMethods)){
                        throw new Exception("El Método HTTP es incorrecto \nMétodos http request admitidos [" . implode(",", $validMethods) ."]", 1);
                    }else{
                        $post = array();
                        $tabla = "TIP_TIPO_DOC t";
                        $condicion = [
                            "selects" => $select,
                            "condition" => [""]
                        ];
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
            /**
            * Fin de los métodos públicos
            */
        
        
        }
         ?>