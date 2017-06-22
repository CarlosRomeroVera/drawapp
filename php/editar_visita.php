<?php
require ("db_config.php");

$id = $_POST['id'];
//$user_id = $_POST['user_id'];
$nombre = $_POST['nombre'];
$horallegada = $_POST['horallegada'];
$horasalida = $_POST['horasalida'];

$dependencia = $_POST['dependencia'];
$asunto = $_POST['asunto'];
// $comentarios = $_POST['comentarios'];
$comentarios = str_replace(' ','_',$_POST['comentarios']);
//$evidencia = $_POST['evidencia'];
//$firma = $_POST['firma'];
if ($horasalida == '' || $horasalida == null) {
	$sql="UPDATE visitas
	  SET dependencia = '".$dependencia."', asunto_id = '".$asunto."', hora_entrada = '".$horallegada."', comentarios = '".$comentarios."', nombre = '".$nombre."'
	  WHERE id = '".$id."';";
}else{
	$sql="UPDATE visitas
	  SET dependencia = '".$dependencia."', asunto_id = '".$asunto."', hora_entrada = '".$horallegada."', hora_salida = '".$horasalida."', comentarios = '".$comentarios."', nombre = '".$nombre."'
	  WHERE id = '".$id."';";
}


$result = mysqli_query($con, $sql);
 
if ($result) {
	echo "ok";
}else{
	echo $sql;
}

mysqli_close($con);

?>