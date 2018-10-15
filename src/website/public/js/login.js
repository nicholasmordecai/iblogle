$('#login').submit(function(e) {
    
    $.ajax({
        type: "POST",
        url: '/api/login',
        data: {email: $('#inputEmail').val(), password: $('#inputPassword').val()},
        success: function(data) {
            console.log(data);
        }
    });
    return false;
});