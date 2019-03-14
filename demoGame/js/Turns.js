var players = document.getElementById("playerID").value;
var currentPlayer = players;

var numberOfPlayers = [players];

function TurnStart() {
    currentPlayer.TurnStart();

    //insert timer funtion to start the countdown of the round


}

function CurrentPlayerEndTurn() {

    //reset timer and call TurnStart() with a new player id

}

function Timer() {
    var timeleft = 10;
    var downloadTimer = setInterval(function() {
        document.getElementById("countdown").innerHTML = timeleft;
        document.getElementById("progressBar").value = 10 - timeleft;
        timeleft -= 1;
        if (timeleft <= 0) {
            clearInterval(downloadTimer);
            document.getElementById("countdown").innerHTML = "End of turn";
        }
        if (timeleft >= 10) {
            document.getElementById("countdown").innerHTML = "Player " + currentPlayer + "'s turn";
        }
    }, 1000);
}