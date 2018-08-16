$(document).on("pagecreate", "#page_home",function(){
    var $content = $('#content_weather');
    var unit ="C";
    var $description = $('#content_description');
    var $place = $('#content_place');
    var $pressure = $('#content_pressure');
    var $selectCity = $('#select_city'); 
    var $selectTmp = $('.selectBtnTmp');
    var $selectCountry = $('.selectBtnCountry');
    var $forecastTmp = $('#forecastTmp'); 
    var $forecastIcon = $('#forecastIcon'); 
    var $forecastHour = $('#forecastHour'); 
    $content.html("uno momento prego!");
    
    var opts={
        q:'Tokyo',
        units:'metric',
        lang:'de',
        APPID:'e56c5866972cebc60f3d29e6b258800c'
    }
    init();
    function init(){
        var url=getApiUrl(opts);
        var forecastUrl = getForecastUrl(opts);
        $.getJSON(url, viewData);
        $.getJSON(forecastUrl, viewForecastData);
        $selectCity.change(changeCity);
        $selectTmp.click(changeTmp);      
        $selectCountry.click(changeLang);              
    }  
    
    function changeCity(){
        $place.html("");
        $description.html("");
        $pressure.html("");
        opts.q = $(this).val();          
        $.getJSON(getApiUrl(opts), viewData);
        $.getJSON(getForecastUrl(opts), viewForecastData);
    }
    function changeTmp(){
        $place.html("");
        $description.html("");
        $pressure.html("");
        opts.units = $(this).attr('data-tmp');   
        if(opts.units==="fahrenheit"){
            unit="F";
        }
        else{
            unit="C";
        }
        $.getJSON(getApiUrl(opts),viewData);
        $.getJSON(getForecastUrl(opts), viewForecastData);
    }
    function changeLang(){
        $place.html("");
        $description.html("");
        $pressure.html("");
        opts.lang = $(this).attr('data-lang');   
        $.getJSON(getApiUrl(opts), viewData);          
    }
    //bei einer klaren Datenlieferung per JSON kann man nehmen
        
    function viewData(data){ 
        
        var icon = data.weather[0].icon;
        var iconUrl = 'https://api.openweathermap.org/img/w/'+ icon + '.png';
        var picUrl = 'assets/images/'+data.name+'.jpg';
        $content.html(null);
        $('<h2>').text(data.name).appendTo($place);
        $('<img>').attr('src', picUrl).css({
            width:'120px',
            height:'150px'
        }).appendTo($place);          
        $('<h3>').text('Temperatur: ' + parseInt(data.main.temp) + '° ' + unit).appendTo($content);
        $('<h4>').text('Höchsttemperatur: ' + parseInt(data.main.temp_max) + '° ' + unit).appendTo($content);
        $('<h4>').text('Tiefsttemperatur: ' + parseInt(data.main.temp_min) + '° ' + unit).appendTo($content);        
        $('<img>').attr('src', iconUrl).appendTo($content); 
        $('<h3>').text('Nähere Information: \n').appendTo($description);
        $('<h4>').text(data.weather[0].description).css({
            paddingRight:'5%'
        }).appendTo($description);
        $('<h4>').text('\nWind: ' + data.wind.speed + ' km/h').appendTo($description);        
        $('<h3>').text('Luftdruck: ').appendTo($pressure);
        $('<h4>').text(data.main.pressure + ' Pascal').appendTo($pressure);
    }
    function getForecastUrl(args){
        var url='https://api.openweathermap.org/data/2.5/forecast?';          
        $.each(args, function(key,value){
            url += key + '=' + value + "&"; 
        });        
        return url;        
    }
    function viewForecastData(data){
        $forecastHour.html("");
        $forecastTmp.html("");
        $forecastIcon.html("");
        for (var i = 0, max = 5; i < max; i++) {
            var chars =["a","b","c","d","e"];
            var tmp = data.list[i].main.temp;
            var forecastIcon = data.list[i].weather[0].icon;
            var iconUrl = 'https://api.openweathermap.org/img/w/'+ forecastIcon + '.png';
            var block1 = $('<div class="ui-block-'+chars[i]+'">');              
            block1.text("~ "+(i+1)*3+" h:").appendTo($forecastHour);
            var block2 = $('<div class="ui-block-'+chars[i]+'">');              
            block2.html("\n<strong>" + parseInt(tmp) + " ° " + unit +"</strong>\n").appendTo($forecastTmp);
            var block3 = $('<div class="ui-block-'+chars[i]+'">');              
            $('<img>').attr('src', iconUrl).appendTo(block3); 
            block3.appendTo($forecastIcon);            
        }
    }
    function getApiUrl(args){
        var url='https://api.openweathermap.org/data/2.5/weather?';          
        $.each(args, function(key,value){
            url += key + '=' + value + "&"; 
        });        
        return url;
    };
    
    
});

