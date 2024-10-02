<?php
abstract class Controller
{
    protected $_view;
    
    public function __construct() {
        $this->_view = new View(new Request);


        /*TWIG3 INPLEMENTATION*/
        require_once './vendor/autoload.php';
        $loader = new \Twig\Loader\FilesystemLoader('./views');
        $this->_twig = new \Twig\Environment($loader, [
            'debug'=>true,
            'cache' => false,
        ]);
        $this->_twig->addExtension(new \Twig\Extension\DebugExtension());
        /**/


        /*CONSTANTES*/
        $this->_const = array();
        $jsondata = file_get_contents('routes/config.json'); 
        $data = json_decode($jsondata, true);
        foreach ($data as $key => $value) {
            $this->_const[$key]=$value;
        }
        if (isset($_GET['url'])) {
            $url=$_GET['url'];
        }else{
            $url='index';
        }
        if (strlen($url)>=3 && $url!='index') {
            $lan_string = substr($url, -3);
            switch ($lan_string) {
                case '_es':
                    $this->_const['LAN']='_es';
                    break;
                case '_en':
                    $this->_const['LAN']='_en';
                    break;
                case '_de':
                    $this->_const['LAN']='_de';
                    break;
                case '_zh':
                    $this->_const['LAN']='_zh';
                    break;
                case '_fr':
                    $this->_const['LAN']='_fr';
                    break;
                case '_pt':
                    $this->_const['LAN']='_pt';
                    break;
                case '_it':
                    $this->_const['LAN']='_it';
                    break;
                case '_ru':
                    $this->_const['LAN']='_ru';
                    break;
                case '_ja':
                    $this->_const['LAN']='_ja';
                    break;
                default:
                    $this->_const['LAN']='default';
                    break;
            }
        }else{
            $this->_const['LAN']='default';
        }
        $searchVal = array('_es','_en','_de','_zh','_fr','_pt','_it','_ru','_ja');
        $url_cleaned = str_replace($searchVal, '', $url);
        $this->_const['active_'.$url_cleaned]=true;
        $this->_const['active_complete']=$url;
        $this->_const['active']=$url_cleaned;
    }
    
    abstract public function index();
}

?>