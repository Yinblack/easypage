<?php
class Request
{
    private $_controlador;
    private $_metodo;
    private $_argumentos;

    public function __construct() {
            if (isset($_GET['url'])) {
                $url = $_GET['url'];
                $url = str_replace("-", "_", $url);
            }else{
                $url = 'index';
            }
            $searchVal = array('_es','_en','_de','_zh','_fr','_pt','_it','_ru','_ja');
            $url = str_replace($searchVal, '', $url);
            $this->_metodo = strtolower($url);
        $this->_controlador = 'routes';
        if(!$this->_metodo){
            $this->_metodo = 'index';
        }
        if(!isset($this->_argumentos)){
            $this->_argumentos = array();
        }
    }

    public function getControlador()
    {
        return 'routes';
    }

    public function getMetodo()
    {
        return $this->_metodo;
    }
}

?>
