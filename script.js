let input = document.querySelector("#entrada-texto");
let bEncr = document.querySelector("#bEncriptar");
let bDesencr = document.querySelector("#bDesencriptar");
let output = document.querySelector("#salida-texto");
let bCopiar = document.querySelector("#bCopiar");

let ocultar = document.querySelector("#ocultar");
let mostrar = document.querySelector("#mostrar");
let aviso = document.querySelector(".aviso");

const letras = ["e","i","a","o","u"];
const llaves = ["enter","imes","ai","ober","ufat"];

function encriptar() {
    verificar();

    let final = ""; // texto final

    for (char = 0; char < input.value.length; char++) { // leer cada carácter
        let resultado = input.value.charAt(char); //resultado, por defecto el mismo carácter
                
        for (i = 0; i < 5; i++) { //cantidad llaves (5)
            if (input.value.charAt(char) == letras[i]) {
                resultado = llaves[i]; // resultado será llaves[i] si el carácter es igual a letras[i]
                break;
            }
        }
        final += resultado;
    }
    output.innerHTML = final;
}

function desencriptar() {
    verificar();

    let final = ""; // texto final

    for (char = 0; char < input.value.length; char++) { // leer cada carácter
        let resultado = input.value.charAt(char); //resultado, por defecto el mismo carácter

        for (i = 0; i < 5; i++) { // cantidad llaves (5)
            let coincidencias = 0; // coincidencias encontradas entre el carácter y las llaves, por defecto 0

            for (x = 0; x < llaves[i].length; x++) { //for para leer los caracteres de cada llave 
                if (input.value.charAt(char+x) == llaves[i].charAt(x)) { // comparar entre el carácter y cada carácter de las llaves y encontrar una coincidencia
                    coincidencias ++;
                } else {
                    break; // por si no se encuentra una coincidencia se rompe el bucle
                }
            }

            if (coincidencias == llaves[i].length) {
                resultado = letras[i]; // resultado será letras[i] si las coincidencias son iguales a la cantidad de carácteres de llaves[i]
                char += coincidencias-1; // con esto se salta lo caracteres que se encontraron para no repetirlos en el texto final
                break;
            }
        }
        final += resultado;
    }
    output.innerHTML = final;
}

function copiar() {
    output.select();
    document.execCommand("Copy");
}
           
function verificar() { //verificar si el texto contiene otro carácter que no sea una letra minúscula
    for (char = 0; char < input.value.length; char++) {
        if (input.value.charAt(char) >= "a" && input.value.charAt(char) <= "z" || input.value.charAt(char) == "ñ" || input.value.charAt(char) == " "
         || input.value.charAt(char) == "!" || input.value.charAt(char) == "¡" || input.value.charAt(char) == "¿" || input.value.charAt(char) == "?"
         || input.value.charAt(char) == "." || input.value.charAt(char) == ","|| input.value.charAt(char) == ":"|| input.value.charAt(char) == ";" || input.value.charAt(char) == "\n") {
            ocultar.style.display = "none"; //si no detecta ningún error muestra el texto de salida
            mostrar.style.display = "block";
            aviso.style.color = "gray";
        } else {
            mostrar.style.display = "none";
            ocultar.style.display = "block";
            aviso.style.color = "red";
            break;
        }
    }
    if (input.value.length == 0 ) {
        mostrar.style.display = "none";
        ocultar.style.display = "block";
    }
}


bEncr.onclick = encriptar;
bDesencr.onclick = desencriptar;
bCopiar.onclick = copiar;