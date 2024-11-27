
function login(){
    $.post('/login',{username: document.getElementById('username').value, password: document.getElementById('password').value})
    .done(function(data) {
        alert('Login successful!');
        window.location.href = '/2FA';
    })
    .fail(function(jqXHR) {
        if (jqXHR.status === 404) {
            alert('User not found');
        } else {
            alert('An error occurred: ' + jqXHR.status);
        }
    });
}
function TwoFA() {
    // No need to bind another click event listener, execute functionality directly
    (async () => {
        try {
            const response = await fetch('/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: 'harvey.a.barnes@gmail.com', // Replace this with dynamic email input if necessary
                    message: 'Your 2FA code is on the way!', // Optional: Adjust message logic if needed
                }),
            });

            if (response.ok) {
                alert('Email sent successfully!');
            } else {
                alert('Failed to send email.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred.');
        }
    })();
}
