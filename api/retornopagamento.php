<?php
//Recebe as alterações dos status das transações do pagseguro

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

error_reporting(E_ALL);
ini_set('display_errors', 'On');

if(isset($_POST["notificationCode"]))
    $notificationCode = preg_replace('/[^[:alnum:]-]/','',$_POST["notificationCode"]);

if(isset($notificationCode) && $notificationCode) {

    include_once 'creditos.php';

    verificaStatusChange($notificationCode);

}

