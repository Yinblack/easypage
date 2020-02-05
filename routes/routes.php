<?php
class routes extends Controller
{
    public function __construct() {
        parent::__construct();
    }

    public function index()
    {
        /*CONSTANTS*/$const=$this->_const;
        echo $this->_twig->render('sections/home.html', compact('const'));
    }

    public function clientes()
    {
        /*CONSTANTS*/$const=$this->_const;
        echo $this->_twig->render('sections/clientes.html', compact('const'));
    }


}
?>
