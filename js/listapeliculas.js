
let usuariopass=location.search
let usuario;
let pass;
const $mensajes=document.getElementById("mensajes")
const $contenedor= document.getElementById("contenedorpeliculas");
const $btn= document.getElementById("boton");
const $busqueda= document.getElementById("busqueda")
const $btnfavoritas=document.getElementById("btnfavoritas")
const $contenedorfavoritas=document.getElementById("contenedorfavoritas")
const $btncerrar= document.getElementById("salir") 
let favoritas=[]
let bsuqueda1=false
let $listapeliculas=document.getElementById("listapeliculas")
//valido si el usuario atraves de sesion o no  
const iniciar=()=>{
    if(sessionStorage.getItem("sesion")===null)location.href="../omdb/index.html"
    datosurl()
}
//
const datosurl=()=>{

    if(usuariopass===""){
        //permito que el usuario que tiene la sesion iniciada y entra en la pagina pueda hacerlo.obtengo el "id" de este usuario 
        usuariopass=sessionStorage.getItem("sesion")

    } else{
        //obtengo los datatos del usuario que viene en la url
        const arrayusuariopass=usuariopass.split("&")
        usuario=String (arrayusuariopass[0].substr(8))
        pass=String(arrayusuariopass[1].substr(11))
        //meto en una variable el "id" del usuario
        usuariopass=usuario+pass
        
       
    }
    
}
//realiza la peticion para obtener la informacion del titulo 
const buscar=(busquedaTitulo)=>{  
    fetch(`http://www.omdbapi.com/?s=${busquedaTitulo}&apikey=1bab3fef`)
    .then( respuesta=> respuesta.json())
    .then(json=>mostrarpeliculas(json.Search))
}
//controlo si ha existido una busqueda antes, si es asi la elimino 
const mostrarpeliculas=(datos)=>{
    if (bsuqueda1){
        $constenedorid=document.getElementById("contenedorid")
        $contenedor.removeChild($constenedorid)
        introducirpeliculas(datos)
        
    }else{
        introducirpeliculas(datos)
    }
}

// introduzco la informacion de los datos obtenidos 
const introducirpeliculas=(datos)=>{
    const $fragmento=document.createElement("div")   
    $fragmento.id="contenedorid"
    $fragmento.classList="contenedorid"
    datos.forEach(datospelicula => {   
        let $tarjeta= document.createElement("div")
        $tarjeta.classList="tarjeta"
        let  $titulo=document.createElement("h3")
        let $p=document.createElement("p")
        $p.dataset.id=datospelicula.imdbID
        let $pfavoritas=document.createElement("p")
        let $contenedordetalles= document.createElement("div")
        $contenedordetalles.classList="contenedordetalles"
        $pfavoritas.dataset.id=(datospelicula.imdbID)
        $pfavoritas.classList="favoritas"
        $p.classList="detalles"
        let pTexto=document.createTextNode("detalles")
        $divcontenedordetalle=document.createElement("div")
        $divcontenedordetalle.id=`contenedordetalle${datospelicula.imdbID}`
        let pTextofavoritas=document.createTextNode("guardar")
        $titulo.classList="titulo"
       let textotitulo= document.createTextNode(datospelicula.Title)
        let $img=document.createElement("img")
        $img.classList="poster"
        $img.alt=datospelicula.Title
        $img.src=datospelicula.Poster
        $titulo.appendChild(textotitulo)
        $p.appendChild(pTexto)
        $pfavoritas.appendChild(pTextofavoritas)
        $tarjeta.appendChild($titulo)
        $tarjeta.appendChild($img)
        $contenedordetalles.appendChild($pfavoritas)
        $contenedordetalles.appendChild($p)
        $tarjeta.appendChild($contenedordetalles)
        $tarjeta.appendChild($divcontenedordetalle)
        $fragmento.appendChild($tarjeta)
    });
    $contenedor.appendChild($fragmento)
    //esta variable me sirve para controlar la busquedas
    bsuqueda1=true
}
//aqui creo los elemntos necesarios para introducir luego las peliculas
const verfavoritas=(datos)=>{    
    $listapeliculas=document.createElement("div")
    $listapeliculas.id="listapeliculas"
    $contenedorfavoritas.appendChild($listapeliculas)
    let arraydatos=datos.split(",")
     
    arraydatos.forEach(favoritaid=>{
       busquedaId(favoritaid)
    })
   
    const $btnsalirfavoritos=document.createElement("button")
    $btnsalirfavoritos.classList="salirfavoritos"
    const btntxt=document.createTextNode("salir de favoritos")
    $btnsalirfavoritos.appendChild(btntxt) 
    $listapeliculas.appendChild($btnsalirfavoritos)
    
    $btnsalirfavoritos.addEventListener("click",()=>{               
        $contenedorfavoritas.removeChild($listapeliculas) 
    })
}
//a través del id de la pelicula   obtengo los datos de la pelicula
const busquedaId=(id)=>{ 
    
    fetch(`http://www.omdbapi.com/?i=${id}&apikey=1bab3fef`)
       .then( respuesta=> respuesta.json())
       .then(mostrar=>  introducirfavoritos(mostrar))
   }
//introduzco las peliculas favoritas
const introducirfavoritos=(datos)=>{    
    let fragmento=document.createDocumentFragment()
    let $tarjeta= document.createElement("div")
    $tarjeta.classList="listafavoritos"
    let  $titulo=document.createElement("h3")  
    $titulo.classList="titulo"
   let textotitulo= document.createTextNode(datos.Title)
    let $img=document.createElement("img")
    $img.classList="poster"
    $img.alt=datos.Title
    $img.src=datos.Poster
    $titulo.appendChild(textotitulo)
    fragmento.appendChild($titulo)
    fragmento.appendChild($img)
   document.getElementById("listapeliculas").appendChild(fragmento)
    
}

//busca el id de la pelicual y llama a la funcion detalles
const busquedaIddetalles=(id)=>{ 
    fetch(`http://www.omdbapi.com/?i=${id}&apikey=1bab3fef`)
    .then( respuesta=> respuesta.json())
    .then(mostrar=>detalles(mostrar))  
}
//introduce los detalles de la peliculas
const detalles=(datos)=>{
    const fragmento= document.createElement("div")
    fragmento.id=`fragmento${datos.imdbID}`
    const $genero= document.createElement("P")
    $genero.classList="genero"
    const generotxt=document.createTextNode(`Genero: ${datos.Genre}`)
    const $resumen= document.createElement("P")
    $resumen.classList="resumen"
    const resumentxt=document.createTextNode(`Resumen: ${datos.Plot}`)
    const $actores=document.createElement("P")
    $actores.classList="actores"
    const actorestxt=document.createTextNode(`Actores: ${datos.Actors}`)
    const $director=document.createElement("P")
    $director.classList="director" 
   const directortxt=document.createTextNode(`Director: ${datos.Director}`)
    const $productor=document.createElement("P")
    $productor.classList="productor"
    const productortxt=document.createTextNode(`Produccion: ${datos.Production}`)
    const $puntuacion=document.createElement("P")
    $puntuacion.classList="puntuacion"
    const puntuaciontxt=document.createTextNode( `ranking: ${datos.imdbRating}`)
   $genero.appendChild(generotxt)
   $resumen.appendChild(resumentxt)
   $actores.appendChild(actorestxt)
   $director.appendChild(directortxt)
   $productor.appendChild(productortxt)
   $puntuacion.appendChild(puntuaciontxt)
    fragmento.appendChild($resumen)
    fragmento.appendChild($genero)
    fragmento.appendChild($actores)
    fragmento.appendChild($director)
    fragmento.appendChild($productor)
    fragmento.appendChild($puntuacion)
    document.getElementById(`contenedordetalle${datos.imdbID}`).appendChild(fragmento)

}
 //esta funcion se encarga de mostrar los mensajes 
const mensaje=(tipo,txt)=>{
    
    const $err=document.createElement("p")
    const errmensaje=document.createTextNode(txt)
    if(!doble){
    
     $err.appendChild(errmensaje)
     $mensajes.appendChild($err)
     $mensajes.classList.add(tipo)
     doble=true
     setTimeout(() => {
         doble=false
      $mensajes.removeChild($err)
      $mensajes.classList.remove(tipo)
     }, 3000);
    }
}
/*
-------------------------------------------------------------------

--------------------------------------------------------------------------
*/

iniciar()
// controlo si el usuario es la primera  vez que entra o si ha enterado alguna vez, si es si entonces compruebo si tiene favoritos, si tienelos obtengo.
if (localStorage.getItem(usuariopass) ===null){    
    localStorage.setItem(usuariopass,":")
}else{

   if(localStorage.getItem(usuariopass)===":"){
  
   }else{
     favoritas=localStorage.getItem(usuariopass)      
   }
    
}
//esta variable controlan que no se produzcan mensajes dobles 
let doble=false
//esta variable la utilizo para saber si hay que mostrar los detalles o hay que eliminarlos 
let controlardetalles=false
// creo un evento generico
document.addEventListener("click",(e)=>{ 
    //   si el evento es del boton buscar valido , llamo a la funcion buscar
    if(e.target===$btn){
        if($busqueda.value.length===0){
           mensaje("err","por favor introduzca un termino de busqueda")
        }else{
          buscar($busqueda.value)}  
        }
        //si se pulsa en detalles 
    else if(e.target.classList.value==="detalles") {   
        //miro si hay que mostrarlos o eliminarlos
        if (controlardetalles){
            //elimino los detalles
            e.target.innerText="detalles"
           const fragmento=document.getElementById(`fragmento${e.target.dataset.id}`)   
           document.getElementById(`contenedordetalle${e.target.dataset.id}`).removeChild(fragmento)
           controlardetalles=false
        }else{
            //introduzco los detalles
            e.target.innerText="menos detalelles"
            busquedaIddetalles(e.target.dataset.id)
            controlardetalles=true
        }            
       //si se pulsa favoritas
    }else if(e.target.classList.value==="favoritas"){
        //compruebo que no se ha agregado antes a la lista de favoritos
        let existe= favoritas.indexOf(e.target.dataset.id)  
        if (existe===-1){
          //si no se ha agregado antes , la agrego
            favoritas.push( e.target.dataset.id)
            window.localStorage.setItem(usuariopass, favoritas);
            mensaje("ok","ha sido  agregado a tu lista de favoritos")

        }else{
              //si se agregado antes muestro mensaje error
           mensaje("err","ya lo tienes en la lista de favoritos")
           
        }
         
    // si se pulsa el boton de favoritos 
    }else if (e.target===$btnfavoritas){ 
        //compruebo que existen favoritos, sino existen el informo      
        if (favoritas.length===0){
         mensaje("err","tu lista de favoritos esta vacia")

        }else{
            //si existen llamo a la funcion
         verfavoritas(favoritas)   
        }
        //el boton cerrar sesion
    }else if(e.target===$btncerrar){
//elimino sesion y redirijo a la pagina principal 
        sessionStorage.clear()     
        location.href="../omdb/index.html"
    }
 

})

     
    