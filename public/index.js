
function login(){
    $.post('/login',{username: document.getElementById('username').value, password: document.getElementById('password').value})
    .done(function(data) {
        alert('Login successful!');
        window.location.href = '/dashboard';
        window.document.getElementById('name').innerText = data['first name'] + " " + data['last name']
    })
    .fail(function(jqXHR) {
        if (jqXHR.status === 404) {
            alert('User not found');
        } else {
            alert('An error occurred: ' + jqXHR.status);
        }
    });
}