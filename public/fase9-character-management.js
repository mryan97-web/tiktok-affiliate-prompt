/**
 * FASE 9 — CHARACTER MANAGEMENT
 * Tier system, character upload, AI descriptor extraction
 * Standalone module — tidak mengganggu index.html
 */

// ===================================================================
// TIER SYSTEM & USER AUTH (localStorage-based)
// ===================================================================
const TIER_SYSTEM = {
  FREE: {
    name: 'Free',
    maxCharacters: 1,
    canUploadReference: false,
    allowedCharacters: ['AREKA_GIRL_001', 'AREKA_GUY_001'],
  },
  PRO: {
    name: 'Pro',
    maxCharacters: 5,
    canUploadReference: true,
    allowedCharacters: ['AREKA_GIRL_001', 'AREKA_GUY_001', 'CUSTOM_1', 'CUSTOM_2', 'CUSTOM_3'],
  },
};

let currentUser = null;
let userTier = 'FREE';

function initAuth() {
  const saved = localStorage.getItem('arekaProdDB_user');
  if (saved) {
    try {
      currentUser = JSON.parse(saved);
      userTier = currentUser.tier || 'FREE';
    } catch (e) {
      currentUser = createNewUser();
    }
  } else {
    currentUser = createNewUser();
  }
}

function createNewUser() {
  return {
    id: 'user_' + Date.now(),
    tier: 'FREE',
    characters: {},
    createdAt: new Date().toISOString(),
  };
}

function saveUser() {
  localStorage.setItem('arekaProdDB_user', JSON.stringify(currentUser));
  userTier = currentUser.tier;
}

function getAvailableCharacters() {
  const tier = TIER_SYSTEM[userTier];
  return tier.allowedCharacters;
}

function canUploadCharacter() {
  return TIER_SYSTEM[userTier].canUploadReference;
}

// ===================================================================
// CHARACTER MANAGEMENT
// ===================================================================
function saveCharacter(charId, charData) {
  if (!currentUser.characters) currentUser.characters = {};
  currentUser.characters[charId] = {
    ...charData,
    updatedAt: new Date().toISOString(),
  };
  saveUser();
}

function getCharacter(charId) {
  return currentUser.characters?.[charId] || null;
}

function getAllUserCharacters() {
  return currentUser.characters || {};
}

// ===================================================================
// CHARACTER MANAGEMENT UI FUNCTIONS
// ===================================================================

function renderCharacterOverview() {
  const tierBadge = document.getElementById('tierBadge');
  const tierStatus = document.getElementById('tierStatus');
  const availableChars = document.getElementById('availableChars');

  if (tierBadge) tierBadge.textContent = `Tier: ${userTier}`;

  const tier = TIER_SYSTEM[userTier];
  if (tierStatus) {
    tierStatus.innerHTML = `
      <strong>${tier.name} Tier</strong><br>
      Max Characters: ${tier.maxCharacters}<br>
      Upload Reference: ${tier.canUploadReference ? '✅ Enabled' : '❌ Disabled'}<br>
      <button onclick="upgradeToProDemo()" style="margin-top: 0.5rem; padding: 0.5rem 1rem; background: #1976d2; color: white; border: none; border-radius: 4px; cursor: pointer;">Upgrade to PRO →</button>
    `;
  }

  if (availableChars) {
    const chars = getAvailableCharacters();
    availableChars.innerHTML = chars.map(charId => {
      const char = charId.startsWith('CUSTOM_') ? getCharacter(charId) : { name: charId, gender: 'Default' };
      return `
        <div style="padding: 1rem; background: #f5f5f5; border-radius: 8px; border-left: 4px solid #2d7a3e;">
          <h3 style="margin: 0 0 0.5rem 0;">${char?.name || charId}</h3>
          <p style="margin: 0; font-size: 0.9rem; color: #666;">${char?.gender || 'N/A'}</p>
          ${charId.startsWith('CUSTOM_') && char ? `
            <div style="margin-top: 0.5rem; padding-top: 0.5rem; border-top: 1px solid #ddd;">
              <span style="font-size: 0.85rem; color: #999;">Created: ${new Date(char.createdAt).toLocaleDateString('id-ID')}</span>
            </div>
          ` : ''}
        </div>
      `;
    }).join('');
  }
}

async function uploadCharacter() {
  if (!canUploadCharacter()) {
    alert('❌ Upload hanya tersedia untuk PRO tier. Upgrade terlebih dahulu!');
    return;
  }

  const charName = document.getElementById('charName').value.trim();
  const photo1Input = document.getElementById('charPhoto1');
  const photo2Input = document.getElementById('charPhoto2');
  const uploadResult = document.getElementById('uploadResult');

  if (!charName) {
    alert('⚠️ Masukkan nama karakter');
    return;
  }

  if (!photo1Input.files[0]) {
    alert('⚠️ Upload minimal 1 foto referensi');
    return;
  }

  const btn = document.querySelector('[onclick="uploadCharacter()"]');
  if (btn) {
    btn.disabled = true;
    btn.textContent = '⏳ Processing...';
  }

  try {
    const charId = `CUSTOM_${Date.now()}`;
    const photos = [];
    const descriptors = [];

    const processPhoto = async (file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = async (e) => {
          const base64 = e.target.result.split(',')[1];
          try {
            const res = await fetch('/api/character-upload', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                image: base64,
                mimeType: file.type,
                characterName: charName,
                action: 'extract',
              }),
            });

            const data = await res.json();
            if (data.success) {
              photos.push(data.blobUrl);
              descriptors.push(data.descriptor);
            }
          } catch (err) {
            console.error('Photo processing error:', err);
          }
          resolve();
        };
        reader.readAsDataURL(file);
      });
    };

    // Process photo 1
    await processPhoto(photo1Input.files[0]);

    // Process photo 2 if exists
    if (photo2Input.files[0]) {
      await processPhoto(photo2Input.files[0]);
    }

    // Save character
    const charData = {
      id: charId,
      name: charName,
      photos,
      descriptor: descriptors,
      isLocked: false,
      createdAt: new Date().toISOString(),
    };

    saveCharacter(charId, charData);

    // Show result
    if (uploadResult) {
      uploadResult.style.display = 'block';
      uploadResult.innerHTML = `
        <strong>✅ Karakter berhasil diupload!</strong><br>
        <span>ID: ${charId}</span><br>
        <span>Nama: ${charName}</span><br>
        <span>Foto: ${photos.length}</span>
      `;
    }

    renderCharacterOverview();
    populateCharacterSelects();

  } catch (err) {
    console.error('Upload error:', err);
    alert('❌ Error: ' + err.message);
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.textContent = '✅ Upload & Extract';
    }
  }
}

function lockCharacter() {
  const charId = document.getElementById('lockCharSelect').value;
  const isLocked = document.getElementById('lockToggle').checked;
  const lockStatus = document.getElementById('lockStatus');

  if (!charId) {
    alert('⚠️ Pilih karakter terlebih dahulu');
    return;
  }

  const char = getCharacter(charId);
  if (char) {
    char.isLocked = isLocked;
    saveCharacter(charId, char);

    if (lockStatus) {
      lockStatus.style.display = 'block';
      lockStatus.textContent = isLocked ? `✅ ${char.name} terkunci untuk semua prompt` : `🔓 ${char.name} tidak terkunci`;
    }
  }
}

function previewCharacter() {
  const charId = document.getElementById('previewCharSelect').value;
  const content = document.getElementById('charPreviewContent');

  if (!charId) {
    if (content) content.innerHTML = '<p>Pilih karakter untuk preview</p>';
    return;
  }

  const char = getCharacter(charId);
  if (!char) {
    if (content) content.innerHTML = '<p>Karakter tidak ditemukan</p>';
    return;
  }

  if (content) {
    content.innerHTML = `
      <div>
        <h3>${char.name}</h3>
        <p><strong>Created:</strong> ${new Date(char.createdAt).toLocaleString('id-ID')}</p>
        <p><strong>Locked:</strong> ${char.isLocked ? '✅ Yes' : '❌ No'}</p>
      </div>
      ${char.photos.map((url, i) => `
        <div>
          <h4>Foto ${i + 1}</h4>
          <img src="${url}" style="max-width: 300px; border-radius: 8px; margin-bottom: 1rem;">
          <h4>Descriptor</h4>
          <pre style="background: #f5f5f5; padding: 1rem; border-radius: 4px; overflow-x: auto;"><code>${JSON.stringify(char.descriptor[i], null, 2)}</code></pre>
        </div>
      `).join('')}
    `;
  }
}

function deleteCharacter() {
  const charId = document.getElementById('deleteCharSelect').value;
  const deleteStatus = document.getElementById('deleteStatus');

  if (!charId) {
    alert('⚠️ Pilih karakter terlebih dahulu');
    return;
  }

  if (!confirm(`Hapus karakter ${charId}? Tindakan ini tidak bisa dibatalkan.`)) {
    return;
  }

  if (!currentUser.characters) currentUser.characters = {};
  delete currentUser.characters[charId];
  saveUser();

  if (deleteStatus) {
    deleteStatus.style.display = 'block';
    deleteStatus.textContent = `✅ Karakter ${charId} berhasil dihapus`;
  }

  renderCharacterOverview();
  populateCharacterSelects();
}

function upgradeToProDemo() {
  currentUser.tier = 'PRO';
  saveUser();
  alert('✅ Tier upgraded ke PRO! (Demo mode)');
  renderCharacterOverview();
  populateCharacterSelects();
}

function populateCharacterSelects() {
  const chars = getAvailableCharacters();
  const lockSelect = document.getElementById('lockCharSelect');
  const previewSelect = document.getElementById('previewCharSelect');
  const deleteSelect = document.getElementById('deleteCharSelect');

  const options = chars.map(id => `<option value="${id}">${id}</option>`).join('');

  if (lockSelect) lockSelect.innerHTML = '<option value="">-- Pilih Karakter --</option>' + options;
  if (previewSelect) previewSelect.innerHTML = '<option value="">-- Pilih Karakter --</option>' + options;

  if (deleteSelect) {
    const customChars = chars.filter(id => id.startsWith('CUSTOM_'));
    deleteSelect.innerHTML = '<option value="">-- Pilih Karakter Custom --</option>' + 
      customChars.map(id => `<option value="${id}">${id}</option>`).join('');
  }
}

function handlePhotoUpload(photoNum) {
  const inputId = `charPhoto${photoNum}`;
  const input = document.getElementById(inputId);
  const statusId = `photo${photoNum}Status`;
  const status = document.getElementById(statusId);

  if (!input) return;

  input.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file && status) {
      status.textContent = `✅ ${file.name}`;
    }
  });
}

// Auto-init on page load
document.addEventListener('DOMContentLoaded', () => {
  initAuth();
  renderCharacterOverview();
  populateCharacterSelects();
  handlePhotoUpload(1);
  handlePhotoUpload(2);
});
