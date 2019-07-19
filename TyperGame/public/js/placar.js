$("#botaoPlacar").click(mostraPlacar);
$("#botaoSincroniza").click(sincronizaPlacar);

function mostraPlacar(){
    $(".placar").stop().slideToggle(1000);
}

function inserirPlacar (){
    var corpoTabela = $(".placar").find("tbody");

    var user = $("#usuarios").val();
    var qntPalavras = $("#contPalavras").text();

    var linha = novaLinha(user, qntPalavras);
    
    corpoTabela.append(linha);
    $(".placar").slideDown(500);
    scrollPlacar();
}

function novaLinha(user,qntPalavras) {
    var linha = "<tr>" +
                    "<td>" + user + "</td>" +
                    "<td>" + qntPalavras + "</td>" +
                    "<td><span><i class='small material-icons trash'>delete</i></span></td>"
                "</tr>";
    
    return linha;
}

function scrollPlacar() {
    var posicaoPlacar = $(".placar").offset().top;

    $("html, body").animate(
    {
        scrollTop: posicaoPlacar + "px"
    }, 1000);
}

//remove
$("tbody").on("click", "span", function(event){                             
    $(this).parent().parent().fadeOut(900,function(){
        $(this).remove();
    });
    event.stopPropagation();
});

function sincronizaPlacar() {
    var placar = [];
    var tr = $("tbody").find("tr");
    tr.each(function(){
        var user = $(this).find("td:nth-child(1)").text();
        var palavras = $(this).find("td:nth-child(2)").text();
        
        var obj = {
            usuario: user,
            pontos: palavras
        };

        placar.push(obj);
    });

    var dados = {
        placar: placar
    };

    $.post("http://localhost:3000/placar",dados,function(){
        console.log("Placar salvo com sucesso");
        $(".tooltip").tooltipster("open").tooltipster("content","Placar salvo com sucesso!");
    }).fail(function(){
        $(".tooltip").tooltipster("open").tooltipster("content","Falha para salvar o placar!");
    }).always(function(){
        setTimeout(function(){
            $(".tooltip").tooltipster("close");
        },1200);
    });

}

function atualizaPlacar() {
    $.get("http://localhost:3000/placar",function(data){
        $(data).each(function(){
            var linha = novaLinha(this.usuario,this.pontos);
            $("tbody").append(linha);
        });
    });
}
