$(document).ready(function() {
    //https://swapi.dev/api/people/1/?format=json
    const urlBase="https://swapi.dev/api/people/"
    let indexPrincipales =0;
    let indexSecundarios=0;
    let indexOtros=0;
    let htmlPrincipales =`
    <div class="col-12 col-md-6 col-lg-4 ">
        <div class="single-timeline-content d-flex wow fadeInLeft 2021 reajuste-alto" data-wow-delay="0.3s"
            style="visibility: visible; animation-delay: 0.3s; animation-name: fadeInLeft;">
            <div class="timeline-icon" style="background-color: salmon;"><i class="fa fa-address-card" aria-hidden="true"></i>
            </div>
            <div class="timeline-text">
                <h6>En esta sección...</h6>
                <p>Encontrarás información sobre los personajes más populares de las películas.</p>
            </div><!--nur der Text -->
        </div> <!-- das Rechteck -->
    </div> <!-- Das kopieren -->`;
    
    let htmlSecundarios=`
    <div class="col-12 col-md-6 col-lg-4">
        <div class="single-timeline-content d-flex wow fadeInLeft reajuste-alto" data-wow-delay="0.3s"
            style="visibility: visible; animation-delay: 0.3s; animation-name: fadeInLeft;">
            <div class="timeline-icon" style="background-color: lightgreen;"><i class="fa fa-briefcase" aria-hidden="true"></i>
            </div>
            <div class="timeline-text">
                <h6>En esta sección...</h6>
                <p>Encontrarás información sobre personajes secundarios importantes.</p>
            </div><!--nur der Text -->
        </div><!-- das Rechteck -->
    </div><!-- Das kopieren -->`;
    
    let htmlOtros =`
    <div class="col-12 col-md-6 col-lg-4">
        <div class="single-timeline-content d-flex wow fadeInLeft reajuste-alto" data-wow-delay="0.3s"
            style="visibility: visible; animation-delay: 0.3s; animation-name: fadeInLeft;">
            <div class="timeline-icon" style="background-color: lightskyblue;"><i class="fa fa-id-card" aria-hidden="true"></i>
            </div>
            <div class="timeline-text">
                <h6>En esta sección...</h6>
                <p>Encontrarás otros personajes significativos.</p>
            </div><!--nur der Text -->
        </div><!-- das Rechteck -->
    </div><!-- Das kopieren -->`;



    const obtenerDatos = (idPersonaje) => {
        return new Promise(async (resolve, reject) => {
            try {
                let response = await fetch(urlBase+idPersonaje);
                let data = await response.json();
                //console.log(data);
                resolve (data);
            }
            catch (error) {
                reject(error);
            }
        }    
        )
    }
    
    function* generadorPrincipales(){
        while (indexPrincipales<5) {
            yield obtenerDatos(indexPrincipales+1);
            indexPrincipales++
        }
    }
    function* generadorSecundarios(){
        while (indexSecundarios<5) {
            yield obtenerDatos(indexSecundarios+6);
            indexSecundarios++
        }
    }
    function* generadorOtros(){
        while (indexOtros<5) {
            yield obtenerDatos(indexOtros+12);
            indexOtros++
        }
    }
    let siguientePrincipales = generadorPrincipales()
    let siguienteSecundarios = generadorSecundarios()
    let siguienteOtros = generadorOtros()
    $("#textoPrincipales").mouseenter(function(){
        try {
            let respuesta=siguientePrincipales.next().value;
            respuesta
            .then ((valor)=>{
                let nombre = valor.name
                let estatura = valor.height
                let peso = valor.mass
                //console.log(nombre, estatura, peso);
                $("#insertarPrincipales").html(funcionHTMLPrincipales(nombre, estatura, peso));
            })
            .catch ((error)=>{
                //console.log("ERROR 1: ",error);
            })
        } catch (error) {
            //console.log("ERROR 2: ",error);
        }
    })

    $("#textoSecundarios").mouseenter(function(){
        try {
            let respuesta=siguienteSecundarios.next().value;
            respuesta
            .then ((valor)=>{
                let nombre = valor.name
                let estatura = valor.height
                let peso = valor.mass
                //console.log(nombre, estatura, peso);
                $("#insertarSecundarios").html(funcionHTMLSecundarios(nombre, estatura, peso));
            })
            .catch ((error)=>{
                //console.log("ERROR 1: ",error);
            })
        } catch (error) {
            //console.log("ERROR 2: ",error);
        }
    })

    $("#textoOtros").mouseenter(function(){
        try {
            let respuesta=siguienteOtros.next().value;
            respuesta
            .then ((valor)=>{
                let nombre = valor.name
                let estatura = valor.height
                let peso = valor.mass
                //console.log(nombre, estatura, peso);
                $("#insertarOtros").html(funcionHTMLOtros(nombre, estatura, peso));
            })
            .catch ((error)=>{
                //console.log("ERROR 1: ",error);
            })
        } catch (error) {
            //console.log("ERROR 2: ",error);
        }
    })

    const funcionHTMLPrincipales = (nombre, estatura, peso)=>{
         return htmlPrincipales+=`
            <div class="col-12 col-md-6 col-lg-4 ">
                <div class="single-timeline-content d-flex wow fadeInLeft 2021 py-auto reajuste-alto" data-wow-delay="0.3s"
                style="visibility: visible; animation-delay: 0.3s; animation-name: fadeInLeft;">
                    <div class="timeline-icon" style="background-color: salmon;"><i class="fa fa-address-card" aria-hidden="true"></i>
                    </div>
                    <div class="timeline-text">
                        <h6>${nombre}</h6>
                        <p>Estatura; ${estatura}. Peso: ${peso}</p>
                    </div><!--nur der Text -->
                </div> <!-- das Rechteck -->
            </div> <!-- Das kopieren -->
        `
    }
    const funcionHTMLSecundarios = (nombre, estatura, peso)=>{
        return htmlSecundarios+=`
            <div class="col-12 col-md-6 col-lg-4">
                <div class="single-timeline-content d-flex wow fadeInLeft reajuste-alto" data-wow-delay="0.3s"
                    style="visibility: visible; animation-delay: 0.3s; animation-name: fadeInLeft;">
                    <div class="timeline-icon" style="background-color: lightgreen;"><i class="fa fa-briefcase" aria-hidden="true"></i>
                    </div>
                    <div class="timeline-text">
                        <h6>${nombre}</h6>
                        <p>Estatura; ${estatura}. Peso: ${peso}</p>
                    </div><!--nur der Text -->
                </div><!-- das Rechteck -->
            </div><!-- Das kopieren -->
       `
   }
   const funcionHTMLOtros = (nombre, estatura, peso)=>{
    return htmlOtros+=`
            <div class="col-12 col-md-6 col-lg-4">
                <div class="single-timeline-content d-flex wow fadeInLeft reajuste-alto" data-wow-delay="0.3s"
                    style="visibility: visible; animation-delay: 0.3s; animation-name: fadeInLeft;">
                    <div class="timeline-icon" style="background-color: lightskyblue;"><i class="fa fa-id-card" aria-hidden="true"></i>
                </div>
                <div class="timeline-text">
                    <h6>${nombre}</h6>
                    <p>Estatura; ${estatura}. Peso: ${peso}</p>
                </div><!--nur der Text -->
            </div><!-- das Rechteck -->
        </div><!-- Das kopieren -->
   `
}
   
})