// ═══════════════════════════════════════════════════════════════════════════
// Portfolio CMS — Admin Panel Frontend Logic
// ═══════════════════════════════════════════════════════════════════════════

const API = '/api';
let appData = {};
let availableIcons = [];
let editingSkillIndex = -1;
let editingProjectIndex = -1;
let editingCertIndex = -1;
let projectTechStack = [];
let certTechStack = [];
let projectPoints = [];
let certPoints = [];

// ─── Init ────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', async () => {
  await loadIcons();
  await loadData();
  populateIconSelects();
  setupColorSync();
  setupImageUploads();
});

// ─── Data Loading ────────────────────────────────────────────────────────
async function loadData() {
  try {
    const res = await fetch(`${API}/data`);
    appData = await res.json();
    renderAll();
    showToast('Data loaded successfully', 'success');
  } catch (err) {
    showToast('Failed to load data: ' + err.message, 'error');
  }
}

async function loadIcons() {
  try {
    const res = await fetch(`${API}/icons`);
    availableIcons = await res.json();
  } catch (err) {
    console.error('Failed to load icons:', err);
  }
}

// ─── Render All Sections ─────────────────────────────────────────────────
function renderAll() {
  renderPersonalInfo();
  renderHero();
  renderEducation();
  renderExperience();
  renderSkills();
  renderProjects();
  renderCertifications();
  renderContact();
  renderSocialLinks();
  renderSeo();
  loadImages();
}

// ─── Personal Info ───────────────────────────────────────────────────────
function renderPersonalInfo() {
  const d = appData.personalInfo;
  document.getElementById('pi-name').value = d.name || '';
  document.getElementById('pi-location').value = d.location || '';
  document.getElementById('pi-summary').value = d.summary || '';
  document.getElementById('pi-alt').value = d.alt || '';

  // Photo preview
  const preview = document.getElementById('pi-photo-preview');
  if (d.pfp) {
    preview.innerHTML = `<img src="/portfolio-images/${d.pfp.replace('/img/', '')}" class="image-preview" alt="Profile">
      <span style="font-size: 12px; color: var(--text-muted);">${d.pfp}</span>`;
  }

  // Roles
  renderRoles();
}

function renderRoles() {
  const container = document.getElementById('pi-roles-list');
  const roles = appData.personalInfo.roles || [];
  container.innerHTML = roles.map((role, i) => `
    <div class="point-item">
      <input type="text" class="form-input" value="${escHtml(role)}" onchange="updateRole(${i}, this.value)">
      <button class="point-remove" onclick="removeRole(${i})">✕</button>
    </div>
  `).join('');
}

function addRole() {
  appData.personalInfo.roles = appData.personalInfo.roles || [];
  appData.personalInfo.roles.push('New Role');
  renderRoles();
}

function updateRole(i, val) { appData.personalInfo.roles[i] = val; }
function removeRole(i) { appData.personalInfo.roles.splice(i, 1); renderRoles(); }

// ─── Hero ────────────────────────────────────────────────────────────────
function renderHero() {
  const d = appData.hero;
  document.getElementById('hero-tagline').value = d.tagline || '';
  document.getElementById('hero-headline').value = d.headline || '';
  document.getElementById('hero-subtitle').value = d.subtitle || '';
  document.getElementById('hero-linkedin').value = d.linkedinUrl || '';
  document.getElementById('hero-resume').value = d.resumeUrl || '';
}

// ─── Education ───────────────────────────────────────────────────────────
function renderEducation() {
  const d = appData.education;
  document.getElementById('edu-college').value = d.college || '';
  document.getElementById('edu-course').value = d.course || '';
  document.getElementById('edu-cgpa').value = d.cgpa || '';
  document.getElementById('edu-duration').value = d.duration || '';
}

// ─── Experience ──────────────────────────────────────────────────────────
function renderExperience() {
  const d = appData.experience;
  document.getElementById('exp-company').value = d.companyName || '';
  document.getElementById('exp-title').value = d.title || '';
  document.getElementById('exp-duration').value = d.duration || '';
  document.getElementById('exp-location').value = d.location || '';
  renderExpPoints();
}

function renderExpPoints() {
  const container = document.getElementById('exp-points-list');
  const points = appData.experience.points || [];
  container.innerHTML = points.map((pt, i) => `
    <div class="point-item">
      <input type="text" class="form-input" value="${escHtml(pt)}" onchange="updateExpPoint(${i}, this.value)">
      <button class="point-remove" onclick="removeExpPoint(${i})">✕</button>
    </div>
  `).join('');
}

function addExpPoint() {
  appData.experience.points = appData.experience.points || [];
  appData.experience.points.push('');
  renderExpPoints();
}
function updateExpPoint(i, val) { appData.experience.points[i] = val; }
function removeExpPoint(i) { appData.experience.points.splice(i, 1); renderExpPoints(); }

// ─── Skills ──────────────────────────────────────────────────────────────
function renderSkills() {
  const container = document.getElementById('skills-list');
  document.getElementById('skills-count').textContent = appData.skills.length;

  if (appData.skills.length === 0) {
    container.innerHTML = '<div class="empty-state"><div class="empty-state-icon">⚙️</div><div class="empty-state-text">No skills added yet</div></div>';
    return;
  }

  container.innerHTML = appData.skills.map((s, i) => `
    <div class="list-item">
      <div class="list-item-color" style="background: ${s.color}"></div>
      <span class="list-item-name">${escHtml(s.name)}</span>
      <span class="list-item-icon">${s.icon}</span>
      <div class="list-item-actions">
        <button class="btn btn-sm btn-secondary btn-icon" onclick="editSkill(${i})" title="Edit">✏️</button>
        <button class="btn btn-sm btn-danger btn-icon" onclick="deleteSkill(${i})" title="Delete">🗑️</button>
      </div>
    </div>
  `).join('');
}

function openSkillModal(index = -1) {
  editingSkillIndex = index;
  document.getElementById('skillModalTitle').textContent = index >= 0 ? 'Edit Skill' : 'Add Skill';

  if (index >= 0) {
    const s = appData.skills[index];
    document.getElementById('skill-name').value = s.name;
    document.getElementById('skill-icon').value = s.icon;
    document.getElementById('skill-color').value = normalizeColor(s.color);
    document.getElementById('skill-color-text').value = s.color;
  } else {
    document.getElementById('skill-name').value = '';
    document.getElementById('skill-icon').value = availableIcons[0]?.name || '';
    document.getElementById('skill-color').value = '#6366f1';
    document.getElementById('skill-color-text').value = '#6366f1';
  }

  document.getElementById('skillModal').style.display = 'flex';
}

function editSkill(i) { openSkillModal(i); }

function deleteSkill(i) {
  if (confirm('Delete this skill?')) {
    appData.skills.splice(i, 1);
    renderSkills();
  }
}

function saveSkill() {
  const name = document.getElementById('skill-name').value.trim();
  const icon = document.getElementById('skill-icon').value;
  const color = document.getElementById('skill-color-text').value || document.getElementById('skill-color').value;

  if (!name) { showToast('Skill name is required', 'error'); return; }

  const skill = { name, icon, color };
  if (editingSkillIndex >= 0) {
    appData.skills[editingSkillIndex] = skill;
  } else {
    appData.skills.push(skill);
  }

  closeModal('skillModal');
  renderSkills();
  showToast('Skill saved', 'success');
}

// ─── Projects ────────────────────────────────────────────────────────────
function renderProjects() {
  const grid = document.getElementById('projects-grid');
  document.getElementById('projects-count').textContent = appData.projects.length;

  if (appData.projects.length === 0) {
    grid.innerHTML = '<div class="empty-state"><div class="empty-state-icon">🚀</div><div class="empty-state-text">No projects added yet</div></div>';
    return;
  }

  grid.innerHTML = appData.projects.map((p, i) => `
    <div class="item-card">
      <img src="/portfolio-images/${(p.image || '').replace('/img/', '')}" class="item-card-image" alt="${escHtml(p.name)}" onerror="this.style.display='none'">
      <div class="item-card-body">
        <div class="item-card-title">${escHtml(p.name)}</div>
        <div class="item-card-desc">${escHtml(p.description)}</div>
        <div class="tech-tags" style="margin-bottom: 12px;">
          ${(p.techStack || []).map(t => `<span class="tech-tag"><span style="color:${t.color}">●</span> ${escHtml(t.name)}</span>`).join('')}
        </div>
        <div class="item-card-footer">
          <div style="display: flex; gap: 4px;">
            <button class="btn btn-sm btn-secondary" onclick="editProject(${i})">✏️ Edit</button>
            <button class="btn btn-sm btn-danger" onclick="deleteProject(${i})">🗑️</button>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

function openProjectModal(index = -1) {
  editingProjectIndex = index;
  document.getElementById('projectModalTitle').textContent = index >= 0 ? 'Edit Project' : 'Add Project';

  if (index >= 0) {
    const p = appData.projects[index];
    document.getElementById('proj-name').value = p.name || '';
    document.getElementById('proj-desc').value = p.description || '';
    document.getElementById('proj-live').value = p.liveLink || '#';
    document.getElementById('proj-github').value = p.githubLink || '#';
    document.getElementById('proj-image-path').value = p.image || '';
    projectPoints = [...(p.points || [])];
    projectTechStack = [...(p.techStack || [])];

    const preview = document.getElementById('proj-image-preview');
    if (p.image) {
      preview.innerHTML = `<img src="/portfolio-images/${p.image.replace('/img/', '')}" class="image-preview" alt="">`;
    } else {
      preview.innerHTML = '';
    }
  } else {
    document.getElementById('proj-name').value = '';
    document.getElementById('proj-desc').value = '';
    document.getElementById('proj-live').value = '#';
    document.getElementById('proj-github').value = '#';
    document.getElementById('proj-image-path').value = '';
    document.getElementById('proj-image-preview').innerHTML = '';
    projectPoints = [];
    projectTechStack = [];
  }

  renderProjectPoints();
  renderProjectTechTags();
  document.getElementById('projectModal').style.display = 'flex';
}

function editProject(i) { openProjectModal(i); }
function deleteProject(i) {
  if (confirm('Delete this project?')) {
    appData.projects.splice(i, 1);
    renderProjects();
  }
}

function renderProjectPoints() {
  const container = document.getElementById('proj-points-list');
  container.innerHTML = projectPoints.map((pt, i) => `
    <div class="point-item">
      <input type="text" class="form-input" value="${escHtml(pt)}" onchange="projectPoints[${i}]=this.value">
      <button class="point-remove" onclick="projectPoints.splice(${i},1);renderProjectPoints()">✕</button>
    </div>
  `).join('');
}

function addProjectPoint() { projectPoints.push(''); renderProjectPoints(); }

function renderProjectTechTags() {
  const container = document.getElementById('proj-tech-tags');
  container.innerHTML = projectTechStack.map((t, i) => `
    <span class="tech-tag">
      <span style="color:${t.color}">●</span> ${escHtml(t.name)}
      <button class="tech-tag-remove" onclick="projectTechStack.splice(${i},1);renderProjectTechTags()">✕</button>
    </span>
  `).join('');
}

function addProjectTech() {
  const name = document.getElementById('proj-tech-name').value.trim();
  const icon = document.getElementById('proj-tech-icon').value;
  const color = document.getElementById('proj-tech-color').value;
  if (!name) { showToast('Tech name required', 'error'); return; }
  projectTechStack.push({ name, icon, color });
  document.getElementById('proj-tech-name').value = '';
  renderProjectTechTags();
}

function saveProject() {
  const name = document.getElementById('proj-name').value.trim();
  if (!name) { showToast('Project name is required', 'error'); return; }

  const project = {
    id: editingProjectIndex >= 0 ? appData.projects[editingProjectIndex].id : 'proj_' + Date.now(),
    name,
    description: document.getElementById('proj-desc').value,
    points: [...projectPoints],
    techStack: [...projectTechStack],
    liveLink: document.getElementById('proj-live').value || '#',
    githubLink: document.getElementById('proj-github').value || '#',
    image: document.getElementById('proj-image-path').value
  };

  if (editingProjectIndex >= 0) {
    appData.projects[editingProjectIndex] = project;
  } else {
    appData.projects.push(project);
  }

  closeModal('projectModal');
  renderProjects();
  showToast('Project saved', 'success');
}

// ─── Certifications ──────────────────────────────────────────────────────
function renderCertifications() {
  const grid = document.getElementById('certs-grid');
  document.getElementById('certs-count').textContent = appData.certifications.length;

  if (appData.certifications.length === 0) {
    grid.innerHTML = '<div class="empty-state"><div class="empty-state-icon">🏆</div><div class="empty-state-text">No certifications added yet</div></div>';
    return;
  }

  grid.innerHTML = appData.certifications.map((c, i) => `
    <div class="item-card">
      <img src="/portfolio-images/${(c.image || '').replace('/img/', '')}" class="item-card-image" alt="${escHtml(c.title)}" onerror="this.style.display='none'">
      <div class="item-card-body">
        <div class="item-card-title">${escHtml(c.title)}</div>
        <div class="item-card-desc">${escHtml(c.description)}</div>
        <div class="tech-tags" style="margin-bottom: 12px;">
          ${(c.techStack || []).map(t => `<span class="tech-tag"><span style="color:${t.color}">●</span> ${escHtml(t.name)}</span>`).join('')}
        </div>
        <div class="item-card-footer">
          <div style="display: flex; gap: 4px;">
            <button class="btn btn-sm btn-secondary" onclick="editCert(${i})">✏️ Edit</button>
            <button class="btn btn-sm btn-danger" onclick="deleteCert(${i})">🗑️</button>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

function openCertModal(index = -1) {
  editingCertIndex = index;
  document.getElementById('certModalTitle').textContent = index >= 0 ? 'Edit Certification' : 'Add Certification';

  if (index >= 0) {
    const c = appData.certifications[index];
    document.getElementById('cert-title').value = c.title || '';
    document.getElementById('cert-desc').value = c.description || '';
    document.getElementById('cert-link').value = c.link || '';
    document.getElementById('cert-image-path').value = c.image || '';
    certPoints = [...(c.points || [])];
    certTechStack = [...(c.techStack || [])];

    const preview = document.getElementById('cert-image-preview');
    if (c.image) {
      preview.innerHTML = `<img src="/portfolio-images/${c.image.replace('/img/', '')}" class="image-preview" alt="">`;
    } else {
      preview.innerHTML = '';
    }
  } else {
    document.getElementById('cert-title').value = '';
    document.getElementById('cert-desc').value = '';
    document.getElementById('cert-link').value = '';
    document.getElementById('cert-image-path').value = '';
    document.getElementById('cert-image-preview').innerHTML = '';
    certPoints = [];
    certTechStack = [];
  }

  renderCertPoints();
  renderCertTechTags();
  document.getElementById('certModal').style.display = 'flex';
}

function editCert(i) { openCertModal(i); }
function deleteCert(i) {
  if (confirm('Delete this certification?')) {
    appData.certifications.splice(i, 1);
    renderCertifications();
  }
}

function renderCertPoints() {
  const container = document.getElementById('cert-points-list');
  container.innerHTML = certPoints.map((pt, i) => `
    <div class="point-item">
      <input type="text" class="form-input" value="${escHtml(pt)}" onchange="certPoints[${i}]=this.value">
      <button class="point-remove" onclick="certPoints.splice(${i},1);renderCertPoints()">✕</button>
    </div>
  `).join('');
}

function addCertPoint() { certPoints.push(''); renderCertPoints(); }

function renderCertTechTags() {
  const container = document.getElementById('cert-tech-tags');
  container.innerHTML = certTechStack.map((t, i) => `
    <span class="tech-tag">
      <span style="color:${t.color}">●</span> ${escHtml(t.name)}
      <button class="tech-tag-remove" onclick="certTechStack.splice(${i},1);renderCertTechTags()">✕</button>
    </span>
  `).join('');
}

function addCertTech() {
  const name = document.getElementById('cert-tech-name').value.trim();
  const icon = document.getElementById('cert-tech-icon').value;
  const color = document.getElementById('cert-tech-color').value;
  if (!name) { showToast('Tech name required', 'error'); return; }
  certTechStack.push({ name, icon, color });
  document.getElementById('cert-tech-name').value = '';
  renderCertTechTags();
}

function saveCert() {
  const title = document.getElementById('cert-title').value.trim();
  if (!title) { showToast('Certificate title is required', 'error'); return; }

  const cert = {
    id: editingCertIndex >= 0 ? appData.certifications[editingCertIndex].id : 'cert_' + Date.now(),
    title,
    description: document.getElementById('cert-desc').value,
    link: document.getElementById('cert-link').value,
    image: document.getElementById('cert-image-path').value,
    points: [...certPoints],
    techStack: [...certTechStack]
  };

  if (editingCertIndex >= 0) {
    appData.certifications[editingCertIndex] = cert;
  } else {
    appData.certifications.push(cert);
  }

  closeModal('certModal');
  renderCertifications();
  showToast('Certification saved', 'success');
}

// ─── Contact ─────────────────────────────────────────────────────────────
function renderContact() {
  const d = appData.contact;
  document.getElementById('contact-email').value = d.email || '';
  document.getElementById('contact-whatsapp').value = d.whatsappNumber || '';
  document.getElementById('contact-web3key').value = d.web3formsKey || '';
}

// ─── Social Links ────────────────────────────────────────────────────────
function renderSocialLinks() {
  const d = appData.socialLinks;
  document.getElementById('social-linkedin').value = d.linkedin || '';
  document.getElementById('social-github').value = d.github || '';
}

// ─── SEO ─────────────────────────────────────────────────────────────────
function renderSeo() {
  const d = appData.seo;
  document.getElementById('seo-title').value = d.title || '';
  document.getElementById('seo-sitename').value = d.siteName || '';
  document.getElementById('seo-description').value = d.description || '';
  document.getElementById('seo-siteurl').value = d.siteUrl || '';
  document.getElementById('seo-ogtitle').value = d.ogTitle || '';
  document.getElementById('seo-twtitle').value = d.twitterTitle || '';
  document.getElementById('seo-ogdesc').value = d.ogDescription || '';
  document.getElementById('seo-twdesc').value = d.twitterDescription || '';
  renderKeywords();
}

function renderKeywords() {
  const container = document.getElementById('seo-keywords');
  const keywords = appData.seo.keywords || [];
  container.innerHTML = keywords.map((kw, i) => `
    <span class="keyword-tag">
      ${escHtml(kw)}
      <button onclick="removeKeyword(${i})">✕</button>
    </span>
  `).join('');
}

function addKeyword() {
  const input = document.getElementById('seo-keyword-input');
  const val = input.value.trim();
  if (!val) return;
  appData.seo.keywords = appData.seo.keywords || [];
  appData.seo.keywords.push(val);
  input.value = '';
  renderKeywords();
}

function removeKeyword(i) {
  appData.seo.keywords.splice(i, 1);
  renderKeywords();
}

// ─── Images ──────────────────────────────────────────────────────────────
async function loadImages() {
  try {
    const res = await fetch(`${API}/images`);
    const images = await res.json();
    const grid = document.getElementById('images-grid');
    grid.innerHTML = images.map(img => `
      <div class="item-card">
        <img src="/portfolio-images/${img.name}" class="item-card-image" alt="${img.name}">
        <div class="item-card-body">
          <div class="item-card-title" style="font-size: 13px;">${img.name}</div>
          <div class="item-card-desc">${img.path}</div>
          <div class="item-card-footer">
            <button class="btn btn-sm btn-danger" onclick="deleteImage('${img.name}')">🗑️ Delete</button>
          </div>
        </div>
      </div>
    `).join('');
  } catch (err) {
    console.error('Failed to load images:', err);
  }
}

async function deleteImage(name) {
  if (!confirm(`Delete image "${name}"? This cannot be undone.`)) return;
  try {
    await fetch(`${API}/images/${name}`, { method: 'DELETE' });
    showToast('Image deleted', 'success');
    loadImages();
  } catch (err) {
    showToast('Failed to delete image', 'error');
  }
}

// ─── Image Upload ────────────────────────────────────────────────────────
async function uploadImage(file) {
  const formData = new FormData();
  formData.append('image', file);
  formData.append('imageName', file.name.replace(/\.[^/.]+$/, '').replace(/[^a-zA-Z0-9_-]/g, '_'));

  try {
    const res = await fetch(`${API}/upload`, { method: 'POST', body: formData });
    const data = await res.json();
    if (data.success) {
      showToast('Image uploaded: ' + data.filename, 'success');
      return data.path;
    }
    throw new Error(data.error);
  } catch (err) {
    showToast('Upload failed: ' + err.message, 'error');
    return null;
  }
}

async function uploadProfilePhoto(input) {
  if (!input.files[0]) return;
  const path = await uploadImage(input.files[0]);
  if (path) {
    appData.personalInfo.pfp = path;
    const preview = document.getElementById('pi-photo-preview');
    preview.innerHTML = `<img src="/portfolio-images/${path.replace('/img/', '')}" class="image-preview" alt="Profile">
      <span style="font-size: 12px; color: var(--text-muted);">${path}</span>`;
  }
}

async function uploadGenericImage(input) {
  if (!input.files[0]) return;
  await uploadImage(input.files[0]);
  loadImages();
}

function setupImageUploads() {
  // Project image
  const projInput = document.getElementById('proj-image-input');
  if (projInput) {
    projInput.addEventListener('change', async function() {
      if (!this.files[0]) return;
      const path = await uploadImage(this.files[0]);
      if (path) {
        document.getElementById('proj-image-path').value = path;
        document.getElementById('proj-image-preview').innerHTML =
          `<img src="/portfolio-images/${path.replace('/img/', '')}" class="image-preview" alt="">`;
      }
    });
  }

  // Cert image
  const certInput = document.getElementById('cert-image-input');
  if (certInput) {
    certInput.addEventListener('change', async function() {
      if (!this.files[0]) return;
      const path = await uploadImage(this.files[0]);
      if (path) {
        document.getElementById('cert-image-path').value = path;
        document.getElementById('cert-image-preview').innerHTML =
          `<img src="/portfolio-images/${path.replace('/img/', '')}" class="image-preview" alt="">`;
      }
    });
  }
}

// ─── Save Section ────────────────────────────────────────────────────────
async function saveSection(section) {
  // Collect form data based on section
  let sectionData;

  switch (section) {
    case 'personalInfo':
      sectionData = {
        name: document.getElementById('pi-name').value,
        pfp: appData.personalInfo.pfp,
        alt: document.getElementById('pi-alt').value,
        summary: document.getElementById('pi-summary').value,
        location: document.getElementById('pi-location').value,
        roles: appData.personalInfo.roles || []
      };
      break;

    case 'hero':
      sectionData = {
        tagline: document.getElementById('hero-tagline').value,
        headline: document.getElementById('hero-headline').value,
        subtitle: document.getElementById('hero-subtitle').value,
        linkedinUrl: document.getElementById('hero-linkedin').value,
        resumeUrl: document.getElementById('hero-resume').value
      };
      break;

    case 'education':
      sectionData = {
        college: document.getElementById('edu-college').value,
        course: document.getElementById('edu-course').value,
        cgpa: document.getElementById('edu-cgpa').value,
        duration: document.getElementById('edu-duration').value
      };
      break;

    case 'experience':
      sectionData = {
        companyName: document.getElementById('exp-company').value,
        title: document.getElementById('exp-title').value,
        duration: document.getElementById('exp-duration').value,
        location: document.getElementById('exp-location').value,
        points: appData.experience.points || []
      };
      break;

    case 'skills':
      sectionData = appData.skills;
      break;

    case 'projects':
      sectionData = appData.projects;
      break;

    case 'certifications':
      sectionData = appData.certifications;
      break;

    case 'contact':
      sectionData = {
        email: document.getElementById('contact-email').value,
        whatsappNumber: document.getElementById('contact-whatsapp').value,
        web3formsKey: document.getElementById('contact-web3key').value
      };
      break;

    case 'socialLinks':
      sectionData = {
        linkedin: document.getElementById('social-linkedin').value,
        github: document.getElementById('social-github').value
      };
      break;

    case 'seo':
      sectionData = {
        title: document.getElementById('seo-title').value,
        siteName: document.getElementById('seo-sitename').value,
        description: document.getElementById('seo-description').value,
        siteUrl: document.getElementById('seo-siteurl').value,
        ogTitle: document.getElementById('seo-ogtitle').value,
        ogDescription: document.getElementById('seo-ogdesc').value,
        twitterTitle: document.getElementById('seo-twtitle').value,
        twitterDescription: document.getElementById('seo-twdesc').value,
        keywords: appData.seo.keywords || []
      };
      break;

    default:
      return;
  }

  try {
    const res = await fetch(`${API}/data/${section}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sectionData)
    });
    const result = await res.json();
    if (result.success) {
      appData[section] = sectionData;
      showToast(`${section} saved successfully!`, 'success');
    } else {
      showToast('Failed to save: ' + (result.error || 'Unknown error'), 'error');
    }
  } catch (err) {
    showToast('Save failed: ' + err.message, 'error');
  }
}

// ─── Publish ─────────────────────────────────────────────────────────────
async function publishAll() {
  const btn = document.getElementById('publishBtn');
  btn.innerHTML = '<span class="spinner"></span> Syncing to GitHub...';
  btn.disabled = true;

  try {
    const res = await fetch(`${API}/publish`, { method: 'POST' });
    const result = await res.json();
    if (result.success) {
      showToast(result.message || '🎉 Published! Changes pushed to GitHub. Vercel is updating your site.', 'success');
      if (result.commitUrl) {
        console.log('GitHub Commit:', result.commitUrl);
      }
    } else {
      showToast('Publish failed: ' + (result.error || 'Unknown error'), 'error');
    }
  } catch (err) {
    showToast('Publish failed: ' + err.message, 'error');
  } finally {
    btn.innerHTML = '🚀 Publish to Portfolio';
    btn.disabled = false;
  }
}

// ─── Navigation ──────────────────────────────────────────────────────────
function switchSection(section) {
  // Hide all sections
  document.querySelectorAll('.section-panel').forEach(el => el.classList.remove('active'));
  // Show selected
  const el = document.getElementById(`section-${section}`);
  if (el) el.classList.add('active');

  // Update nav
  document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
  const navItem = document.querySelector(`[data-section="${section}"]`);
  if (navItem) navItem.classList.add('active');

  // Close mobile sidebar
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('sidebarOverlay').classList.remove('open');
}

function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
  document.getElementById('sidebarOverlay').classList.toggle('open');
}

// ─── Modals ──────────────────────────────────────────────────────────────
function closeModal(id) {
  document.getElementById(id).style.display = 'none';
}

// Close modals on overlay click
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.style.display = 'none';
  }
});

// ─── Icon Select Populate ────────────────────────────────────────────────
function populateIconSelects() {
  const selects = ['skill-icon', 'proj-tech-icon', 'cert-tech-icon'];
  const options = availableIcons.map(i =>
    `<option value="${i.name}">${i.name} (${i.package})</option>`
  ).join('');

  selects.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = options;
  });
}

// ─── Color Sync ──────────────────────────────────────────────────────────
function setupColorSync() {
  const colorPicker = document.getElementById('skill-color');
  const colorText = document.getElementById('skill-color-text');
  if (colorPicker && colorText) {
    colorPicker.addEventListener('input', () => { colorText.value = colorPicker.value; });
    colorText.addEventListener('input', () => {
      if (/^#[0-9a-fA-F]{6}$/.test(colorText.value)) {
        colorPicker.value = colorText.value;
      }
    });
  }
}

// ─── Toast ───────────────────────────────────────────────────────────────
function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;

  const icons = { success: '✅', error: '❌', info: 'ℹ️' };
  toast.innerHTML = `<span>${icons[type] || ''}</span> ${message}`;

  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(40px)';
    toast.style.transition = '0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// ─── Utilities ───────────────────────────────────────────────────────────
function escHtml(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function normalizeColor(color) {
  if (!color) return '#6366f1';
  if (color === 'white') return '#ffffff';
  if (color === 'blue') return '#3b82f6';
  if (color === 'orange') return '#f97316';
  if (/^#[0-9a-fA-F]{6,8}$/.test(color)) return color.substring(0, 7);
  return '#6366f1';
}

// Keyboard shortcut: Enter to add keyword
document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && document.activeElement?.id === 'seo-keyword-input') {
    e.preventDefault();
    addKeyword();
  }
});
