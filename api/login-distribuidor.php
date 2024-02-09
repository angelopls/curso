<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

error_reporting(E_ALL);
ini_set('display_errors', 'On');

include 'conexao.php';

//Recebe Dados do POST
$rd=json_decode(file_get_contents("php://input"),true);
$action=$rd['action']; //$_GET['action'];
$email=$rd['email'];
$senha=$rd['senha'];

if(isset($action) && $action=='loginDistribuidor') {
    $email=$rd['email'];
    $senha=$rd['senha'];

    if(isset($email) && isset($senha))
    loginDistribuidor($email,$senha);
}

function loginDistribuidor($email,$senha) {
    global $pdo;

    $query="SELECT name as nome, email FROM distribuidores where `identificador`='$email' && `senha`='$senha'";

    try {
        $stm = $pdo->prepare($query);
        $stm->execute();
        $row = $stm -> fetch();
        echo json_encode($row);
    }  catch (PDOException $e) {
        echo $e->getMessage();
    }
}
