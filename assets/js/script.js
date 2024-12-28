const passwordInput = document.querySelector('.pass-input');
const lengthInput = document.querySelector('.length-input');

function generateRandomPassword(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+'
    let password = '';
    for (let i = 0; i < length; i++) {
        password += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return password
}

document.addEventListener('click', e => {
    const el = e.target;
    if (el.classList.contains('gene-pass')) {
        const length = parseInt(lengthInput.value);
        if (isNaN(lengthInput.value) || lengthInput.value <= 0) {
            lengthInput.value = 'Insira um número válido.'
            setTimeout(() => {
                lengthInput.value = '';
            }, 2000)
            lengthInput.focus()
            return;
        }
        const newPassword = generateRandomPassword(length);
        passwordInput.value = newPassword
    }
});

window.addEventListener('load', () => {
    passwordInput.value = '';
    lengthInput.value = '';
});

document.addEventListener('DOMContentLoaded', () => {

    async function translatePage(language) {
        try {
            const response = await fetch(`assets/lang/${language}.json`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const translations = await response.json();

            document.querySelectorAll('[data-i18n-key]').forEach(element => {
                const key = element.getAttribute('data-i18n-key');
                if (translations[key]) {
                    if (element.tagName === 'INPUT') {
                        element.placeholder = translations[key]
                    } else {
                        element.innerHTML = translations[key]
                    }
                }
            });

            document.title = translations.title || 'Password Generator'

        } catch (e) {
            console.error('Error loading translations', e)
        }
    }
    const userLanguage = navigator.language || navigator.userLanguage;
    const language = userLanguage.startsWith('en') ? 'en' : 'pt';
    translatePage(language);
});