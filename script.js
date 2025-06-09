// Module 1: Email validation on signup form
const signupForm = document.getElementById('signupForm');
const emailInput = document.getElementById('email');
const emailError = document.getElementById('emailError');

signupForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const email = emailInput.value.trim();
  if (!validateEmail(email)) {
    emailError.textContent = "❌ Please enter a valid email.";
  } else {
    emailError.textContent = "";
    alert("Signup successful!");
  }
});

function validateEmail(email) {
  // Basic regex for email validation
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Module 2: File upload max size 5MB and confetti on submit
const fileInput = document.getElementById('fileInput');
const fileError = document.getElementById('fileError');
const submitUpload = document.getElementById('submitUpload');
const confettiContainer = document.getElementById('confetti-container');

submitUpload.addEventListener('click', () => {
  fileError.textContent = "";
  const file = fileInput.files[0];
  if (!file) {
    fileError.textContent = "❌ Please select a file.";
    return;
  }
  if (file.size > 5 * 1024 * 1024) {
    fileError.textContent = "❌ File too large—max 5 MB.";
    return;
  }
  // Simulate success
  launchConfetti();
  alert("File uploaded successfully!");
});

function launchConfetti() {
  for (let i = 0; i < 100; i++) {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti');
    confetti.style.left = Math.random() * window.innerWidth + 'px';
    confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
    confettiContainer.appendChild(confetti);
    setTimeout(() => confetti.remove(), 5000);
  }
}

// Add confetti CSS dynamically
const style = document.createElement('style');
style.innerHTML = `
.confetti {
  position: fixed;
  width: 8px;
  height: 8px;
  background-color: #E53935;
  top: 0;
  opacity: 0.7;
  animation-name: confetti-fall;
  animation-timing-function: linear;
  animation-fill-mode: forwards;
}
@keyframes confetti-fall {
  to {
    transform: translateY(100vh) rotate(360deg);
    opacity: 0;
  }
}
`;
document.head.appendChild(style);

// Module 3: Raffle extra entries and countdown timer
const buyExtraBtn = document.getElementById('buyExtra');
const ticketCountSpan = document.getElementById('ticketCount');
const countdownEl = document.getElementById('countdown');

let tickets = 1;
buyExtraBtn.addEventListener('click', () => {
  // Mock POST /api/raffle-extra
  setTimeout(() => {
    tickets += 1;
    ticketCountSpan.textContent = tickets;
    alert("Extra ticket bought!");
  }, 500);
});

// Countdown timer (mock 10 minutes from page load)
const raffleEndTime = Date.now() + 10 * 60 * 1000;
function updateCountdown() {
  const diff = raffleEndTime - Date.now();
  if (diff <= 0) {
    countdownEl.textContent = "Raffle closed";
    buyExtraBtn.disabled = true;
    return;
  }
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  countdownEl.textContent = `Raffle closes in ${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}
function pad(num) {
  return num.toString().padStart(2, '0');
}
setInterval(updateCountdown, 1000);
updateCountdown();

// Module 4: Admin check redirect (mock)
const isAdmin = true; // Change to false to test redirect
if (!isAdmin) {
  alert("Not admin! Redirecting...");
  window.location.href = '/';
}

// Module 5: Stripe payment button simulation
const buyBoostBtn = document.getElementById('buyBoostBtn');
const paymentMessage = document.getElementById('paymentMessage');

buyBoostBtn.addEventListener('click', () => {
  buyBoostBtn.disabled = true;
  paymentMessage.textContent = "";
  // Simulate API call delay
  setTimeout(() => {
    const paymentFailed = Math.random() < 0.3; // 30% fail chance
    if (paymentFailed) {
      paymentMessage.textContent = "❌ Payment failed. Please try again.";
      buyBoostBtn.disabled = false;
    } else {
      paymentMessage.textContent = "Payment successful!";
      // Show loading spinner (can add if you want)
    }
  }, 2000);
});

// Module 6: Badge and progress bar based on points
const points = 40;
const badge = document.getElementById('badge');
const pointsSpan = document.getElementById('points');
const progressFill = document.getElementById('progressFill');

pointsSpan.textContent = points;
const progressPercent = Math.min(points, 100);
progressFill.style.width = progressPercent + '%';

if (points >= 10) {
  badge.style.display = 'inline';
} else {
  badge.style.display = 'none';
}
