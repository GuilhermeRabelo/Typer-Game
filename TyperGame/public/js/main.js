var tempoInicial = $("#tempo").text();

$(document).ready(function(){                                              
    atualizaFrase();                                
    inicializaContadores();                        
    inicializaCronometro();                         
    verificaTexto();
    $("#botaoReset").click(reiniciaJogo);
    atualizaPlacar();
    $("#usuarios").selectize({
        create: true,
        sortField: "text"
    });

    $(".tooltip").tooltipster({
        trigger: "custom",
    });

    $(".tooltipReset").tooltipster({
        animation: "swing"
    });
    
    $(".tooltipScore").tooltipster({
        animation: "swing"
    });
    
    $(".tooltipRandom").tooltipster({
        animation: "swing"
    });

    $(".tooltipId").tooltipster({
        animation: "swing"
    });

    $(".user").tooltipster({
        animation: "swing"
    });
});                                                 

function atualizaTempo(tempo) {
    tempoInicial = tempo;
    $("#tempo").text(tempo);
}

function atualizaFrase(){
    var frase = $(".frase").text().split(" ").length;
    var palavras = $("#numPalavras");
    palavras.text(frase);
}

function inicializaContadores() {
    $("textarea").on("input", function(){
        var campo = $(this).val();
        var qntPalavras = campo.split(/\S+/).length -1;
        $("#contPalavras").text(qntPalavras);
        
        var qntCaracteres = campo.length;
        $("#contCaracteres").text(qntCaracteres);
        
    });
}

function inicializaCronometro() {
    //$("textarea").on("keypress", function(event){
    $("textarea").one("focus", function(){
        var tempo = $("#tempo").text();
        $("#botaoReset").attr("disabled",true);
        var cronometro = setInterval(function(){
            tempo--;
            $("#tempo").text(tempo);
            if(tempo == 0) {
                clearInterval(cronometro);
                finalizaJogo();
            }
        },1000)
        
    });
}

function finalizaJogo(){
    $("textarea").attr("disabled", true);
    $("#botaoReset").attr("disabled",false);
    $("textarea").addClass("disabled");
    inserirPlacar();
}

function verificaTexto(){
    $("textarea").on("input", function(){
        var frase = $(".frase").text();
        var digitado = $("textarea").val();
        var comparavel = frase.substr(0,digitado.length);
    
        if(digitado == comparavel) {
            $("textarea").removeClass("wrong");
            $("textarea").addClass("right");
        }
        else {
            $("textarea").removeClass("right");
            $("textarea").addClass("wrong");
        }
        
    });
}

function reiniciaJogo(){
    $("textarea").attr("disabled", false);
    $("textarea").val("");
    $("textarea").toggleClass("disabled");
    $("#contPalavras").text("0");
    $("#contCaracteres").text("0");
    $("#tempo").text(tempoInicial);
    $("textarea").removeClass("wrong");
    $("textarea").removeClass("right");
    inicializaCronometro();
}

