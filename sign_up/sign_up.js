
      // Mobile menu
      document.getElementById('menuBtn').addEventListener('click', () => {
        document.getElementById('navLinks').classList.toggle('show-menu');
      });

      // Toggle password visibility
      function makeToggle(btnId, iconId, inputId) {
        document.getElementById(btnId).addEventListener('click', () => {
          const input = document.getElementById(inputId);
          const icon  = document.getElementById(iconId);
          const isHidden = input.type === 'password';
          input.type = isHidden ? 'text' : 'password';
          icon.className = isHidden ? 'fa fa-eye-slash' : 'fa fa-eye';
        });
      }
      makeToggle('togglePass1', 'eyeIcon1', 'password');
      makeToggle('togglePass2', 'eyeIcon2', 'confirmPassword');

      // Password strength
      function checkStrength(val) {
        const fill  = document.getElementById('strengthFill');
        const label = document.getElementById('strengthLabel');
        let score = 0;
        if (val.length >= 8) score++;
        if (/[A-Z]/.test(val)) score++;
        if (/[0-9]/.test(val)) score++;
        if (/[^A-Za-z0-9]/.test(val)) score++;

        const configs = [
          { w:'0%',   bg:'#E0E2D8', text:'' },
          { w:'25%',  bg:'#f44336', text:'দুর্বল 😬' },
          { w:'50%',  bg:'#ff9800', text:'মোটামুটি 🤔' },
          { w:'75%',  bg:'#2196f3', text:'ভালো 👍' },
          { w:'100%', bg:'#4caf50', text:'শক্তিশালী 💪' },
        ];
        const cfg = configs[val.length === 0 ? 0 : score] || configs[1];
        fill.style.width      = cfg.w;
        fill.style.background = cfg.bg;
        label.textContent     = cfg.text;
        label.style.color     = cfg.bg;
      }

      // Live validation helpers
      function validateField(input, isValid) {
        input.classList.toggle('valid',   isValid);
        input.classList.toggle('invalid', !isValid && input.value.length > 0);
      }

      document.getElementById('firstName').addEventListener('input', function() {
        validateField(this, this.value.trim().length >= 2);
      });
      document.getElementById('lastName').addEventListener('input', function() {
        validateField(this, this.value.trim().length >= 2);
      });
      document.getElementById('username').addEventListener('input', function() {
        validateField(this, /^[a-zA-Z0-9_]{3,}$/.test(this.value));
      });
      document.getElementById('email').addEventListener('input', function() {
        validateField(this, /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.value));
      });
      document.getElementById('confirmPassword').addEventListener('input', function() {
        const pass = document.getElementById('password').value;
        validateField(this, this.value === pass && this.value.length > 0);
      });

      // Signup handler
      function handleSignup() {
        const firstName = document.getElementById('firstName').value.trim();
        const lastName  = document.getElementById('lastName').value.trim();
        const username  = document.getElementById('username').value.trim();
        const email     = document.getElementById('email').value.trim();
        const pass      = document.getElementById('password').value;
        const confirm   = document.getElementById('confirmPassword').value;
        const terms     = document.getElementById('terms').checked;

        if (!firstName || !lastName || !username || !email || !pass || !confirm) {
          alert('সব ঘর পূরণ করো!'); return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          alert('সঠিক ইমেইল দাও!'); return;
        }
        if (pass.length < 8) {
          alert('পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে!'); return;
        }
        if (pass !== confirm) {
          alert('পাসওয়ার্ড দুটি মিলছে না!'); return;
        }
        if (!terms) {
          alert('Terms & Privacy Policy তে সম্মত হও!'); return;
        }
        alert(`স্বাগতম, ${firstName}! 🎉 তোমার অ্যাকাউন্ট তৈরি হয়েছে।`);
      }
   