<?php
class routes extends Controller
{
    public function __construct() {
        parent::__construct();
    }

    public function index()
    {
        $const=$this->_const;
        echo $this->_twig->render('sections/home.html', compact('const'));
    }

}
?>
