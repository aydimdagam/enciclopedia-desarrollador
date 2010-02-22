<?php
//
//incluimos el script con las CONSULTAS BÁSICAS
include("consultas.php");
$consultaCriatura=consultas();	//recuperamos la que toque...
//llamamos a la función de conexión a la BD pues aún nos queda realizar una conexión más (la conexión ya esá incluida en 'consultas.php')
$conexion=db_connect();
//
$resultadoDatosCriatura=mysql_fetch_array($consultaCriatura);

//aún tenemos que hacer un par de consultas más...
	//recogemos el campo id_familia que lo necesitaremos para la otra consulta
	$id_familia=$resultadoDatosCriatura["id_familia"];
	//es decir, la gama de colores de la familia de criaturas
	$consultaColoresCriatura=mysql_query("SELECT distinct familias.familia, familias.gama_colores FROM familias INNER JOIN criaturas ON familias.id_familia=".$id_familia."", $conexion);
	//
	$resultadoColoresCriatura=mysql_fetch_array($consultaColoresCriatura);
	//
	//el campo tiene los cuatro colores juntos, asÌ que pasamos a separarlos y meterlos en un array
	$gamaColores=$resultadoColoresCriatura["gama_colores"];
	$gamaColoresCriatura=explode(',',$gamaColores);
	//también adjuntamos la 'Familia' a la que pertenece
	$familia=$resultadoColoresCriatura["familia"];
	$gfamilia=explode(',',$familia);	
	
	//
	//Número total de criaturas (para la GUÍA: ANTERIOR/SIGUIENTE)
	$consultaNumTotalCriaturas=mysql_query("SELECT COUNT(*) FROM criaturas");
	$resultadoNumTotalCriaturas=mysql_fetch_row($consultaNumTotalCriaturas);

//
//ahora, sí, ya podemos rellenar el array asociativo JSON a devolver en la petición AJAX con los pares clave-valor de todos los datos solicitados
foreach($resultadoDatosCriatura as $codigo => $nombre)
{
	//en cualquier caso sólo nos interesan los numéricos (nombre)
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
				//la referencia del intro debe ir en otra lÌnea y en negrita
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
//y finalmente introducimos el número total de criaturas
$elementos_json[] = "\"NumTotalCriaturas\": \"$resultadoNumTotalCriaturas[0]\"";

//
$criatura_json = "{".implode(",", $elementos_json)."}";
//
echo utf8_encode($criatura_json);

?>