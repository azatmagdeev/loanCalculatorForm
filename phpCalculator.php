<?
$mes = 'azat</br>$_POST=<pre>'.print_r($_POST, true)."</pre>"; //todo remove it


// Подключаем библиотеку PHPMailer
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
require 'PHPMailer.php';
require 'SMTP.php';

// Создаем письмо
$mail = new PHPMailer();
$mail->isSMTP();// Отправка через SMTP
$mail->
$mail->Host   = 'smtp.yandex.ru';  // Адрес SMTP сервера
$mail->SMTPAuth   = true;          // Enable SMTP authentication
$mail->Username   = 'azatmagdeev';       // ваше имя пользователя (без домена и @)
$mail->Password   = 'akbaj22443226!';    // ваш пароль
$mail->SMTPSecure = 'ssl';         // шифрование ssl
$mail->Port   = 465;               // порт подключения
$mail->SMTPDebug = 1;

$mail->setFrom('azatmagdeev@ya.ru', 'Иван Иванов');    // от кого
$mail->addAddress('azatmagdeev@gmail.com', 'Вася Петров'); // кому

$mail->Subject = 'Тест';
$mail->msgHTML($mes);
// Отправляем
if ($mail->send()) {
    echo 'Письмо отправлено!';
} else {
    echo 'Ошибка: ' . $mail->ErrorInfo;
}

