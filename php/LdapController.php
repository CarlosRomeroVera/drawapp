<?php

/*

Lista de atributos devueltos en caso de encontrar al usuario en el DA.

0.- objectclass
1.- cn
2.- sn
3.- telephonenumber
4.- givenname
5.- instancetype
6.- instancetype
7.- whencreated
8.- whenchanged
9.- displayname
10.- usncreated
11.- memberof
12.- usnchanged
13.- name                  // Parece ser que es lo mismo que displayname
14.- objectguid
15.- useraccountcontrol
16.- badpwdcount
17.- codepage
18.- countrycode
19.- badpasswordtime
20.- lastlogoff
21.- lastlogon
22.- pwdlastset
23.- primarygroupid
24.- userparameters
25.- objectsid
26.- admincount
27.- accountexpires
28.- logoncount
29.- samaccountname
30.- samaccounttype
31.- userprincipalname
32.- objectcategory
33.- dscorepropagationdata
34.- lastlogontimestamp
35.- mail




*/


class LDAPda{

   var $base_dn = "OU=Tribunal Superior de Justicia,DC=tsjqroo,DC=gob,DC=mx";
   var $servidor_da = "10.75.91.9";
   var $Usuario = "consultausr@tsjqroo.gob.mx"; //consultausr
   var $Password= "Tr1bunal11";
   var $Password_Admin = "Tr1bunal11";
   var $base_dn_admin = "OU=Tribunal Superior de Justicia,DC=tsjqroo,DC=gob,DC=mx"; 
   var $Conexion = NULL;
   var $Enlace = NULL;   //guardara el resultado de la funcion ldap_bind
   
   var $Atributos = array();
   
   function LDAPda ($base_dn,$base_dn_admin, $password_admin, $server_da){
     $this->base_dn = $base_dn;
	 $this->base_dn_admin = $base_dn_admin;
	 $this->servidor_da = $server_da;
	 $this->Password_Admin = $password_admin;
	 
	   return ($this->Conectar());
   
   }
   
   function Conectar(){
   
      $this->Conexion = ldap_connect($this->servidor_da);
	  $this->Enlace = ldap_bind($this->Conexion,$this->base_dn_admin,$this->Password_Admin);
	  
	  if ($this->Enlace)
	  		return true;
	  else{
	  		echo ("Error en la autenticaci&oacute;n del usuario de lectura");
	  		return false;
	  }
   }
   
  
  function Cerrar(){
   		ldap_close($this->Conexion);
   }
   
   
   function BuscaUsuario($NombreUsuario=""){

	  $Resultado=ldap_search($this->Conexion,$this->base_dn,  "(sAMAccountName=$NombreUsuario)"); 

	   $this->Atributos = ldap_get_entries($this->Conexion, $Resultado);
	   if (($this->Atributos['count'])== 1){
		return true;
	   }
	   else{
		return false;
	   }
	   
	   //print_r($this->Atributos);exit;
		
	 /* if ($Resultado){
	   		//$this->Atributos = ldap_get_entries($this->Conexion, $Resultado);
			//print_r($this->Atributos);exit;
	   }
	   else{
	   		//echo "Usuario no encontrado";
			return false;
	   }*/
	   
	   return ($Resultado);
   }
   
   function AutentificaUsuario($NombreUsuario="", $Password=""){
   		
		if ($NombreUsuario == "" || $Password == "") 
		return (false);
		
		$Resultado = $this->BuscaUsuario ($NombreUsuario);
		
		if ($Resultado == true){
			// Si encuentra el usuario se toma su dn para posteriormente hacer la autenticacion
			
			//echo $this->Atributos[0]['dn'];
			
			//La posicion 0 del arreglo atributos es el primer registro encontrado, para este caso siempre sera un registro en caso de encontrar al usuario
			// ya que se esta especificando el nombre de usuario que en el DA es unico.			
			@$ResultadoAut = ldap_bind($this->Conexion,$this->Atributos[0]['dn'],$Password);
		
			if ($ResultadoAut){
				return true;
			}
			else{
				return false;	
			}
		}
 
   }

}


?>