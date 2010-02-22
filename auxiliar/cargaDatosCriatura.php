<?php
//
//incluimos el script con las CONSULTAS B�SICAS
include("consultas.php");
$consultaCriatura=consultas();	//recuperamos la que toque...
//llamamos a la funci�n de conexi�n a la BD pues a�n nos queda realizar una conexi�n m�s (la conexi�n ya es� incluida en 'consultas.php')
$conexion=db_connect();
//
$resultadoDatosCriatura=mysql_fetch_array($consultaCriatura);

//a�n tenemos que hacer un par de consultas m�s...
	//recogemos el campo id_familia que lo necesitaremos para la otra consulta
	$id_familia=$resultadoDatosCriatura["id_familia"];
	//es decir, la gama de colores de la familia de criaturas
	$consultaColoresCriatura=mysql_query("SELECT distinct familias.familia, familias.gama_colores FROM familias INNER JOIN criaturas ON familias.id_familia=".$id_familia."", $conexion);
	//
	$resultadoColoresCriatura=mysql_fetch_array($consultaColoresCriatura);
	//
	//el campo tiene los cuatro colores juntos, as� que pasamos a separarlos y meterlos en un array
	$gamaColores=$resultadoColoresCriatura["gama_colores"];
	$gamaColoresCriatura=explode(',',$gamaColores);
	//tambi�n adjuntamos la 'Familia' a la que pertenece
	$familia=$resultadoColoresCriatura["familia"];
	$gfamilia=explode(',',$familia);	
	
	//
	//N�mero total de criaturas (para la GU�A: ANTERIOR/SIGUIENTE)
	$consultaNumTotalCriaturas=mysql_query("SELECT COUNT(*) FROM criaturas");
	$resultadoNumTotalCriaturas=mysql_fetch_row($consultaNumTotalCriaturas);

//
//ahora, s�, ya podemos rellenar el array asociativo JSON a devolver en la petici�n AJAX con los pares clave-valor de todos los datos solicitados
foreach($resultadoDatosCriatura as $codigo => $nombre)
{
	//en cualquier caso s�lo nos interesan los num�ricos (nombre)
	if (!is_numeric($codigo))
	{
		//print_r($codigo."<br />");
		if ($codigo=="id_familia")
		{
			for($i=0;$i<count($gamaColoresCriatura);$i++)
			{
				$elementos_json[] = "\"color$i\": \"$gamaColoresCriatura[$i]\"";	//introducimos con colores en el array asociativo JSON
			}
			//
			$elementos_json[] = "\"familia\": \"$familia\"";	//adjuntamos la 'Familia' a la que pertenece la criatura		
		}
		else
		{
			if ($codigo=="intro")
			{
				//la referencia del intro debe ir en otra l�nea y en negrita
				$nombre=str_replace(".De ",".<br /><br /><strong>De ",$nombre);
				$nombre=str_replace("Mario Palomino Gordon","Aydim Dagam",$nombre);
			}
			//cuando el campo de la BD est&eacute; vac&ioacute;o pondremos 'en construcci&oacute;n'
			if ($nombre==null && $nombre !="restriccion")	$nombre="<em>Referencia en construcci&oacute;n. Perdonen las molestias</em>.";
			//introducimos el resto de campos de la consulta
			$elementos_json[] = "\"$codigo\": \"$nombre\"";
		}
	}
}
//y finalmente introducimos el n�mero total de criaturas
$elementos_json[] = "\"NumTotalCriaturas\": \"$resultadoNumTotalCriaturas[0]\"";

//
$criatura_json = "{".implode(",", $elementos_json)."}";
//
echo utf8_encode($criatura_json);

?>