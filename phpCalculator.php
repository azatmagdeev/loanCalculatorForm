<?
header('Access-Control-Allow-Origin: *');

$mes = '';
foreach ($_POST as $k => $value) {
    $mes .= "<pre>$k : $value</pre>";
};

// Подключаем библиотеку PHPMailer
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;

require 'PHPMailer.php';
require 'SMTP.php';

// Создаем письмо
$mail = new PHPMailer();
$mail->isSMTP();// Отправка через SMTP
$mail->Host   = 'smtp.yandex.ru';  // Адрес SMTP сервера
$mail->SMTPAuth   = true;          // Enable SMTP authentication
$mail->Username   = '';       // ваше имя пользователя (без домена и @)
$mail->Password   = '';    // ваш пароль
$mail->SMTPSecure = 'ssl';         // шифрование ssl
$mail->Port = 465;               // порт подключения
//$mail->SMTPDebug = 1;
$mail->setLanguage('ru');
$mail->CharSet = 'utf-8';

$mail->setFrom('azatmagdeev@ya.ru', 'Иван Иванов');    // от кого
$mail->addAddress('azatmagdeev@gmail.com', 'Вася Петров'); // кому

$mail->Subject = 'Тест';
$mail->msgHTML($mes);

$result = array();

// Отправляем
if ($mail->send()) {
//    echo 'Письмо отправлено!';
    $result['type'] = 'ok';
    $result['message'] = 'Письмо отправлено!';

} else {
    $result['type'] = 'error';
    $result['error'] = $mail->ErrorInfo;
    $result['message'] = 'Письмо не отправлено!';
}
echo json_encode($result);