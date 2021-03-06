//
//inicializamos el objeto XMLHttpRequest
var peticion=null;
//
//las FAMILIAS se CARGAN en el evento onload
//
//MOSTRAMOS las FAMILIAS de Criaturas
function muestraFamilias(peticion)
{
  if (peticion.readyState==4)
  {
    if (peticion.status==200)
    {
		var oJSON=peticion.responseText;		//recuperamos el objeto JSON
		var familias=JSON.parse(oJSON);
		//
		var desgloseFamilias=$H(familias);		//usaremos Prototype para tener bien desglosados los datos selecionados (por clave-valor)
		var claves=desgloseFamilias.keys();
		var valores=desgloseFamilias.values();
		//
		$("familia").options[0] = new Option("- Tipo de criaturas -");
		for(var i=0;i<desgloseFamilias.size();i++)
		{
			$("familia").options[i+1] = new Option(valores[i], claves[i]);
		}
    }
  }
}

//CARGAMOS las CRIATURAS
function cargaCriaturas(){
		new Ajax.Request("auxiliar/cargaCriaturas.php?nocache=" + Math.random(), {		//usamos nomenclatura Prototype
		method: 'POST',
		requestHeaders:{Accept: 'application/json'},
		parameters: 'familia='+$F("familia"),
		onSuccess: muestraCriaturas
		});
}

//MOSTRAMOS las CRIATURAS
function muestraCriaturas(peticion)
{
  if (peticion.readyState == 4)
  {
	    if (peticion.status == 200)
	    {
			var oJSON=peticion.responseText;		//recuperamos el objeto JSON
			var criaturas=JSON.parse(oJSON);
			//
			var desgloseCriatura=$H(criaturas);		//usamos Prototype para tener bien desglosados los datos selecionados (por clave-valor)
			var claves=desgloseCriatura.keys();
			var valores=desgloseCriatura.values();
			//	
			$("criatura").options.length=0;			//reiniciamos la lista para adecuarla al nuevo n�mero de elementos
			$("criatura").options[0] = new Option("- Criatura -");
			for(var i=0;i<desgloseCriatura.size();i++)
			{
				$("criatura").options[i+1] = new Option(valores[i], claves[i]);
			}
	    }
  	}
}

//
//CARGAMOS los DATOS de la Criatura elegida desde la lista
function cargaDatosCriatura(){
	var lista = $("criatura");
	var nombreCriatura = lista.options[lista.selectedIndex].text;
	new Ajax.Request("auxiliar/cargaDatosCriatura.php?nocache=" + Math.random(), {
	method: 'POST',
	requestHeaders:{Accept: 'application/json'},
	parameters: 'nombreCriatura='+nombreCriatura,
	onSuccess: muestraDatosCriatura
	});
	//
	sessvars.criatura = nombreCriatura;	//guardamos el nombre de la criatura en una variable de SESI�N (ver 'sessvars.js')
}

//CARGAMOS los DATOS de la Criatura elegida desde BUSCAR
function cargaDatosCriaturaBuscar(){
	new Ajax.Request("auxiliar/cargaDatosCriatura.php?nocache=" + Math.random(), {
	method: 'POST',
	requestHeaders:{'Content-Type' : 'application/x-www-form-urlencoded'},
	parameters: 'nombreCriatura='+criaturaSeleccionada,
	onSuccess: muestraDatosCriatura
	});
	//
	sessvars.criatura = criaturaSeleccionada;	//guardamos el nombre de la criatura en una variable de SESI�N (gracias a sessvars.js)
}

//CARGAMOS los DATOS de la Criatura elegida desde la variable de SESI�N
function cargarCriaturaDesdeSesion(){
	new Ajax.Request("auxiliar/cargaDatosCriatura.php?nocache=" + Math.random(), {
		method: 'POST',
		requestHeaders:{'Content-Type' : 'application/x-www-form-urlencoded'},
		parameters: 'nombreCriatura='+sessvars.criatura,
		onSuccess: muestraDatosCriatura
		});
}

//
//
//CARGAMOS los DATOS de la Criatura ALEATORIA elegida desde el enlace
function cargarCriaturaAleatoria() {
	//consulta el numero de campos de la BD: generamos un valor aleatorio entre 0 y el n�mero de campos y se lo pasamos para que busque por 'id'
	var numAleatorio=Math.floor(Math.random()*150);
	//
	new Ajax.Request("auxiliar/cargaDatosCriatura.php?nocache=" + Math.random(), {		//usamos nomenclatura Prototype
		method: 'POST',
		requestHeaders:{'Content-Type' : 'application/x-www-form-urlencoded'},
		parameters: 'numAleatorio=' + numAleatorio,
		onSuccess: muestraDatosCriatura
		});
}

//CARGAMOS los DATOS de la Criatura elegida desde la variable de SESI�N
//y asignamos la funcionalidad de los ENLACES ANTERIOR/SIGUIENTE
function cargarCriaturaPorID(event)
{
	var element=Event.element(event);	//capturamos el elemento que produce el evento
	//
	if (sessvars.idCriatura==1)
	{
		if (element.className=="anterior")			//si es el de id anterior...
		{
			var idCriatura=sessvars.NumTotalCriaturas;	//sacamos el id de la variable de sesi�n y lo decrementamos
			sessvars.idCriatura=idCriatura;					//volvemos a actualizar la variable de sesi�n con el nuevo id
		}
		else if (element.className=="siguiente")	//si es el de id siguiente...
		{
			var idCriatura=parseInt(sessvars.idCriatura)+1;		//sacamos el id de la variable de sesi�n y lo incrementamos
			sessvars.idCriatura=idCriatura;						//volvemos a actualizar la variable de sesi�n con el nuevo id
		}
	}		
	else if (sessvars.idCriatura==sessvars.NumTotalCriaturas)
	{
		if (element.className=="anterior")			//si es el de id anterior...
		{
			var idCriatura=parseInt(sessvars.idCriatura)-1;	//sacamos el id de la variable de sesi�n y lo decrementamos
			sessvars.idCriatura=idCriatura;					//volvemos a actualizar la variable de sesi�n con el nuevo id
		}
		else if (element.className=="siguiente")	//si es el de id siguiente...
		{
			var idCriatura=1;		//sacamos el id de la variable de sesi�n y lo incrementamos
			sessvars.idCriatura=idCriatura;						//volvemos a actualizar la variable de sesi�n con el nuevo id
		}
	}		
	else
	{
		if (element.className=="anterior")			//si es el de id anterior...
		{
			var idCriatura=parseInt(sessvars.idCriatura)-1;	//sacamos el id de la variable de sesi�n y lo decrementamos
			sessvars.idCriatura=idCriatura;					//volvemos a actualizar la variable de sesi�n con el nuevo id
		}
		else if (element.className=="siguiente")	//si es el de id siguiente...
		{
			var idCriatura=parseInt(sessvars.idCriatura)+1;		//sacamos el id de la variable de sesi�n y lo incrementamos
			sessvars.idCriatura=idCriatura;						//volvemos a actualizar la variable de sesi�n con el nuevo id
		}
	}
	//
	new Ajax.Request("auxiliar/cargaDatosCriatura.php?nocache=" + Math.random(), {
		method: 'POST',
		requestHeaders:{'Content-Type' : 'application/x-www-form-urlencoded'},
		parameters: 'idCriatura='+idCriatura,
		onSuccess: muestraDatosCriatura
		});
}
//
//
//SUSTITUCI�N DE CARACTERES EXTRA�OS (para la URL de las im�genes de cada criatura)
//el array de pares-valor a sustituir en una cadena (con su valor UNICODE) 
var CharsTranslation = {'\u00e1' : 'a','\u00e9' : 'e','\u00ed' : 'i', '\u00f3' : 'o', '\u00fa' : 'u', 
						'\u00c1' : 'A', '\u00c9' : 'E', '\u00cd' : 'I', '\u00d3' : 'O', '\u00da' : 'U', 
						'\u00E4' : 'a', '\u00EB' : 'e', '\u00EF' : 'i', '\u00F6' : 'o', '\u00FC' : 'u',
						'\u00C4' : 'A', '\u00CB' : 'E', '\u00CF' : 'I', '\u00D6' : 'O', '\u00CC' : 'U',
						'\u00EE' : 'i', '\u00FB' : 'u', '\u00CE' : 'I', '\u00DB' : 'U', '\u00f1' : 'n', '\u00d1' : 'N', ' ': '-'};
//
//y la funci�n para sustituir caracter extra�os en una cadena
function sustituirCaracteresChungos(cadena, listaValores)
{
  for(var indice in listaValores) {
	  cadena=String(cadena).replace(new RegExp(indice, "g"), listaValores[indice]);
  }
  //
  return cadena;
}

//
//APLICAMOS gama de COLORES a cada CRIATURA (mediante estilos CSS) 
//se le pasa la gama de colores de cada familia de criaturas (extra�do de la BD)
function aplicarColoresCriatura(color0, color1, color2)
{
	//backgrounds de los diferentes divs
	document.body.style.background=color1;				//FONDO
	$("column-content").style.background=color1;		//DIV dcha
	$("imagen").style.background=color0;				//imagen
	$("imagen").style.opacity=0.7;						//imagen: opacidad
	$("content").style.background=color2;				//DIV contenid
	$("cabecera").style.background=color2;				//DIV contenido
	$("contenido").style.background=color2;				//DIV contenido
	//
	$("imageDataContainer").style.background=color1;	//color del contenedor de la imagen en grande (LightBox)
	$("outerImageContainer").style.background=color1;	//color del borde de abajo en la imagen en grande (LightBox)
	//
	//letras en los divs
	$("contenido").style.color=color1;		//
	$("restriccion").style.color=color1;	//
	$("nombre").style.color=color1;			//el nombre: color base	
	$("columna-uno").style.color=color2;	//izquierda: color claro
	$("aleatoria").style.color=color2;		//aleatoria: color claro
	$("intro").style.color=color0;			//intro: color oscuro
	$("tipo").style.color=color1;
	//
	var guias=$$("#content .guia ul li");			//enlaces ANTERIOR/SIGUIENTE
	guias.each(function(guias)
	{
		guias.style.color=color1;
	});
	//ETIQUETAS
	var enlaces=$$("a");
	enlaces.each(function(enlaces)
	{
		enlaces.style.textDecoration="none";
		enlaces.style.color=color2;
	});
	//
	$$("#volver-arriba a")[0].style.color=color1;	//color para el enlace volver arriba
	$$("h1")[0].style.color=color2;					//color para el t�tulo principal de la p�gina: Enciclopedia de Criaturas
	//
	//PESTA�AS
	var tabs=$$('#tabs ul li');
	tabs.each(function(tabs)
	{
		tabs.style.background=color2;	//pesta�as (LI)
		tabs.style.color=color1;
	});	
	//
	//FORM
	var etiquetas=$$("label");
	etiquetas.each(function(etiquetas)
	{
		etiquetas.style.color=color2;
	});
	//
	var listas=$$("select");
	listas.each(function(listas)
	{		
		listas.style.borderColor=color2;
	});
	//
	$$("input")[0].style.borderColor=color2;
	//
	//WIKIPEDIA
}

//
//Funci�n para convertir la primera letra de la cadena a may�sculas
function primeraMayuscula(string){
	 return string.substr(0,1).toUpperCase()+string.substr(1,string.length).toLowerCase();
}

//MOSTRAMOS los DATOS de la criatura elegida
function muestraDatosCriatura(peticion)
{
	if (peticion.readyState == 4)
	{
		if (peticion.status == 200) 
		{
			//
			var oJSON=peticion.responseText;			
			var datosCriatura=JSON.parse(oJSON);
			//
			var desgloseDatosCriatura=$H(datosCriatura);	//usaremos Prototype para tener bien desglados los datos seleccionados (por clave-valor)
			var claves=desgloseDatosCriatura.keys();
			var valores=desgloseDatosCriatura.values();
			//
			for(var i=0;i<desgloseDatosCriatura.size();i++)
			{
				switch(claves[i])
				{
					case "id":
						//guardamos el id de la criatura para posteriormente poder acceder a la anterior/ siguiente											
						sessvars.idCriatura=valores[i];
						//y habilitamos la funcionalidad ANTERIOR/SIGUIENTE
						var siguienteAnterior=$$("#content .guia ul li");		//seleccionamos las pesta�as mediante funci�n Prototype
						siguienteAnterior.each(function(siguienteAnterior)
						{
							siguienteAnterior.style.display="inline";
							siguienteAnterior.style.cursor="pointer";	//emulamos que sean pinchables
							siguienteAnterior.style.cursor="hand";		//les asignamos cursor, ya que no son enlaces normales y por defecto no lo tienen					
							Event.observe(siguienteAnterior, "click", cargarCriaturaPorID);
						});					
						break;
					case "nombre":
						var imagen=sustituirCaracteresChungos(valores[i], CharsTranslation);						
						$("imagen").innerHTML="<a href=\"imagenes/" + imagen.toLowerCase() + 
						".jpg\" rel=\"lightbox\"><img width=\"400\" height=\"400\" border=\"0\" src=\"imagenes/" + imagen.toLowerCase() + ".jpg\" /></a>";						
						//
						$(claves[i]).innerHTML="";
						var letrasNombre=valores[i].toArray();
						for(var j=0;j<letrasNombre.size();j++)
						{
							var numAleatorio=Math.floor(Math.random()*5+1);
							$(claves[i]).innerHTML +="<span id='letra"+numAleatorio+"'>"+letrasNombre[j]+"</span>";
						}
						break
					case "intro":
						$(claves[i]).innerHTML=valores[i];						
						break;
					case "descripcion":
					case "notas":
						var subtitulo=primeraMayuscula(claves[i]);
						$(claves[i]).innerHTML="<h2>"+subtitulo+":</h2>"+valores[i];
						break;					
					case "color0":
					case "color1":
						break;						
					case "color2":
						//aplicamos los colores (mediante estilos CSS)
						aplicarColoresCriatura("#"+valores[i-2], valores[i-1], "#"+valores[i]);
						break;
					case "familia":
						$("tipo").innerHTML="<u>Tipo:</u> "+valores[i];
						$("tipo").style.display="block";
						break;						
					case "NumTotalCriaturas":
						sessvars.NumTotalCriaturas=valores[i];
					case "restriccion":
						var valorRestriccion=parseInt(valores[i]);
						var lista="<ul>\n<li id='claveRestriccion'>"+primeraMayuscula(claves[i])+":</li>";
						for(var j=0; j<10; j++) 
						{
							if(j < valorRestriccion) 
							{
							  lista +="<li class=\"lleno\"></li>\n";
							}
							else {
							  lista +="<li class=\"vacio\"></li>\n";
							}
						}
						lista +="</ul>\n";
						//
						$(claves[i]).innerHTML=lista;
						//						
						var claseLleno=$$("#restriccion ul li.lleno");
						var claseVacio=$$("#restriccion ul li.vacio");
						for(var k=0; k<claseLleno.size(); k++) 
						{
							claseLleno[k].style.background=datosCriatura.color1;
						}
						for(var c=0; c<claseVacio.size(); c++) 
						{
							claseVacio[c].style.background=datosCriatura.color1;
							claseVacio[c].style.opacity=0.3;
						}
						break;
					default:
						//
						break;	
				}
			}			
		}
	} 
}

//
//Funcionalidad de las PESTA�AS (nuestro MEN� principal). El evento onclick de cada PESTA�A llama a esta funci�n
//que mostrar� en cu�l estamos y el contenido respectivo de la pesta�a (diferente para cada criatura)
function tabsClasses()
{
	var listaMenu=$$("#tabs ul li");
	for (var i=0;i<listaMenu.size();i++)
	{		
		listaMenu[i].style.cursor="pointer";	//emulamos que sean pinchables
		listaMenu[i].style.cursor="hand";		//les asignamos cursor, ya que no son enlaces normales y por defecto no lo tienen
		if (listaMenu[i].innerHTML == this.innerHTML)	listaMenu[i].writeAttribute("class", "menuSeleccionado");
		else listaMenu[i].writeAttribute("class", "menuSinSeleccionar");
	}
	//
	//switcheamos el contenido de 'this.innerHTML' (el texto de cada item de la lista: del men� realmente) previo filtro de caracteres extra�os
	switch(sustituirCaracteresChungos(this.innerHTML, CharsTranslation))
	{
		case "Criatura":
			//carga los datos de la criatura de nuevo (desde la variable de SESI�N donde se guard� en nombre de la criatura)
			deMomento(null, null, null, null, null, null);	//reseteamos los campos antes de llamar de nuevo a los datos de la criatura		
			cargarCriaturaDesdeSesion();
			break;
		case "Rolemaster":
			//carga los datos de la criatura para Rolemaster (datos de rol)
			deMomento("Datos Rolemaster.", null, "<p class='primero'>Pendiente. Disculpen las molestias.</p>", 
					null, null, null);		//reseteamos los campos de momento para hacer el efecto de cambio de secci�n
			break;			
		case "Galerias":
			//carga la galer�a de la criatura
			deMomento("Galer&iacute;as.", null, "<p class='primero'>Pendiente. Disculpen las molestias.</p>", 
					null, null, null);		//reseteamos los campos de momento para hacer el efecto de cambio de secci�n		
			break;
		default:
			break;				
	}
}
		//
		function deMomento(nombre, restriccion, intro, imagen, descripcion, notas)
		{
			$("nombre").innerHTML=nombre;
			$("restriccion").innerHTML=restriccion;
			$("intro").innerHTML=intro;
			$("imagen").innerHTML=imagen;
			$("descripcion").innerHTML=descripcion;
			$("notas").innerHTML=notas;
		}

//Efecto roll de la imagen
function rollover(event){
	$("imagen").style.opacity=1;
}
function rollout(){
	$("imagen").style.opacity= .7;
}

/*function keypressHandler(event)		//funcionalidad ANTERIOR/SIGUIENTE tambi�n desde el teclado (pendiente)
{
	 var key=event.which || event.keyCode;
	 //
	 switch (key)
	 {
	   case Event.KEY_RIGHT:
	     alert('moved right');
	     break;
	   case Event.KEY_LEFT:
	     alert('moved left');
	     break;
	 }
}*/

//
//Nos aseguramos que se ha cargado el DOM para gestionar los eventos y cargar los datos
function alCargar() 
{
	//Cargamos la LISTA principal: Familias de criaturas en la Lista
	new Ajax.Request("auxiliar/cargaFamilias.php?nocache=" + Math.random(), {	//usamos AJAX + Prototype
		method: 'GET',
		onSuccess: muestraFamilias}
	);
	//Y preparamos los MANEJADORES DE EVENTOS para la selecci�n de familias y criaturas (Prototype)	
	Event.observe("familia", "change", cargaCriaturas);
	Event.observe("criatura", "change", cargaDatosCriatura);
	//
	//
	//ELEMENTO BUSCAR (FORM)
	//preparamos el AUTOCOMPLETADO de Buscar criatura	
	var elDiv=document.createElement("div");	//Crear elemento de tipo <div> para mostrar las sugerencias del servidor
	elDiv.id="sugerencias";
	$("diosguarro").appendChild(elDiv); //para que inserte las sugerencias en ese lugar exactamente
	//Y preparamos el MANEJADOR DE EVENTOS para las sugerencias en la b�squeda de criaturas con nomenclatura Prototype
	Event.observe("buscar", "keyup", autocompleta);	//nomenclatura javascript: $("buscar").onkeyup = autocompleta;
	//
	//
	//asignamos un MANEJADOR DE EVENTOS al elemento ALEATORIA para que al pinchar muestre una Criatura aleatoriamente
	$("aleatoria").style.cursor="pointer";
	$("aleatoria").style.cursor="hand";
	//Y preparamos el MANEJADOR DE EVENTOS para 'criatura aleatoria' con nomenclatura Prototype
	Event.observe("aleatoria", "click", cargarCriaturaAleatoria);	//nomenclatura javascript: $("aleatoria").onclick=cargarCriaturaAleatoria;	
	//
	//
	//Cargamos el Objeto FLASH con unos par�metros iniciales
	var flashvars = {color: "0xffffff"};
	var params = {menu: "false", wmode: "transparent"};
	swfobject.embedSWF("auxiliar/bso.swf", "bso", "260", "330", "9.0.0","", flashvars, params);
	//
	//
	//Muestra en qu� PESTA�A te encuentras (en realidad estas pesta�as son el MEN� principal) y le asigna un evento
	var enlacesMenu=$$("#tabs ul li");			//seleccionamos las pesta�as mediante funci�n Prototype
	enlacesMenu.each(function(enlacesMenu)
	{
		enlacesMenu.style.cursor="pointer";	//emulamos que sean pinchables
		enlacesMenu.style.cursor="hand";		//les asignamos cursor, ya que no son enlaces normales y por defecto no lo tienen
		Event.observe(enlacesMenu, "click", tabsClasses);	//y asignamos el MANEJADOR DE EVENTOS para hacerlas pinchables (con nomenclatura Prototype)
		//por defecto, mostraremos el contenido de la primera: 'Criatura'
		if (enlacesMenu.innerHTML == "Criatura")	enlacesMenu.writeAttribute("class", "menuSeleccionado");
		else enlacesMenu.writeAttribute("class", "menuSinSeleccionar");
	});
	//
	//Finalmente asignamos un MANEJADOR DE EVENTOS para el efecto rollover de la im�gen
	Event.observe("imagen", "mouseover", rollover);	//
	Event.observe("imagen", "mouseout", rollout);	//
	//Event.observe(window, "keyup", keypressHandler);	//
}
//Preparamos el MANEJADOR DE EVENTOS principal: onLoad (usando la nomenclatura de Prototype)	
Event.observe(window, "load", alCargar);	//n�tese que el elemento afectado es el objeto WINDOW