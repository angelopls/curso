<?php

define('HOST', 'localhost');
define('USER', 'meut360_curso');
define('PASS', 'doalunoaopresidente');
define('DBNAME', 'meut360_alunos');
define('PORT', 3306);

$pdo = new PDO('mysql:host=' . HOST . ';port=' . PORT . ';dbname=' . DBNAME . ';', USER, PASS);