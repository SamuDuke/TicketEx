<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Content-Type: application/json');

$img = $_FILES['img'];
$nombreImagen = $img['name'];
$tipoImagen = $img['type'];
$tamanoImagen = $img['size'];
$tempImagen = $img['tmp_name'];

if ($tamanoImagen > 0) {
    $directorioImagenes = "./img/eventos/";
    $rutaCompletaImagen = $directorioImagenes . $nombreImagen;
    move_uploaded_file($tempImagen, $rutaCompletaImagen);
}