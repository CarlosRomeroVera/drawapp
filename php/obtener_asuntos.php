<?php
include_once ("db_config.php");

$sql = "SELECT * FROM asuntos where activo ='1'";
$result = mysqli_query($con, $sql);
if ($result) {
   $var = [];
   while($obj = mysqli_fetch_object($result)) {
      $var[] = $obj;
   }

   echo '{"asunto":'.json_encode($var).'}';

}else{
   echo "Error";
}
mysqli_close($con);

?>