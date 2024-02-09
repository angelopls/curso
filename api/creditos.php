<?php  
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

error_reporting(E_ALL);
ini_set('display_errors', 'On');

//Recebe Dados do POST
$rd=json_decode(file_get_contents("php://input"),true);

//token e email de acesso do Pagseguro
include_once 'dadosPagseguro.php';

include_once('conexao.php');

if(isset($rd['action']) && $rd['action'] == 'comprarCreditos') {
     gravaPedido();
  }

  if(isset($rd['action']) && $rd['action'] == 'debitaCredito') {
    debitaCredito($rd['distribuidorId'],$rd['clienteEmail']);
 }

  //Registra pedido na tabela creditos_pedidos
//O id do registro será a referência para o pagseguro
function gravaPedido() {

  try {
    global $rd, $pdo;
    $distribuidorId = $rd['distribuidorId'];
    $rd['valor'] = 15.00;
    $qtd = $rd['qtd'];
    $valor = $rd['valor'] * $qtd;

    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  
    $query = "INSERT INTO creditos_pedidos 
              (`distribuidor_id`,`quantidade`,`valor`,`status`) 
        VALUES('$distribuidorId','$qtd','$valor','1')";

    $stmt = $pdo->prepare($query);
    
    $stmt->execute();
    
    //Será usado como referência na transação do pagseguro 
    //servirá de base para a atualização do status do pedido
    //$rd['pedido'] = $pdo->lastInsertId();
    
    $rd['pedido'] = getIdUltimoPedidoDistribuidor($distribuidorId);
    
    if($rd['pedido'])
        comprarCreditos();

    //echo $stmt->rowCount();
  } catch(PDOException $e) {
    echo 'Error: ' . $e->getMessage();
  }
}

//teste
//$distribuidorId='43497133';
//getIdUltimoPedidoDistribuidor($distribuidorId);

function getIdUltimoPedidoDistribuidor($distribuidorId) {
  global $pdo;
  $query = "SELECT * FROM `creditos_pedidos` WHERE distribuidor_id='$distribuidorId' ORDER BY id DESC";
  //echo "Query: {$query}";
  $stm = $pdo->prepare($query);
  $stm->execute();
  $row = $stm -> fetch(PDO::FETCH_ASSOC);
  return $row['id'];   
}
//Obtém o código de checkout do pagseguro
  function comprarCreditos() {
    global $rd;

    $data['token'] = $rd['token'];
    $data['email'] = $rd['email'];
    $data['currency'] = 'BRL';
    $data['itemId1'] =  '1';
    $data['itemDescription1'] = 'Crédito T360';
    $data['itemQuantity1'] = $rd['qtd'];
    $data['itemAmount1'] = '15.00';
    $data['reference'] = $rd['pedido']; 
    $url = 'https://ws.pagseguro.uol.com.br/v2/checkout';
    //$url = 'https://ws.sandbox.pagseguro.uol.com.br/v2/checkout';

    $data = http_build_query($data);

    $curl = curl_init($url);

    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($curl, CURLOPT_POST, true);
    curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
    //curl_setopt($curl, CURLOPT_HTTP_VERSION, CURLOPT_HTTP_VERSION_1_1);

    $xml = curl_exec($curl);

    curl_close($curl);

    $xml = simplexml_load_string($xml);

    echo $xml->code;
  }

  function verificaPedidoExistente($reference) {
    global $pdo;
    $query = "SELECT * FROM `creditos_pedidos` WHERE id ='$reference'";
    $stm = $pdo->prepare($query);
    $stm->execute();
    $row = $stm -> fetch(PDO::FETCH_ASSOC);
    return $row['quantidade'];   
}

function atualizaPedido($reference , $status, $creditos) {
  global $pdo;
  $query = "UPDATE `creditos_pedidos` SET `status` = '$status' WHERE id ='$reference'";
  $stm = $pdo->prepare($query);
  $stm->execute();

  //if status==3 adiciona creditos ao Distribuidor
  if ($status==3) {
    $distribuidorId=getDistribuidorId($reference);
    if($distribuidorId)
        adicionaCreditos($distribuidorId, $creditos);
  }

}

//teste
//adicionaCreditos('43497133',5);

//Adiciona Créditos ao Distribuidor
function adicionaCreditos($distribuidorId, $creditos) {
    global $pdo;
    //Verifica se distribuidor consta na tabela de creditos_disponiveis
    //Se não existir, adiciona distribuidor
    //então adiciona adiciona creditos
    if (!distribuidorExists($distribuidorId)) {
        $query = "INSERT INTO creditos_disponiveis (`distribuidor_id`, `creditos`) VALUES ('$distribuidorId', $creditos)";
        $stm = $pdo->prepare($query);
        $stm->execute();
    } else {
        $query = "UPDATE `creditos_disponiveis` SET `creditos` = creditos + $creditos WHERE distribuidor_id = '$distribuidorId'";
        $stm = $pdo->prepare($query);
        $stm->execute();
    }
}

function distribuidorExists($distribuidorId) {
    global $pdo;
    $query = "SELECT * FROM `creditos_disponiveis` WHERE distribuidor_id ='$distribuidorId'";
    $stm = $pdo->prepare($query);
    $stm->execute();
    $row = $stm -> fetch(PDO::FETCH_ASSOC);
    return $row;   
}

//retorna o Id do distribuidor através do número do pedido
function getDistribuidorId($reference) {
    global $pdo;
    $query = "SELECT * FROM `creditos_pedidos` WHERE id ='$reference'";
    $stm = $pdo->prepare($query);
    $stm->execute();
    $row = $stm -> fetch(PDO::FETCH_ASSOC);
    return $row['distribuidor_id'];   
}

//Recebe as notificações de mudança de status da API do mercadoPago
// e atualiza status do pedido
//Esta função é chamada em retornopagamento.php
function verificaStatusChange($notificationCode) {
    global $rd;
    $data['token'] = $rd['token'];
    $data['email'] = $rd['email'];

    $data = http_build_query($data);

    $url = 'https://ws.pagseguro.uol.com.br/v3/transactions/notifications/'.$notificationCode.'?'.$data;
    //$url = 'https://ws.sandbox.pagseguro.uol.com.br/v3/transactions/notifications/'.$notificationCode.'?'.$data;
    
    $curl = curl_init();
    
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl, CURLOPT_URL, $url);
    $xml = curl_exec($curl);
    curl_close($curl);
    
    $xml = simplexml_load_string($xml);
    
    $reference = $xml->reference;
    $status = $xml->status;
    
    if($reference && $status) {
    
        $creditos = verificaPedidoExistente($reference);
    
        if($creditos)
            atualizaPedido($reference , $status, $creditos);
    }
}

//teste
//debitaCredito('43497133','angelopls@hotmail.com');

function debitaCredito($distribuidorId, $clienteEmail) {
    global $pdo;
    $query = "INSERT INTO creditos_atribuidos (`distribuidor_id`, `aluno`) VALUES ('$distribuidorId', '$clienteEmail')";
    $stm = $pdo->prepare($query);
    $stm->execute();

    $query = "UPDATE `creditos_disponiveis` SET `creditos` = creditos - 1 WHERE distribuidor_id = '$distribuidorId'";
    $stm = $pdo->prepare($query);
    $stm->execute();
}
