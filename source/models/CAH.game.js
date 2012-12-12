/**
  This module represents the CAH game FSM
 */
var test = test || function() {};

(function() {
var ordset = cah.models.ordset;

function game() {
    return {
        "_state": "init",
        "players": ordset()
    }
}


game.players = function(state) {
    return ordset.to_array(state.players);
}

game.player_joined = function(state, player_id) {
    state._player_set = ordset.add(
        state.players,
        player_id
    )
    return state;
}

    test(
        "player joined",
        function() {
            var state = game();
            state = game.player_joined(state, "eric");
            ok(
                ordset.exists(
                    state.players,
                    "eric",
                    "Player could not join"
                )
            )
        }
    );

game.player_left = function(state, player_id) {
    state.players = ordset.remove(state.players, player_id);
    return state;
}

    test(
        "player left",
        function() {
            var state = game();
            state = game.player_joined(state, "eric");
            state = game.player_left(state, "eric");
            ok(
                !ordset.exists(
                    state.players,
                    "eric",
                    "Player could not leave"
                )
            )
        }
    );


game.game_start = function(state, dealer_id) {

}

game.start_round = function(state) {

}

game.deal_question = function(state) {

}

game.place_cards = function(state, player_id, cards) {

}

game.reveal_card = function(state, card) {

}

game.pick_winner = function(state, player_id, card_id) {

}

cah.models.game = game;
})();
