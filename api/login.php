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


if(isset($action) && $action=='getAluno') {
    if(isset($email) && isset($senha))
        getAluno($email,$senha);
}

if(isset($action) && $action=='insertAluno') {
    if(isset($email) && isset($senha) && isset($nome))
        insertAluno($nome,$email,$senha);
}

if(isset($action) && $action=='getAlunoData') {
    $email=$rd['email'];
    $senha=$rd['senha'];

    if(isset($email) && isset($senha))
        getAlunoData($email,$senha);
}

function getAlunoData($email,$senha) {
    global $pdo;

    $query="SELECT nome, email, data_ingresso,
    CASE WHEN data_ingresso > DATE_SUB(NOW(), INTERVAL 1 YEAR) THEN 'OK' ELSE 'Vencido' END AS recente
    FROM dados_usuario where `email`='$email' && `senha`='$senha'
    ORDER BY `recente`";

    try {
        $stm = $pdo->prepare($query);
        $stm->execute();
        $row = $stm -> fetch();
        echo json_encode($row);
    }  catch (PDOException $e) {
        echo $e->getMessage();
    }
}

function getAluno($email,$senha) {
    global $pdo;
    $query = "SELECT * FROM `dados_usuario` where `email`='$email' && `senha`='$senha'";
    //echo $query;
    $stm = $pdo->prepare($query);
    $stm->execute();
    $row = $stm -> fetch();
    echo json_encode($row);
}

function insertAluno($nome,$email,$senha) {
    global $pdo;
    $query = "INSERT INTO `dados_usuario` (`nome`,`senha`,`email`) values ('$nome','$senha','$email')";
    //echo $query;
    $stm = $pdo->prepare($query);
    $stm->execute();
}