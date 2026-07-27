// Subscription & Payment System
// Supabase Auth + QRIS Payment Integration

const SUBSCRIPTION_TIERS = {
  FREE: {
    name: 'Free',
    price: 0,
    currency: 'IDR',
    uploads_per_day: 1,
    pose_options: 'default_only',
    scene_options: 'default_only',
    features: ['1 upload/hari', 'Pose default', 'Scene default', 'No login required'],
  },
  WEEKLY: {
    name: 'Weekly',
    price: 5000,
    currency: 'IDR',
    period_days: 7,
    uploads_per_day: 10,
    pose_options: 'all',
    scene_options: 'all',
    features: ['10 uploads/hari', 'Semua pose', 'Semua scene', 'Email login', '7 hari akses'],
  },
  MONTHLY: {
    name: 'Monthly',
    price: 30000,
    currency: 'IDR',
    period_days: 30,
    uploads_per_day: 100,
    pose_options: 'all',
    scene_options: 'all',
    features: ['100 uploads/hari', 'Semua pose', 'Semua scene', 'Email login', '30 hari akses'],
  },
  YEARLY: {
    name: 'Yearly',
    price: 150000,
    currency: 'IDR',
    period_days: 365,
    uploads_per_day: 1000,
    pose_options: 'all',
    scene_options: 'all',
    features: ['1000 uploads/hari', 'Semua pose', 'Semua scene', 'Email login', '365 hari akses'],
  },
};

let currentUser = null;
let userSubscription = null;

// ===================================================================
// AUTH & USER MANAGEMENT
// ===================================================================

function initSubscriptionSystem() {
  const stored = localStorage.getItem('arekaSubs_user');
  if (stored) {
    try {
      currentUser = JSON.parse(stored);
      userSubscription = JSON.parse(localStorage.getItem('arekaSubs_subscription') || 'null');
    } catch (e) {
      currentUser = null;
      userSubscription = null;
    }
  }
}

function saveUser(user) {
  currentUser = user;
  localStorage.setItem('arekaSubs_user', JSON.stringify(user));
}

function saveSubscription(sub) {
  userSubscription = sub;
  localStorage.setItem('arekaSubs_subscription', JSON.stringify(sub));
}

function getUserTier() {
  if (!currentUser) return 'FREE';
  if (!userSubscription) return 'FREE';
  
  const now = new Date();
  const expiry = new Date(userSubscription.expires_at);
  
  if (expiry > now) {
    return userSubscription.tier;
  } else {
    // Subscription expired
    userSubscription = null;
    localStorage.removeItem('arekaSubs_subscription');
    return 'FREE';
  }
}

function getUploadLimit() {
  const tier = getUserTier();
  return SUBSCRIPTION_TIERS[tier].uploads_per_day;
}

function canAccessAllPoses() {
  const tier = getUserTier();
  return SUBSCRIPTION_TIERS[tier].pose_options === 'all';
}

function canAccessAllScenes() {
  const tier = getUserTier();
  return SUBSCRIPTION_TIERS[tier].scene_options === 'all';
}

// ===================================================================
// LOGIN / SIGNUP UI
// ===================================================================

function showLoginModal() {
  const modal = document.getElementById('loginModal');
  if (modal) modal.style.display = 'block';
}

function closeLoginModal() {
  const modal = document.getElementById('loginModal');
  if (modal) modal.style.display = 'none';
}

async function loginWithEmail() {
  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value;

  if (!email || !password) {
    alert('⚠️ Email dan password wajib diisi');
    return;
  }

  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, method: 'email' }),
    });

    const data = await res.json();
    if (data.success) {
      saveUser(data.user);
      if (data.subscription) {
        saveSubscription(data.subscription);
      }
      closeLoginModal();
      location.reload();
    } else {
      alert('❌ ' + data.error);
    }
  } catch (err) {
    console.error('Login error:', err);
    alert('❌ Login gagal: ' + err.message);
  }
}

async function signupWithEmail() {
  const email = document.getElementById('signupEmail').value.trim();
  const password = document.getElementById('signupPassword').value;
  const confirmPassword = document.getElementById('signupConfirmPassword').value;

  if (!email || !password || !confirmPassword) {
    alert('⚠️ Semua field wajib diisi');
    return;
  }

  if (password !== confirmPassword) {
    alert('⚠️ Password tidak cocok');
    return;
  }

  if (password.length < 6) {
    alert('⚠️ Password minimal 6 karakter');
    return;
  }

  try {
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (data.success) {
      alert('✅ Signup berhasil! Check email untuk verifikasi.');
      saveUser(data.user);
      closeLoginModal();
      showLoginTab();
    } else {
      alert('❌ ' + data.error);
    }
  } catch (err) {
    console.error('Signup error:', err);
    alert('❌ Signup gagal: ' + err.message);
  }
}

async function loginWithGoogle() {
  try {
    const res = await fetch('/api/auth/google', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await res.json();
    if (data.auth_url) {
      window.location.href = data.auth_url;
    }
  } catch (err) {
    console.error('Google login error:', err);
    alert('❌ Google login error');
  }
}

function logout() {
  if (confirm('Logout?')) {
    localStorage.removeItem('arekaSubs_user');
    localStorage.removeItem('arekaSubs_subscription');
    location.reload();
  }
}

// ===================================================================
// PAYMENT / SUBSCRIPTION
// ===================================================================

async function showPricingModal() {
  const modal = document.getElementById('pricingModal');
  if (modal) modal.style.display = 'block';
}

function closePricingModal() {
  const modal = document.getElementById('pricingModal');
  if (modal) modal.style.display = 'none';
}

async function startSubscription(tier) {
  if (!currentUser) {
    alert('⚠️ Login terlebih dahulu');
    showLoginModal();
    return;
  }

  const tierInfo = SUBSCRIPTION_TIERS[tier];
  
  try {
    const res = await fetch('/api/payment/qris', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id: currentUser.id,
        user_email: currentUser.email,
        tier: tier,
        amount: tierInfo.price,
        period_days: tierInfo.period_days,
      }),
    });

    const data = await res.json();
    if (data.success) {
      // Show QRIS code
      showQRISPayment(data.qris_code, data.order_id, tier);
    } else {
      alert('❌ ' + data.error);
    }
  } catch (err) {
    console.error('Payment error:', err);
    alert('❌ Payment error: ' + err.message);
  }
}

function showQRISPayment(qrisCode, orderId, tier) {
  const modal = document.getElementById('qrisModal');
  if (modal) {
    document.getElementById('qrisImage').src = qrisCode;
    document.getElementById('orderId').textContent = orderId;
    document.getElementById('tierName').textContent = SUBSCRIPTION_TIERS[tier].name;
    document.getElementById('tierPrice').textContent = SUBSCRIPTION_TIERS[tier].price.toLocaleString('id-ID');
    modal.style.display = 'block';
    
    // Poll for payment status every 3 seconds
    pollPaymentStatus(orderId);
  }
}

async function pollPaymentStatus(orderId) {
  const maxAttempts = 120; // 6 minutes
  let attempts = 0;

  const poll = async () => {
    try {
      const res = await fetch(`/api/payment/status?order_id=${orderId}`);
      const data = await res.json();

      if (data.status === 'paid') {
        alert('✅ Pembayaran berhasil! Subscription aktif.');
        saveSubscription(data.subscription);
        closeQRISModal();
        location.reload();
      } else if (data.status === 'failed') {
        alert('❌ Pembayaran gagal');
        closeQRISModal();
      } else if (attempts < maxAttempts) {
        attempts++;
        setTimeout(poll, 3000);
      }
    } catch (err) {
      console.error('Poll error:', err);
    }
  };

  poll();
}

function closeQRISModal() {
  const modal = document.getElementById('qrisModal');
  if (modal) modal.style.display = 'none';
}

// ===================================================================
// UI HELPERS
// ===================================================================

function renderUserStatus() {
  const userStatus = document.getElementById('userStatus');
  if (!userStatus) return;

  if (currentUser) {
    const tier = getUserTier();
    const tierInfo = SUBSCRIPTION_TIERS[tier];
    
    let html = `
      <div style="padding: 1rem; background: #e3f2fd; border-radius: 8px; margin-bottom: 1rem;">
        <p><strong>📧 ${currentUser.email}</strong></p>
        <p>Tier: <strong>${tierInfo.name}</strong></p>
    `;

    if (userSubscription && tier !== 'FREE') {
      const expiry = new Date(userSubscription.expires_at);
      html += `<p>Berlaku sampai: ${expiry.toLocaleDateString('id-ID')}</p>`;
    }

    html += `
        <button class="btn-logout" onclick="logout()" style="margin-top: 0.5rem; padding: 0.5rem 1rem; background: #c62828; color: white; border: none; border-radius: 4px; cursor: pointer;">🚪 Logout</button>
      </div>
    `;

    userStatus.innerHTML = html;
  } else {
    userStatus.innerHTML = `
      <div style="padding: 1rem; background: #fff3cd; border-radius: 8px;">
        <p><strong>FREE Tier</strong> — 1 upload/hari, pose & scene default</p>
        <button onclick="showLoginModal()" style="margin-top: 0.5rem; padding: 0.5rem 1rem; background: #1976d2; color: white; border: none; border-radius: 4px; cursor: pointer;">🔑 Login untuk PRO</button>
      </div>
    `;
  }
}

function showLoginTab() {
  const loginTab = document.getElementById('loginTab');
  const signupTab = document.getElementById('signupTab');
  
  if (loginTab) loginTab.style.display = 'block';
  if (signupTab) signupTab.style.display = 'none';
  
  document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
  document.querySelector('[onclick*="showLoginTab"]')?.classList.add('active');
}

function showSignupTab() {
  const loginTab = document.getElementById('loginTab');
  const signupTab = document.getElementById('signupTab');
  
  if (loginTab) loginTab.style.display = 'none';
  if (signupTab) signupTab.style.display = 'block';
  
  document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
  document.querySelector('[onclick*="showSignupTab"]')?.classList.add('active');
}

// Auto-init
document.addEventListener('DOMContentLoaded', () => {
  initSubscriptionSystem();
  renderUserStatus();
});
