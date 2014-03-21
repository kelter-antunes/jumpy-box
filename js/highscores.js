var apiUrl = "kelter.outsystemscloud.com";
var rootUrl = "kelter-antunes.github.io/";
//api end point
// /games_api/leaderboard.aspx?action=update

function retreiveScore() {
    var hash = location.hash.substring(1);
    $.post("http://" + apiUrl + "/leaderboard/show/" + hash, {}, function(data) {
        $(".score").html(data.count)
    }, "json")
}

function submitScore() {
    $.post("http://" + apiUrl + "/leaderboard/", {
        s: counter.text,
        t: rd
    }, function(data) {
        console.log(data);
        //window.location = "http://" + rootUrl + "/leaderboard/new/#" + data.token
    }, "json")
}

function updateScore(user, score) {
    var hash = location.hash.substring(1);
    $.post("http://" + apiUrl + "/games_api/leaderboard.aspx?action=update&user=" + user + "&score=" + score, function(data) {
        if (data.success) {
            $(".error").hide();
            //window.location = "http://" + rootUrl + "/leaderboard/"
        } else {
            $(".error").show().text(data.message);
        }
    }, "json")
}

function listScores() {
    $.post("http://" + apiUrl + "/leaderboard/list", {}, function(data) {
        $(".loading").remove();
        for (var i = 0; i < data.day.length; i++) {
            $(".day").append($("<tr><td>" + data.day[i].name + "</td><td>" + data.day[i].count + "</td></tr>"))
        }
        for (var i = 0; i < data.hour.length; i++) {
            $(".hour").append($("<tr><td>" + data.hour[i].name + "</td><td>" + data.hour[i].count + "</td></tr>"))
        }
    }, "json")
}