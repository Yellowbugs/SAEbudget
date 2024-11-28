
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
    (async () => {
        try {
            const response = await fetch('/send-email', {
                method: 'POST',
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

function verifyCode() {
    const enteredCode = document.getElementById('2facode').value;
    (async () => {
        try {
            const response = await fetch('/verify-code', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ enteredCode }),
            });

            if (response.ok) {
                alert('Code verified successfully!');
                window.location.href = '/dashboard'; // Redirect to the dashboard
            } else {
                alert('Invalid code. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred during verification.');
        }
    })();
}



