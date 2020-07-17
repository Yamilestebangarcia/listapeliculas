const $nombre=document.getElementById("nombre")
const $constraseña=document.getElementById("password")
const $btn=document.getElementById("boton")
const $nombrepass=String($nombre.value)+String($constraseña.value)

const $form =document.querySelector(".form")
///valido los datos
const validacion=()=>{
  $inputs=document.querySelectorAll(".form [required]")
  //creo los elmentos para añadir el errror
  $inputs.forEach((element)=>{
    const $span=document.createElement("span")
    $span.id=element.name
    $span.classList="hiden"
   $span.textContent=element.title
   element.insertAdjacentElement("afterend",$span)
  })
  //creo un evento que al pulsar la tecla 
  //valide la expresion regular de cada uno de los elemontos 
document.addEventListener("keyup",(e)=>{
  if(e.target.matches(".form [required]")){
   let  pattern=e.target.pattern
   let regex= new RegExp(pattern)  
  //cambio la clase en si existe no es correcta la validacion y la elimino si es correxta
   return !regex.exec(e.target.value)?document.getElementById(e.target.name).classList.add("active"):document.getElementById(e.target.name).classList.remove("active")
  }
})

   
}
validacion()
if($constraseña.value.lenght===0 || $nombre.value.lenght===0){
  let $err=document.createElement("div")
  let errtxt=document.createTextNode("los campos no pueden estar vacios")

}

$form.addEventListener("submit",(e)=>{
  e.preventDefault()
  /
  sessionStorage.setItem("sesion",$nombrepass)
  location.href=`../omdb/listapeliculas.html?nombre=${$nombre.value}&contrasena=${$constraseña.value}`
})

