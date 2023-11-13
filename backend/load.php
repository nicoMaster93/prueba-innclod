<?php
class LoadController {
    protected $model;
    protected $headers;
    protected $params;
    function __construct($request){
        date_default_timezone_set('America/Bogota');
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Headers: *');
        header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
        header('content-type: application/json; charset=utf-8');
        require_once('conexion/conexion.php');
        require_once( __DIR__ . '/models/classBD.php');
        $this->model = (new classBD);
        $this->headers = apache_request_headers();
        $this->params = $request ?? $_REQUEST;
    }
    public function run(){
        if($this->autentication()){
            $this->ini();
        }
    }
    protected function writeLog($msj="", $prefix=""){
        /* Creamos folder logs si no existe */
        $folderLogs = __DIR__ . "/logs/";
        if(!is_dir($folderLogs)){
            $originalUmask = umask(0);
            if(mkdir($folderLogs,0777)){
                umask($originalUmask);
            };
        }
        $msj = "\n[".date("Y-m-d H:i:s")."] ". print_r($msj,1);
        $fileName = __DIR__ . "/logs/log-"."$prefix".date("Y-m-d").".log";
        error_log($msj, 3, $fileName );
        chmod($fileName, 0664);
    }
    protected function autentication(){
        /* Valido los headers */
        try {
            if($this->getEnv("DB_CONNECT") == "true"){
                $this->writeLog([$this->headers, file_get_contents("php://input"), $this->params]);
                return true;
            }else{
                return true;
            }
        } catch (\Throwable $e) {
            die($this->response([],500,$e->getMessage()));
        }
    }
    protected function ini(){
        try {
            if(!isset($this->params['endpoint']) || !isset($this->params['action'])){
                throw new Exception("EndPoint inválido / Accion no autorizada", 400);
            }
            $endPoint = $this->params['endpoint'];
            $action = $this->params['action'];
            $folder = __DIR__ . DIRECTORY_SEPARATOR . $this->getEnv("FOLDER_SERVICE") . DIRECTORY_SEPARATOR . $endPoint;
            $controller = __DIR__ . DIRECTORY_SEPARATOR . $this->getEnv("FOLDER_SERVICE") . DIRECTORY_SEPARATOR . "Controller.php";
            $routeInterface = $folder . DIRECTORY_SEPARATOR . "{$endPoint}ControllerInterfaces.php";
            $route = $folder . DIRECTORY_SEPARATOR . "{$endPoint}Controller.php";

            /* validamos la ruta del servicio */
            if(!is_dir($folder) || !file_exists($route)){
                throw new Exception("El servicio solicitado no existe [$route]", 1);
            }else{
                require_once($controller);
                /* Por ahora condiciono la interfaz, ya que puede que no todas las clases tenga interfaz implementada */
                if(file_exists($routeInterface)){
                    require_once($routeInterface);
                }
                require_once($route);
                $requestMethod = isset($_SERVER['REQUEST_METHOD']) ? $_SERVER['REQUEST_METHOD'] : 'post';
                $postData = $this->params;
                $postData['requestMethod'] = strtoupper($requestMethod);
                $classname = "{$endPoint}Controller";
                // valido si se envia un $_FILES
                if(count($_FILES) > 0){
                    foreach ($_FILES as $key => $value) {
                        $postData[$key] = $value;
                    }
                }
                $postData['requestMethod'] = strtoupper($requestMethod);

                if(class_exists($classname)){
                    $api = new $classname($postData);
                    if(method_exists($api,$action)){
                        $resp = $api->$action();
                        return $this->response( $resp['result'], $resp['code'], $resp['message']);
                    }else{
                        throw new Exception("La acción solicitada no existe [$action]", 1);
                    }
                }
            }

            echo $route;
        } catch (\Throwable $e) {
            die($this->response([],$e->getCode(),$e->getMessage()));
        }

    }
    protected function response($data,$code,$msj=''){
        // http_response_code($code);
        $resp = json_encode([
            'code' => $code,
            'message' => $msj,
            'result' => $data,
        ], JSON_PRETTY_PRINT);
        echo $resp;
    }
    protected function getEnv($key=""){
        if(!empty($key)){
            return $_ENV[$key];
        }else{
            return $_ENV;
        }
    }
}


?>