document.addEventListener('DOMContentLoaded', function() {
    const emailInput = document.getElementById('signupEmail');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('signupPassword');
    const confirmInput = document.getElementById('confirmPassword');
    const signupBtn = document.getElementById('signupBtn');

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function updateButtonState() {
        const emailValid = validateEmail(emailInput.value);
        const usernameValid = usernameInput.value.trim() !== '';
        const passwordValid = passwordInput.value.length >= 6;
        const passwordsMatch = passwordInput.value === confirmInput.value;
        signupBtn.disabled = !(emailValid && usernameValid && passwordValid && passwordsMatch);
    }

    emailInput.addEventListener('input', updateButtonState);
    usernameInput.addEventListener('input', updateButtonState);
    passwordInput.addEventListener('input', updateButtonState);
    confirmInput.addEventListener('input', updateButtonState);

    document.getElementById('signupForm').addEventListener('submit', function(e) {
        if (signupBtn.disabled) {
            e.preventDefault();
        }
    });
});
