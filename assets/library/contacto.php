<?php

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Recoger los datos del formulario
    $nombres    = $_POST['nombres'];
    $telefono   = $_POST['telefono'];
    $email      = $_POST['email'];
    $comentario = $_POST['comentario'];

    // Asunto del correo
    $subject = "Formulario de Contacto";

    // Crear el contenido HTML del mensaje
    $html = "
    <!DOCTYPE html>
    <html lang='en'>
    <head>
        <meta http-equiv='Content-Type' content='text/html; charset=utf-8' />
        <title>$subject</title>
    </head>
    <body>
        <table width='100%' height='100%' border='0' cellpadding='0' cellspacing='0'>
            <tr>
                <td>
                    <table border='0' cellspacing='0' cellpadding='0' width='600' align='center'>
                        <tr style='background:#2770b5; height:21px;'>
                            <td colspan='5'></td>
                        </tr>
                        <tr>
                            <td width='17'></td>
                            <td width='569' colspan='3' valign='top' style='font-family:Arial, Helvetica, sans-serif; font-size:14px;'>
                                <p><strong>Nombre:</strong> $nombres</p>
                                <p><strong>Teléfono:</strong> $telefono</p>
                                <p><strong>Email:</strong> $email</p>
                                <p><strong>Comentario:</strong> $comentario</p>
                            </td>
                            <td width='14'></td>
                        </tr>
                        <tr style='background:#2770b5; height:21px;'>
                            <td colspan='5'></td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>";

    // Definir la URL y los datos POST
    $url = 'https://bloque9.email/v1/send/';  // Reemplaza con la URL correcta
    $post = array(
        'id'      => '4zctpkrgzl1v1rra',    // ID correcto
        'key'     => 'lhuwxnlbrmjwvi6f',    // Llave API correcta
        'subject' => $subject,
        'message' => $html
    );

    // Enviar solicitud con cURL
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $post);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    $result = curl_exec($ch);

    // Verificar si hay errores en cURL
    if (curl_errno($ch)) {
        $error_msg = curl_error($ch);
        curl_close($ch);
        echo json_encode(['success' => false, 'error' => $error_msg]);
        exit;
    }

    // Cerrar cURL
    curl_close($ch);

    // Decodificar la respuesta y devolverla en formato JSON
    $result = json_decode($result, true);
    if (isset($result['status']) && $result['status'] === '1') {
        echo json_encode(['success' => true, 'message' => 'Correo enviado correctamente.']);
    } else {
        echo json_encode(['success' => false, 'error' => 'Error al enviar el correo.']);
    }
}

?>
