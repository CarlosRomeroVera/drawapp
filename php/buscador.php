<?php
include_once ("db_config.php");

$match = $_POST['match'];
$sql = "SELECT * FROM visitas where hora_salida IS NULL AND nombre LIKE '%".$match."%'";
$result = mysqli_query($con, $sql);
if ($result) {
   $var = [];
   while($obj = mysqli_fetch_object($result)) {
      $var[] = $obj;
   }
   if (empty($var)) {
      $sql = "SELECT * FROM visitas where hora_salida IS NULL AND dependencia LIKE '%".$match."%'";
      $result = mysqli_query($con, $sql);
      if ($result) {
         $var = [];
         while($obj = mysqli_fetch_object($result)) {
            $var[] = $obj;
         }
      }
      echo '{"persona":'.json_encode($var).'}';
   }else{
         echo '{"persona":'.json_encode($var).'}';
   }

}else{
   echo "Error";
}
mysqli_close($con);

?>