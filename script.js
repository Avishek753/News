document.addEventListener('DOMContentLoaded', function() {
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const termsCheckbox = document.getElementById('terms');
    const loginBtn = document.getElementById('loginBtn');

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function updateButtonState() {
        const emailValid = validateEmail(emailInput.value);
        const passwordValid = passwordInput.value.trim() !== '';
        const termsChecked = termsCheckbox.checked;
        loginBtn.disabled = !(emailValid && passwordValid && termsChecked);
    }

    emailInput.addEventListener('input', updateButtonState);
    passwordInput.addEventListener('input', updateButtonState);
    termsCheckbox.addEventListener('change', updateButtonState);

main
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        if (loginBtn.disabled) {
            e.preventDefault();
        }
    });
});
