<?php
include_once ("db_config.php");

   if($_SERVER["REQUEST_METHOD"] == 'POST'){
      // username and password sent from form 
      $username = mysqli_real_escape_string($con,$_POST['user']);
      $password = mysqli_real_escape_string($con,$_POST['pass']); 

      $sql = "SELECT * FROM users WHERE username = '$username';";

      $result = mysqli_query($con,$sql);
      $contra;
      while($obj = mysqli_fetch_object($result)){
         $var[] = $obj;
         $contra = $obj->password;
      }

      if (password_verify(@$password, @$contra)) {
         //echo '¡La contraseña es válida!';
         $row = mysqli_fetch_array($result,MYSQLI_ASSOC);
         $count = mysqli_num_rows($result);
         
         if($count == 1){
            echo '{"user":'.json_encode($var).'}';
         }
         else{
            echo '{"user":[{"info": "Incorrecto"}]}';
         }
      } 
      else {
          echo '{"user":[{"info": "Incorrecto"}]}';
      }

   }

//require ("LdapController.php");
// include_once ("db_config.php");

// if($_SERVER["REQUEST_METHOD"] == 'POST'){
//       // username and password sent from form 
//       $username = mysqli_real_escape_string($con,$_POST['user']);
//       $password = mysqli_real_escape_string($con,$_POST['pass']); 

//       $ldaprdn  = 'cn='.$username.',cn=Programadores,ou=SuperAdmin,dc=sm2consultores,dc=com';     // ldap rdn or dn
//       $ldappass = $password;  // associated password

//       // conexión al servidor LDAP
//       $ldapconn = ldap_connect("ldap.sm2consultores.com")
//           or die("Could not connect to LDAP server.");

//       if ($ldapconn) {

//           // realizando la autenticación
//           $ldapbind = @ldap_bind($ldapconn, $ldaprdn, $ldappass);

//           if ($ldapbind) {
//               echo '{"user":[{"id": "'.$username.'","username": "'.$username.'"}]}';
//           } else {
//               echo '{"user":[{"info": "Incorrecto"}]}';
//           }

//       }

// }  

?>

