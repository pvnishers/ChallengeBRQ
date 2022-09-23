$.fn.extend({
    toggleText: function(a, b){
        return this.text(this.text() == b ? a : b);
    }
});

let estado = document.querySelector('#estadoAc');
let icone = document.querySelector('#icon-ac');
    $('#botaoAc').click(function(){
        $('#icon-ac').toggleClass('blue-ac');
        $('#acEstado').toggleText('A/C Desligado', 'A/C Ligado'); 
    });


function aumentarAC(){
    let nmr = document.getElementById('nmrAc').value;
    const temp = document.getElementById('temperaturaAc');
    if(nmr < 28){
        nmr++;
        document.getElementById('nmrAc').value = nmr;
        temp.innerHTML = nmr + '°';
    }
}

function diminuirAC(){
    let nmr = document.getElementById('nmrAc').value;
    const temp = document.getElementById('temperaturaAc');
    if(nmr > 16){
        nmr--;
        document.getElementById('nmrAc').value = nmr;
        temp.innerHTML = nmr + '°';
    }
}

function acenderLuz(){
    const luz = document.getElementById('luz');

    luz.classList.toggle('icon-active');

}

function abrirGaragem(){
    const garagem = document.getElementById('garagem');

    garagem.classList.toggle('icon-active');

}

function getTime(){
    function addZero(i) {
        if (i < 10) {i = "0" + i}
        return i;
    }
    let today = new Date();
    const mes = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    let day = today.getDate() + " de " + (mes[today.getMonth()]) + " de " + today.getFullYear();
    let time = today.getHours() + ":" + addZero(today.getMinutes());
    const hora = document.querySelector('#header-time');
    const dia = document.querySelector('#header-day');
    const semana = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
    let weekday = semana[today.getDay()];

    dia.innerHTML = weekday + ', ' + day;
    hora.innerHTML = time;
}

$('#btn-popup').click(function(){
    $('.atalho-popup').show();
    $('.popup').show();
});

$(document).click(function(){           
    $('.atalho-popup').hide();
    $('.popup').hide();
});

$('#btn-popup').on('click', function (event) {
    event.stopPropagation();
});

setInterval(getTime, 1000);

function getClima(){$.ajax({
    url: 'https://api.hgbrasil.com/weather?woeid=455827&format=json-cors&key=c507c5bc',
    contentType: "application/json",
    dataType: 'json',
    success: function(result){
        attClima(result);
    }
});
}
getClima();
setInterval(getClima, 300000);

function attClima(result){
    
    $('#temperaturaCl').html(result.results.temp + '°');
    $('#condicoes').html(' ' + result.results.description);
    $('#temp-max').html(result.results.forecast[0].max + '°');
    $('#temp-min').html(result.results.forecast[0].min + '°');
    $('#cond-esperadas').html(result.results.forecast[0].description);
    $('#vel-vento').html(result.results.wind_speedy);

   

    if(result.results.condition_slug == 'rain'){
        $('#icone-clima').html('<i class="fa-solid fa-cloud-rain"></i>');
        $('#fundo-clima').css('background-image', 'url("/assets/imgs/rainy.jpg")');
    }
    else if(result.results.condition_slug == 'cloudly_day'){
        $('#icone-clima > i').html('<i class="fa-solid fa-cloud-sun"></i>');
        $('#fundo-clima').css('background-image', 'url("/assets/imgs/cloudly.jpg")');
    }
    else if(result.results.condition_slug == 'cloudly_night'){
        $('#icone-clima > i').html('<i class="fa-solid fa-cloud-moon"></i>');
        $('#fundo-clima').css('background-image', 'url("/assets/imgs/cloudly_n.jpg")');
    }
    else if(result.results.condition_slug == 'storm'){
        $('#icone-clima > i').html('<i class="fa-solid fa-cloud-bolt"></i>');
        $('#fundo-clima').css('background-image', 'url("/assets/imgs/storm.jpg")');
    }
    else if(result.results.condition_slug == 'clear_day'){
        $('#icone-clima > i').html('<i class="fa-solid fa-sun"></i>');
        $('#fundo-clima').css('background-image', 'url("/assets/imgs/clear.jpg")');
    }
    else if(result.results.condition_slug == 'clear_night'){
        $('#icone-clima > i').html('<i class="fa-solid fa-moon"></i>');
        $('#fundo-clima').css('background-image', 'url("/assets/imgs/clear_n.jpg")');
    }
    else if(result.results.condition_slug == 'fog'){
        $('#icone-clima > i').html('<i class="fa-solid fa-smog"></i>');
        $('#fundo-clima').css('background-image', 'url("/assets/imgs/fog.jpg")');
    }
    else if(result.results.condition_slug == 'snow'){
        $('#icone-clima > i').html('<i class="fa-solid fa-snowflake"></i>');
        $('#fundo-clima').css('background-image', 'url("/assets/imgs/snow.jpg")');
    }
    else if(result.results.condition_slug == 'hail'){
        $('#icone-clima > i').html('<i class="fa-solid fa-cloud-rain"></i>');
        $('#fundo-clima').css('background-image', 'url("/assets/imgs/rainy.jpg")');
    }
    else if(result.results.condition_slug == 'none-day'){
        $('#icone-clima > i').html('<i class="fa-solid fa-sun"></i>');
        $('#fundo-clima').css('background-image', 'url("/assets/imgs/clear.jpg")');
    }
    else if(result.results.condition_slug == 'none-night'){
        $('#icone-clima > i').html('<i class="fa-solid fa-moon"></i>');
        $('#fundo-clima').css('background-image', 'url("/assets/imgs/clear_n.jpg")');
    }
    else{
        $('#icone-clima > i').html('<i class="fa-solid fa-cloud"></i>');
        $('#fundo-clima').css('background-image', 'url("/assets/imgs/cloudly.jpg")');
    }
};