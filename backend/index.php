<?php
class Index {
    protected $load;
    function __construct(){
        require_once(__DIR__ . "/load.php");
        $this->load = new LoadController($_REQUEST);
        $this->ini();
    }
    protected function ini(){
        $this->load->run();
    }
}(new Index());

?>