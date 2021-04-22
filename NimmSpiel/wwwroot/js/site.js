$(document).ready(function () {
    var name = ""
    $("#weiterbutton").click(function () {
        if ($("#ihrname").val() != "") {
            name = $("#ihrname").val();
            $("#lobbynameform").hide();
            $("#lobbychat").show();
        }
        
    })
    var connection = new WebSocketManager.Connection("ws://localhost:5000/chat");
    connection.enableLogging = true;

    connection.connectionMethods.onConnected = () => {

    }

    connection.connectionMethods.onDisconnected = () => {

    }

    connection.clientMethods["pingMessage"] = (socketId, message) => {
        var current = new Date();
        var messageText = '['+current.getHours()+':'+current.getMinutes()+':'+current.getSeconds() +'], '+socketId + ' : ' + message;
        $('#messages').append('<li>' + messageText + '</li>');
        $('#messages').scrollTop($('#messages').prop('scrollHeight'));
    }

    connection.start();

    var $messagecontent = $('#message-content');
    $messagecontent.keyup(function (e) {
        if (e.keyCode == 13) {
            var message = $messagecontent.val().trim();
            if (message.length == 0) {
                return false;
            }
            connection.invoke("SendMessage", name, message);
            $messagecontent.val('');
        }
    });
    $('#messages').scrollTop($('#messages').prop('scrollHeight'));
});