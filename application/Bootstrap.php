<?php
class Bootstrap
{
    public static function run(Request $peticion)
    {
        $controller = 'routes';
        $rutaControlador = ROOT . 'routes' . DS . $controller . '.php';
        $metodo = $peticion->getMetodo();
        if(is_readable($rutaControlador)){
            require_once $rutaControlador;
            $controller = new $controller;
            
            if(is_callable(array($controller, $metodo))){
                $metodo = $peticion->getMetodo();
            }
            else{
                $metodo = 'index';
            }
            call_user_func(array($controller, $metodo));
        } else {
            throw new Exception('no encontrado');
        }
    }
}

?>