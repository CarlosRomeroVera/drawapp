<?php
require ("db_config.php");

$id = $_POST['id'];
$user_id = $_POST['user_id'];
$nombre = $_POST['nombre'];
$horallegada = $_POST['horallegada'];
$horasalida = $_POST['horasalida'];
$dependencia = $_POST['dependencia'];
$asunto = $_POST['asunto'];
$comentarios = $_POST['comentarios'];
$evidencia = $_POST['evidencia'];
$firma = $_POST['firma'];
 
$sql="INSERT INTO visitas (id, user_id, dependencia, asunto_id, hora_entrada, hora_salida, comentarios, evidencia, firma, nombre, activo) VALUES ('".$id."', '".$user_id."', '".$dependencia."', '".$asunto."', '".$horallegada."', '".$horasalida."', '".$comentarios."', '".$evidencia."', '".$firma."', '".$nombre."', '1');";

$result = mysqli_query($con, $sql);
 
if ($result) {
	echo "ok";
}else{
	echo $sql;
}

mysqli_close($con);

?>