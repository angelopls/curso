<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

error_reporting(E_ALL);
ini_set('display_errors', 'On');

include 'conexao.php';

//Recebe Dados do POST
$rd=json_decode(file_get_contents("php://input"),true);
$action=$rd['action']; //$_GET['action'];

if(isset($action) && $action=='getAulas') {
    $categoria=$rd['categoria'];//$_GET['categoria'];
    if(isset($categoria))
        getAulas($categoria);
}

if(isset($action) && $action=='getAllAulas') {
    getAllAulas();
}

if(isset($action) && $action=='getCategorias') {
    getCategorias();
}

if(isset($action) && $action=='deleteAula') {
    deleteAula($rd['id']);
}

if(isset($action) && $action=='insertAula') {
    insertAula();
}

if(isset($action) && $action=='updateAula') {
    updateAula();
}

if(isset($action) && $action=='gravaAulaAssistida') {
    if(isset($rd['emailAluno']) && isset($rd['idAula']))
        gravaAulaAssistida($rd['emailAluno'],$rd['idAula']);
}

function gravaAulaAssistida($emailAluno,$idAula) {
    global $pdo;
    try {
        $query = "INSERT INTO `aulas_assistidas` (`emailAluno`,`id_aula`) VALUES ('$emailAluno','$idAula')";
        echo $query;
        $stm = $pdo->prepare($query);
        $stm->execute();
    } catch(PDOException $e) {
       echo 'Error: ' . $e->getMessage();
  }
}

function insertAula() {
    global $pdo, $rd;
    $titulo=$rd['titulo'];
    $categoria=$rd['categoria'];
    $link=$rd['link'];
    $query = "INSERT INTO `aulas` (`titulo`,`categoria`,`link_video`) VALUES ('$titulo','$categoria','$link')";
    $stm = $pdo->prepare($query);
    $stm->execute();
    echo 'Aula adicionada com sucesso';
}

function updateAula() {
    global $pdo, $rd;
    $titulo=$rd['titulo'];
    $categoria=$rd['categoria'];
    $link=$rd['link'];
    $id=$rd['id'];
    $query = "UPDATE `aulas` SET `titulo`='$titulo', `categoria`='$categoria',`link_video`='$link' WHERE id='$id'";
    $stm = $pdo->prepare($query);
    $stm->execute();
    echo 'Aula atualizada com sucesso';
}

//getAulas('Treinos Online');

function getAulas($categoria) {
    global $pdo;
    $query = "SELECT * FROM `aulas` where `categoria`='$categoria'";
    //echo $query;
    $stm = $pdo->prepare($query);
    $stm->execute();
    $rows = $stm -> fetchAll();
    echo json_encode($rows);
}

function getAllAulas() {
    global $pdo;
    $query = "SELECT * FROM `aulas`";
    $stm = $pdo->prepare($query);
    $stm->execute();
    $rows = $stm -> fetchAll();
    echo json_encode($rows);
}

function getCategorias() {
    global $pdo;
    $query = "SELECT * FROM `categorias`";
    $stm = $pdo->prepare($query);
    $stm->execute();
    $rows = $stm -> fetchAll();
    echo json_encode($rows);
}

function deleteAula($id) {
    global $pdo;
    $query = "DELETE FROM `aulas` WHERE id='$id'";
    $stm = $pdo->prepare($query);
    $stm->execute();
    echo 'Aula deletada com sucesso';
}