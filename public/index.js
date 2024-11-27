
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

document.addEventListener('DOMContentLoaded', () => {
    const verifyForm = document.getElementById('verify-form');

    verifyForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent form submission
        const code = document.getElementById('2facode').value;

        try {
            const response = await fetch('/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: 'harvey.a.barnes@gmail.com',
                    message: `Your 2FA code is: ${code}`,
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
    });
});
