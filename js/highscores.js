var apiUrl = "kelter.outsystemscloud.com";
var rootUrl = "kelter-antunes.github.io/";
//api end point
// /games_api/leaderboard.aspx?action=update

var username;

FB.getLoginStatus(function(response) {
    if (response.status === 'connected') {
        FB.api('/me', function(response) {
            username = response.username;
        });
    } else if (response.status === 'not_authorized') {
        // the user is logged in to Facebook, 
        // but has not authenticated your app
    } else {
        // the user isn't logged in to Facebook.
    }
});


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

function updateScore(score) {
    var hash = location.hash.substring(1);

    if (username != "") {
        $.post("http://" + apiUrl + "/games_api/leaderboard.aspx?action=update&user=" + username + "&score=" + score, function(data) {
            if (data.success) {
                $(".error").hide();
                //window.location = "http://" + rootUrl + "/leaderboard/"
            } else {
                $(".error").show().text(data.message);
            }
        }, "jsonp")

    };

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