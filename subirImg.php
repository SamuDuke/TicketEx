<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Content-Type: application/json');

$datos = json_decode($_POST['datos']);
$numero = $datos->id;
$editar = $datos -> editar;
$nombreImg = $datos -> nombreImg;

$img = $_FILES['img'];
$nombreImagen = $img['name'];
$tipoImagen = $img['type'];
$tamanoImagen = $img['size'];
$tempImagen = $img['tmp_name'];

if($editar){
    $nombreImagen = $nombreImg;
}

if ($tamanoImagen > 0) {
    $directorioImagenes = "./img/entradas/";
    $rutaCompletaImagen = $directorioImagenes . $numero . $nombreImagen;
    move_uploaded_file($tempImagen, $rutaCompletaImagen);
}