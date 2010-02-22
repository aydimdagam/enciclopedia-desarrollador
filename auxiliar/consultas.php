<?php
//
function consultas()
{
	//Conectamos a la base de datos
	include("conexion.php");
	$conexion=db_connect();
	//
	foreach ($_POST as $key => $value)
	{
		switch($key)
		{
			case "nombreCriatura":
				$nombreCriatura=$_POST["nombreCriatura"];
				$putosAnglosajones=strtr(utf8_decode($nombreCriatura),"‡Ћ’—њзѓкотЉ‘љџЂи…†”ћлу–„","aeiouAEIOUaeouAEOUiuIUnN");	//sin acentos hace la consulta igual...
				//realizamos la consulta para conseguir los datos de la CRIATURA
				$consultaCriatura=mysql_query("SELECT id, nombre, intro, descripcion, notas, id_familia, restriccion FROM criaturas WHERE nombre='".$putosAnglosajones."'", $conexion);			
				break;
			case "criaturaSeleccionada":
				$nombreCriatura=$_POST["criaturaSeleccionada"];
				$putosAnglosajones=strtr(utf8_decode($nombreCriatura),"‡Ћ’—њзѓкотЉ‘љџЂи…†”ћлу–„","aeiouAEIOUaeouAEOUiuIUnN");	//sin acentos hace la consulta igual...
				//realizamos la consulta para conseguir los datos de la CRIATURA
				$consultaCriatura=mysql_query("SELECT id, nombre, intro, descripcion, notas, id_familia, restriccion FROM criaturas WHERE nombre='".$putosAnglosajones."'", $conexion);			
				break;							
			case "numAleatorio":
				$numAleatorio=$_POST["numAleatorio"];
				//realizamos la consulta para conseguir los datos de la CRIATURA
				$consultaCriatura=mysql_query("SELECT id, nombre, intro, descripcion, notas, id_familia, restriccion FROM criaturas WHERE id='".(int)$numAleatorio."'", $conexion);
				break;
			case "idCriatura":
				$idCriatura=$_POST["idCriatura"];
				//realizamos la consulta para conseguir los datos de la CRIATURA en cuesti—n
				$consultaCriatura=mysql_query("SELECT nombre, intro, descripcion, notas, id_familia, restriccion FROM criaturas WHERE id='".(int)$idCriatura."'", $conexion);
				break;			
			default:
				break;		
		}
	}
	//
	return $consultaCriatura;
}

?>