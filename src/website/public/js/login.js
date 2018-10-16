$('#login').submit(function(e) {
    
    $.ajax({
        type: "POST",
        url: '/api/login',
        data: {
            email: $('#inputEmail').val(), 
            password: $('#inputPassword').val(),
            rememberMe: $('#remember-me').is(':checked')
        },
        success: function(data) {
            console.log(data);
        }
    });
    return false;
});