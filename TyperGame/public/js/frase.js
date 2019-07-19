$("#botaoFrase").on("click", fraseAleatoria);
$("#botaoEncontrafrase").on("click", buscaFrase);


function fraseAleatoria() {
    $("#spinner").show();

    $.get("http://localhost:3000/frases", trocaFrase)
    .fail(function(){
        $("#erro").show();
        setTimeout(function(){
            $("#erro").hide();
        },2000);
    })
    .always(function(){
        $("#spinner").toggle();
    });
}

function trocaFrase(data) {
    var frase = $(".frase");
    var tempo = $("#tempo");
    var numAleatorio = Math.floor(Math.random() * data.length);
    frase.text(data[numAleatorio].texto);
    atualizaFrase();
    atualizaTempo(data[numAleatorio].tempo);
}

function buscaFrase(){
    $("#spinner").toggle();
    var fraseId = $("#frase-id").val();
    var dados = {id: fraseId};
    $.get("http://localhost:3000/frases", dados, trocaFraseId)
    .fail(function(){
        $("#erro").show();
        setTimeout(function(){
            $("#erro").hide();
        },2000);
    })
    .always(function(){
        $("#spinner").toggle();
    });
}

function trocaFraseId(data){
    console.log(data);
    var frase = $(".frase");
    frase.text(data.texto);
    atualizaFrase();
    atualizaTempo(data.tempo);
}

