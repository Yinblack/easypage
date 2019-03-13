<?php
if(isset($_POST['captcha']) && $_POST['captcha']==''){
    $Nombre   =$_POST['Nombre'];
    $Email    =$_POST['Email'];
    $Telefono =$_POST['Telefono'];
    $Asunto   =$_POST['Asunto'];
    $Mensaje  =$_POST['Mensaje'];
    $html = '
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
          <title></title>
        </head>
        <body>
        <table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0">
          <tr>
            <td>
            <table border="0" cellspacing="0" cellpadding="0" width="600" align="center">
          <tr style="background:#2770b5; height:21px;">
            <td colspan="5" style="font-family:Arial, Helvetica, sans-serif; font-size:16px; font-weight: 500; color: #2770b5;"></td>
          </tr>
              <tr>
                <td width="17"></td>
                <td width="569" colspan="3" valign="top" style="font-family:Arial, Helvetica, sans-serif; font-size:14px;">
                  <p style ="margin:5px 0;"><strong>Nombre:</strong> '.$Nombre.'</p>
                  <p style ="margin:5px 0;"><strong>Email:</strong> '.$Email.'</p>
                  <p style ="margin:5px 0;"><strong>Teléfono:</strong> '.$Telefono.'</p>
                  <p style ="margin:5px 0;"><strong>Asunto:</strong> '.$Asunto.'</p>
                  <p style ="margin:5px 0;"><strong>Mensaje:</strong> '.$Mensaje.'</p>
                  </td>
                <td width="14"></td>
              </tr>
          <tr style="background:#2770b5; height:21px;">
            <td colspan="5"></td>
          </tr>
        </table></td>
          </tr>
        </table>
        </body>
        </html>
    ';
    $url = '';
    $post = array(
        'id'      => '',
        'key'     => '',
        'subject' => 'Formulario de contacto | '.$Asunto,
        'message' => $html
    );
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $post);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    $result=curl_exec ($ch);
    curl_close ($ch);
    $result=json_decode($result, true);
    print_r($result['status']);

}else{
  echo"Spam attempt, I'm sorry, you can´t do this";
  print_r($_POST);
}
?>
