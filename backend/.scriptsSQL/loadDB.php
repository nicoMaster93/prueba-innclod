<?php 
include( __DIR__ ."/../conexion/conexion.php");

class loadDB extends Database {
    protected $folderSQL;
    public function __construct(){
        $this->folderSQL = __DIR__."/sql";
        parent::__construct();
        $this->ini();        
    }

    function ini(){
        try{
            $this->logs("Se inicia lectura de los scripts","red");
            $files = $this->getFileSQL();
            $this->logs($files);
            $create = $this->createTables($files);
            $this->logs("Se Finaliza lectura de los scripts","red");
            $this->logs("Ya puede probar el funcionamiento de la BD","green");
        }
        catch(PDOException $e){
            echo $e->getMessage();
            return false;
        }
    }
    function createTables($files){
        try{
            $folderSQL = $this->folderSQL;
            $fileCreate = array_values(array_filter($files, function($key){
                return (strpos($key, "create") !== false );
            }));
            if(count($fileCreate) > 0){
                $fc = $fileCreate[0];
                if(strpos($fc, "ok-") === false ){
                    $getSQL = file_get_contents($folderSQL . DIRECTORY_SEPARATOR . $fc );
                    if($this->conn->exec($getSQL)){
                        $this->logs(" SQL : {$fc} - Ejecutado");
                        if(!rename($folderSQL . DIRECTORY_SEPARATOR . $fc, $folderSQL . DIRECTORY_SEPARATOR ."ok-".$fc)){
                            $this->logs("NO se modifcó el nombre");
                        };
                        return true;
                    }
                }else{
                    $this->logs("Tablas Base ya creadas");
                    return true;
                }
            }
            return false;
        }
        catch(PDOException $e){
            echo $e->getMessage();
            return false;
        }
    }
    function getFileSQL(){
        $folderSQL = __DIR__."/sql";
        if(is_dir($folderSQL)){
            $directorios = array_filter(scandir($folderSQL), function($key){
                return !in_array($key, [".",".."]);
            });
            
            return array_values($directorios);

        }else{
            $this->logs("No se encontró folder de sentencias SQL");
        }
    }
    function logs($msj, $color=""){
        $msj = print_r($msj, 1);
        $msj = (php_sapi_name() !== "cli" ? nl2br("<br>") : "\n" ) . date("Y-m-d H:i:s") . " {$msj} " ."\n" ;
        if(php_sapi_name() !== 'cli'){
            $msj = "<font color='$color' >$msj</font>";
        }
        echo $msj;
    }
}(new loadDB);

?>