function toggleLogoutMenu() {
  const logoutMenu = document.getElementById("logoutMenu");
  const overlay = document.getElementById("overlay");

  if (logoutMenu.classList.contains("show")) {
    closeLogoutMenu();
  } else {
    logoutMenu.classList.add("show");
    overlay.style.display = "block";
  }
}

function closeLogoutMenu() {
  const logoutMenu = document.getElementById("logoutMenu");
  const overlay = document.getElementById("overlay");
  
  logoutMenu.classList.remove("show");
  overlay.style.display = "none";
}

function logout() {
  alert('You have logged out!');
  window.location.href = '/login.html';
}

document.addEventListener("click", function (event) {
  const logoutMenu = document.getElementById("logoutMenu");
  const logoutButton = document.getElementById("logoutButton"); // The button that opens the menu

  if (
    logoutMenu.classList.contains("show") &&
    !logoutMenu.contains(event.target) &&
    !logoutButton.contains(event.target)
  ) {
    closeLogoutMenu();
  }
});

document.getElementById("overlay").addEventListener("click", closeLogoutMenu);

function reply(commentId) {
  document.getElementById('parent_id').value = commentId;
  document.getElementById('comment-form').scrollIntoView();
}

// Buka modal
function openPaymentModal(amount) {
  const modal = document.getElementById("paymentModal");
  modal.classList.remove("hidden");
  document.body.classList.add("modal-open");

  // Update semua nominal pembayaran
  const paymentAmounts = document.querySelectorAll(".payment-amount");
  paymentAmounts.forEach(span => {
    span.textContent = `Rp ${Number(amount).toLocaleString('id-ID')}`;
    span.style.marginLeft = "auto"; // Biar mojok kanan
  });
}

// Tutup modal
function closePaymentModal() {
  const modal = document.getElementById("paymentModal");
  modal.classList.add("hidden");
  document.body.classList.remove("modal-open");
}

// Klik tombol beli
document.querySelectorAll('.buy-btn').forEach(button => {
  button.addEventListener('click', () => {
    const amount = button.getAttribute('data-amount');
    openPaymentModal(amount);
  });
});

// Klik luar modal → tutup
window.addEventListener("click", function (event) {
  const modal = document.getElementById("paymentModal");
  if (event.target === modal) {
    closePaymentModal();
  }
});