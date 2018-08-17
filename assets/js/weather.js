$(document).on("pagecreate", "#page_home", function () {
    var $content = $('#content_weather');
    var unit = "C";
    var $description = $('#content_description');
    var $place = $('#content_place');
    var $pressure = $('#content_pressure');
    var $selectCity = $('#select_city');
    var $selectTmp = $('.selectBtnTmp');
    var $selectCountry = $('.selectBtnCountry');
    var $forecastH3 = $('#forecastH3');
    var $forecastTmp = $('#forecastTmp');
    var $forecastIcon = $('#forecastIcon');
    var $forecastHour = $('#forecastHour');
    var $headline = $('#headline');
    var $settings = $('#settings');
    var title = "Das Wetter";
    var link = "EINSTELLUNGEN";
    var select = "Bitte Stadt wählen";
    var temperature = "aktuell";
    var tmpHigh = "Höchstwert";
    var tmpLow = "Tiefstwert";
    var furtherInfo = "Weitere Informationen";
    var wind = "Wind";
    var pressure = "Luftdruck";
    var forecastH3 = "Vorschau";

    $content.html("uno momento prego!");


    var opts = {
        q: 'Berlin',
        units: 'metric',
        lang: 'de',
        APPID: 'e56c5866972cebc60f3d29e6b258800c'
    }
    var translation = [
        {
            title: "Das Wetter",
            link: "EINSTELLUNGEN",
            select: "Bitte Stadt wählen",
            temperature: "aktuell",
            tmpHigh: "Höchstwert",
            tmpLow: "Tiefstwert",
            furtherInfo: "weitere Informationen",
            wind: "Wind",
            pressure: "Luftdruck",
            forecastH3: "Vorschau"
        },
        {
            title: "Weather",
            link: "SETTINGS",
            select: "please choose city",
            temperature: "actual",
            tmpHigh: "highest value",
            tmpLow: "lowest value",
            furtherInfo: "further informations",
            wind: "wind",
            pressure: "pressure",
            forecastH3: "forecast"
        },
        {
            title: "Météo",
            link: "PARAMETRES",
            select: "Veuillez choisir la ville",
            temperature: "nwo",
            tmpHigh: "haute valeur",
            tmpLow: "basse valeur",
            furtherInfo: "informations complément.",
            wind: "vent",
            pressure: "pression",
            forecastH3: "aperçu"
        }
    ];
    init();
    function init() {
        var url = getApiUrl(opts);
        var forecastUrl = getForecastUrl(opts);
        $.getJSON(url, viewData);
        $.getJSON(forecastUrl, viewForecastData);
        $selectCity.change(changeCity);        
        $selectTmp.click(changeTmp);
        $selectCountry.click(changeLang);
    }

    function changeCity() {
        $place.html("");
        $description.html("");
        $pressure.html("");
        opts.q = $(this).val();
        $.getJSON(getApiUrl(opts), viewData);
        $.getJSON(getForecastUrl(opts), viewForecastData);
    }
    function changeTmp() {
        $place.html("");
        $description.html("");
        $pressure.html("");
        opts.units = $(this).attr('data-tmp');
        if (opts.units === "imperial") {
            unit = "F";
        } else {
            unit = "C";
        }
        $.getJSON(getApiUrl(opts), viewData);
        $.getJSON(getForecastUrl(opts), viewForecastData);
    }
    function changeLang() {
        $place.html("");
        $description.html("");
        $pressure.html("");
        opts.lang = $(this).attr('data-lang');
        switch (opts.lang) {
            case "de":
            {
                title = translation[0].title;
                link = translation[0].link;
                temperature = translation[0].temperature;
                select = translation[0].select;
                tmpHigh = translation[0].tmpHigh;
                tmpLow = translation[0].tmpLow;
                furtherInfo = translation[0].furtherInfo;
                wind = translation[0].wind;
                pressure = translation[0].pressure;
                forecastH3 = translation[0].forecastH3;
                break;
            }
            case "en":
            {
                title = translation[1].title;
                link = translation[1].link;
                temperature = translation[1].temperature;
                select = translation[1].select;
                tmpHigh = translation[1].tmpHigh;
                tmpLow = translation[1].tmpLow;
                furtherInfo = translation[1].furtherInfo;
                wind = translation[1].wind;
                pressure = translation[1].pressure;
                forecastH3 = translation[1].forecastH3;
                break;
            }
            case "fr":
            {
                title = translation[2].title;
                link = translation[2].link;
                temperature = translation[2].temperature;
                select = translation[2].select;
                tmpHigh = translation[2].tmpHigh;
                tmpLow = translation[2].tmpLow;
                furtherInfo = translation[2].furtherInfo;
                wind = translation[2].wind;
                pressure = translation[2].pressure;
                forecastH3 = translation[2].forecastH3;
                break;
            }
            default:
                opts.lang = "de";
        }
        $settings.text(link);
        $headline.text(title);
        $.getJSON(getApiUrl(opts), viewData);
    }

    function viewData(data) {
        var icon = data.weather[0].icon;
        var iconUrl = 'https://api.openweathermap.org/img/w/' + icon + '.png';
        var picUrl = 'assets/images/' + data.name + '.jpg';
        $content.html(null);
        $('<h2>').text(data.name).appendTo($place);
        $('<img>').attr('src', picUrl).css({
            width: '120px',
            height: '150px'
        }).appendTo($place);
        $('<h3>').text(temperature + ' ' + parseInt(data.main.temp) + '° ' + unit).appendTo($content);
        $('<h4>').text(tmpHigh + ' ' + parseInt(data.main.temp_max) + '° ' + unit).appendTo($content);
        $('<h4>').text(tmpLow + ' ' + parseInt(data.main.temp_min) + '° ' + unit).appendTo($content);
        $('<img>').attr('src', iconUrl).appendTo($content);
        $('<h3>').text(furtherInfo + ' \n').appendTo($description);
        $('<h4>').text(data.weather[0].description).css({
            paddingRight: '5%'
        }).appendTo($description);
        $('<h4>').text(wind + ' ' + data.wind.speed + ' km/h').appendTo($description);
        $('<h3>').text(pressure + ' ').appendTo($pressure);
        $('<h4>').text(data.main.pressure + ' Pascal').appendTo($pressure);
        $forecastH3.html('<h3>' + forecastH3 + '</h3>');
        $('#opt_city').text(select);

    }
    function getForecastUrl(args) {
        var url = 'https://api.openweathermap.org/data/2.5/forecast?';
        $.each(args, function (key, value) {
            url += key + '=' + value + "&";
        });
        return url;
    }
    function viewForecastData(data) {
        $forecastHour.html("");
        $forecastTmp.html("");
        $forecastIcon.html("");
        for (var i = 0, max = 5; i < max; i++) {
            var chars = ["a", "b", "c", "d", "e"];
            var tmp = data.list[i].main.temp;
            var forecastIcon = data.list[i].weather[0].icon;
            var iconUrl = 'https://api.openweathermap.org/img/w/' + forecastIcon + '.png';
            var block1 = $('<div class="ui-block-' + chars[i] + '">');
            block1.text("~ " + (i + 1) * 3 + " h:").appendTo($forecastHour);
            var block2 = $('<div class="ui-block-' + chars[i] + '">');
            block2.html("\n<strong>" + parseInt(tmp) + " ° " + unit + "</strong>\n").appendTo($forecastTmp);
            var block3 = $('<div class="ui-block-' + chars[i] + '">');
            $('<img>').attr('src', iconUrl).appendTo(block3);
            block3.appendTo($forecastIcon);
        }
    }
    function getApiUrl(args) {
        var url = 'https://api.openweathermap.org/data/2.5/weather?';
        $.each(args, function (key, value) {
            url += key + '=' + value + "&";
        });
        return url;
    }
    ;


});

