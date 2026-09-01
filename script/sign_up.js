
      // Toggle password
      document.getElementById('togglePass').addEventListener('click', () => {
        const input = document.getElementById('password');
        const icon = document.getElementById('eyeIcon');
        const isHidden = input.type === 'password';
        input.type = isHidden ? 'text' : 'password';
        icon.className = isHidden ? 'fa fa-eye-slash' : 'fa fa-eye';
      });

      // Mobile menu
      document.getElementById('menuBtn').addEventListener('click', () => {
        document.getElementById('navLinks').classList.toggle('show-menu');
      });

      // Login
      function handleLogin() {
        const email = document.getElementById('email').value.trim();
        const pass = document.getElementById('password').value;
        if (!email || !pass) {
          alert('ইমেইল এবং পাসওয়ার্ড দিন!');
          return;
        }
        alert('লগইন সফল হয়েছে! ✅');
        window.location.href="./home.html"
      }
  