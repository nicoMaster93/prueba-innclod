<?php

class Database {
    protected $conn;
    public function __construct() {
        try{
            if($this->loadEnv()){
                if($this->env("DB_CONNECT") == "true"){
                    /* Muestra u Oculta errores */
                    ini_set("display_errors", $this->env("DISP_ERNO"));
                    /* Variables de configuracion de la BD */
                    $db_type = $this->env("DB_TIPO");
                    $db_host = $this->env("DB_HOST");
                    $db_base = $this->env("DB_BASE");
                    $db_cotejamiento = $this->env("COTEJAMIENTO");
                    $db_user = $this->env("DB_USER");
                    $db_pass = $this->env("DB_PASS");
                    $this->conn = new PDO($db_type.$db_host.$db_base.$db_cotejamiento, $db_user, $db_pass);
                    $this->conn->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
                };
             }else{
                throw new Exception("Error al leer variables de entorno", 1);
                
             };
        }
        catch(PDOException $e ){
			die("Fallo la Conexion: ".$e->getMessage());
		 }
	}
    private function getServerUrl(){
        return $_SERVER["REQUEST_SCHEME"] . "://" . $_SERVER["SERVER_NAME"] . "/";
    }
    private function validatedEnvFile(){
        if(strpos($this->getServerUrl(), 'localhost') !== false){
            return 'develop';
        }else{
            return 'production';
        }
    }
    private function loadEnv(){
        try {
            $envFile = __DIR__ . '/../.env';
            if (!file_exists($envFile)) {
                if (!file_exists($envFile . ".dev")) {
                    throw new Exception('.env file not found.');
                }else{
                    copy($envFile . ".dev", $envFile);
                }
            }
    
            $lines = file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
            foreach ($lines as $line) {
                if (strpos($line, '=') !== false && strpos($line, '#') !== 0) {
                    list($key, $value) = explode('=', $line, 2);
                    $key = trim($key);
                    $value = trim(str_replace(["'",'"'],"",$value));
    
                    // Define la variable de entorno solo si no está previamente definida
                    if (!array_key_exists($key, $_ENV)) {
                        $_ENV[$key] = $value;
                    }
                }
            }
            /* Agregamos URL del Sitio a las variables de entorno */
            if (!array_key_exists('CLIENTE_URL', $_ENV)) {
                $_ENV['CLIENTE_URL'] = $this->getServerUrl();
            }
            return true;
        } catch (\Throwable $e) {
            echo "Error: ".$e->getMessage();
            return false;
        }
    }
    protected function env($key){
        return $_ENV[$key];
    }
}(new Database);

?>
