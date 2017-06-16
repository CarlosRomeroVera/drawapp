<?php
include_once ("db_config.php");

$id = $_POST['id'];
$sql = "SELECT * FROM visitas where id = '".$id."'";
$result = mysqli_query($con, $sql);
if ($result) {
   $var = [];
   while($obj = mysqli_fetch_object($result)) {
      $var[] = $obj;
   }
   echo '{"persona":'.json_encode($var).'}';
}else{
   echo "Error";
}
mysqli_close($con);

?>