

let controls;
const myMesh = new THREE.Mesh();
let modelRadius = null;


const projectState = { data: [], activeIndex: -1 };
const projectEls = {
    list: document.getElementById('project-list'),
    detail: document.getElementById('project-detail'),
    activeName: document.getElementById('project-active-name'),
    status: document.getElementById('project-status'),
    description: document.getElementById('project-description'),
    count: document.getElementById('project-count'),
    openLink: document.getElementById('project-open')
};
const mobileEls = {
    shell: document.getElementById('mobile-shell'),
    list: document.getElementById('mobile-projects'),
    count: document.getElementById('mobile-project-count')
};
const bodyEl = document.body;
const renderPlaceholder = document.getElementById('render-placeholder');
const ambientAudio = document.getElementById('butter-audio');
const playerEls = {
    toggle: document.getElementById('player-toggle'),
    volume: document.getElementById('player-volume'),
    mobileToggle: document.getElementById('mobile-player-toggle'),
    mobileVolume: document.getElementById('mobile-player-volume')
};

if (projectEls.list) {
    loadProjects();
}

initAmbientAudio();
setupPlayerControls();


const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);


const pointLight1 = new THREE.PointLight(0xffffff, 1);
pointLight1.position.set(100, 100, 400);
scene.add(pointLight1);


const stlLoader = new THREE.STLLoader();
stlLoader.setCrossOrigin('anonymous');

const MODEL_URL = 'model.stl';


const material = new THREE.MeshStandardMaterial({ flatShading: true, side: THREE.DoubleSide });


const sizes = { width: window.innerWidth, height: window.innerHeight };


const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 2000);


const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio ? window.devicePixelRatio : 1);
renderer.setSize(sizes.width, sizes.height);

let characters = ' .:-+*=%@#';
let effect;
const effectSize = { amount: 0.205 };
let backgroundColor = 'black';
let ASCIIColor = 'white';

const isMobileDevice = () => {
    if (typeof window !== 'undefined' && window.matchMedia) {
        const coarse = window.matchMedia('(pointer: coarse)').matches;
        if (coarse) return true;
    }
    return /(Mobi|Android|iPhone|iPad|iPod|Mobile)/i.test(navigator.userAgent);
};

const mobileMode = isMobileDevice();
const shouldRenderAscii = !mobileMode;
setExperienceShell(mobileMode);
if (!shouldRenderAscii && renderPlaceholder) {
    renderPlaceholder.classList.remove('hidden');
}

function setExperienceShell(isMobile) {
    if (!bodyEl) return;
    if (isMobile) {
        bodyEl.classList.add('mobile-experience');
        bodyEl.classList.remove('desktop-locked');
    } else {
        bodyEl.classList.add('desktop-locked');
        bodyEl.classList.remove('mobile-experience');
    }
}

function createEffect() {
    effect = new THREE.AsciiEffect(renderer, characters, { invert: true, resolution: effectSize.amount });
    effect.setSize(sizes.width, sizes.height);
    effect.domElement.style.color = ASCIIColor;
    effect.domElement.style.backgroundColor = backgroundColor;
    const el = effect.domElement;
    el.style.position = 'absolute';
    el.style.left = '0';
    el.style.top = '0';
    el.style.width = '100%';
    el.style.height = '100%';
    el.style.display = 'flex';
    el.style.alignItems = 'center';
    el.style.justifyContent = 'center';
    el.style.boxSizing = 'border-box';
    el.style.margin = '0';
    el.style.padding = '0';
    el.style.overflow = 'hidden';
    el.style.touchAction = 'none';
    el.style.userSelect = 'none';
    el.style.webkitUserSelect = 'none';
    el.style.cursor = 'auto';
    el.style.zIndex = '0';
}

if (shouldRenderAscii) {
    createEffect();
    document.body.appendChild(effect.domElement);
    centerAsciiContent();
} else if (renderPlaceholder) {
    renderPlaceholder.classList.add('flex');
}
function attachTouchHandlers(el) {
    if (!el || el.__touchHandlersAttached) return;
    const preventTouchScroll = (evt) => {
        if (evt.cancelable) evt.preventDefault();
    };
    ['touchstart', 'touchmove', 'touchend', 'touchcancel'].forEach(type => {
        el.addEventListener(type, preventTouchScroll, { passive: false });
    });
    el.__touchHandlersAttached = true;
}

function centerAsciiContent() {
    const el = effect.domElement;
    if (!el) return;
    attachTouchHandlers(el);

    const inner = el.querySelector('pre, table');
    if (inner) {

        inner.style.display = 'inline-block';
        inner.style.width = 'auto';
        inner.style.maxWidth = 'none';
        inner.style.margin = '0 auto';
        inner.style.boxSizing = 'border-box';
        inner.style.whiteSpace = 'pre';

        inner.style.textAlign = 'left';
        inner.style.position = 'relative';
    }
}

async function loadProjects() {
    try {
        const response = await fetch('projects.json', { cache: 'no-cache' });
        if (!response.ok) throw new Error(`projects.json responded with ${response.status}`);
        const payload = await response.json();
        projectState.data = Array.isArray(payload) ? payload : [];
        updateProjectCount();
        renderProjectList();
        renderMobileProjects();
    } catch (error) {
        if (projectEls.list) {
            projectEls.list.innerHTML = '<p class="text-xs text-red-300/80">unable to load project feed</p>';
        }
        if (mobileEls.list) {
            mobileEls.list.innerHTML = '<p class="text-sm text-red-300/80">unable to load project feed</p>';
        }
        console.error(error);
    }
}

function updateProjectCount() {
    const value = projectState.data.length.toString().padStart(2, '0');
    if (projectEls.count) projectEls.count.textContent = value;
    if (mobileEls.count) mobileEls.count.textContent = value;
}

function renderProjectList() {
    if (!projectEls.list) return;
    projectEls.list.innerHTML = '';
    if (!projectState.data.length) return;

    projectState.data.forEach((project, index) => {
        const card = createProjectCard(project, index);
        projectEls.list.appendChild(card);
    });

    const startIndex = projectState.activeIndex >= 0 ? projectState.activeIndex : 0;
    setActiveProject(startIndex);
}

function createProjectCard(project, index) {
    const primary = project?.palette?.primary || '#262626';
    const secondary = project?.palette?.secondary || '#000000';
    const accent = project?.palette?.accent || primary;
    const order = (index + 1).toString().padStart(2, '0');
    const link = document.createElement('a');
    link.href = project.url || '#';
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.dataset.projectIndex = index;
    link.className = 'group relative block rounded-[28px] border border-white/8 px-5 py-5 transition duration-300 pointer-events-auto';
    link.style.background = 'rgba(8,8,8,0.65)';
    link.style.boxShadow = '0 18px 28px rgba(0,0,0,0.35)';

    link.innerHTML = `
        <div class="flex items-center justify-between text-xs text-gray-400 mb-3">
            <span>${order}</span>
            <span class="flex items-center gap-2" style="color:${hexToRgba(accent, 0.75)}">
                <span class="inline-flex h-2 w-2 rounded-full" style="background:${accent}"></span>
                ${project.status || 'Building'}
            </span>
        </div>
        <p class="text-lg font-semibold text-white leading-tight">${project.name || 'Untitled'}</p>
        <div class="mt-4 h-px w-full" style="background: linear-gradient(90deg, ${secondary}, transparent);"></div>
    `;

    link.addEventListener('mouseenter', () => setActiveProject(index));
    link.addEventListener('focus', () => setActiveProject(index));

    return link;
}

function renderMobileProjects() {
    if (!mobileEls.list) return;
    mobileEls.list.innerHTML = '';
    if (!projectState.data.length) {
        mobileEls.list.innerHTML = '<p class="text-sm text-gray-400">No projects to show (yet).</p>';
        return;
    }
    projectState.data.forEach((project, index) => {
        const card = createMobileProjectCard(project, index);
        mobileEls.list.appendChild(card);
    });
}

function createMobileProjectCard(project, index) {
    const primary = project?.palette?.primary || '#202020';
    const accent = project?.palette?.accent || primary;
    const disabled = !project.url;
    const order = (index + 1).toString().padStart(2, '0');
    const card = document.createElement('article');
    card.className = 'rounded-3xl border border-white/10 bg-white/5 p-5 space-y-4';
    card.style.borderColor = hexToRgba(accent, 0.35);
    card.style.background = `linear-gradient(145deg, ${hexToRgba(primary, 0.22)}, rgba(255,255,255,0.02))`;
    const urlLabel = project.url ? normalizeUrl(project.url) : 'butterlabs.app';
    card.innerHTML = `
        <div class="flex items-center justify-between text-xs uppercase tracking-wide text-gray-300">
            <span>${project.status || 'Building'}</span>
            <span class="text-white font-mono">#${order}</span>
        </div>
        <div>
            <p class="text-xl font-semibold text-white">${project.name || 'Untitled'}</p>
            <p class="mt-2 text-sm text-gray-200 leading-relaxed">${project.description || 'Dropping soon.'}</p>
        </div>
        <div class="flex items-center justify-between text-xs text-gray-400">
            <span>${urlLabel}</span>
            <span class="inline-flex items-center gap-1 text-[10px] tracking-[0.3em] uppercase text-gray-400">swipe</span>
        </div>
    `;

    const action = document.createElement('a');
    action.className = `inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-semibold transition ${
        disabled ? 'pointer-events-none opacity-50 bg-white/10 text-gray-300' : 'bg-white text-gray-900 hover:bg-lime-200'
    }`;
    action.textContent = disabled ? 'coming soon' : 'open project ↗';
    action.href = project.url || '#';
    if (!disabled) {
        action.target = '_blank';
        action.rel = 'noopener noreferrer';
    } else {
        action.setAttribute('aria-disabled', 'true');
    }
    card.appendChild(action);
    return card;
}

function setActiveProject(index) {
    const project = projectState.data[index];
    if (!project || !projectEls.detail) return;
    projectState.activeIndex = index;

    const primary = project?.palette?.primary || '#ffffff';
    const secondary = project?.palette?.secondary || '#111111';
    const accent = project?.palette?.accent || primary;

    if (projectEls.activeName) projectEls.activeName.textContent = project.name || 'Untitled';
    if (projectEls.status) {
        const statusText = project.status || 'Building';
        projectEls.status.textContent = statusText;
    }
    if (projectEls.description) projectEls.description.textContent = project.description || '';
    if (projectEls.openLink && project.url) {
        projectEls.openLink.href = project.url;
        projectEls.openLink.textContent = 'open ↗';
    }
    projectEls.detail.style.opacity = '1';
    projectEls.detail.style.background = `linear-gradient(150deg, ${hexToRgba(secondary, 0.4)}, rgba(0,0,0,0.15))`;
    projectEls.detail.style.borderColor = hexToRgba(accent, 0.25);

    if (projectEls.list) {
        const cards = projectEls.list.querySelectorAll('[data-project-index]');
        cards.forEach(card => {
            const isActive = Number(card.dataset.projectIndex) === index;
            card.style.opacity = isActive ? '1' : '0.5';
            card.style.borderColor = isActive ? hexToRgba(accent, 0.6) : 'rgba(255,255,255,0.08)';
            card.style.transform = isActive ? 'translateX(4px)' : 'translateX(0)';
            card.style.boxShadow = isActive ? `0 35px 60px ${hexToRgba(primary, 0.4)}` : '0 18px 28px rgba(0,0,0,0.35)';
        });
    }
}

function hexToRgba(hex, alpha = 1) {
    if (!hex) return `rgba(0,0,0,${alpha})`;
    let sanitized = hex.replace('#', '');
    if (sanitized.length === 3) {
        sanitized = sanitized.split('').map(ch => ch + ch).join('');
    }
    const intVal = parseInt(sanitized, 16);
    if (Number.isNaN(intVal)) return `rgba(0,0,0,${alpha})`;
    const r = (intVal >> 16) & 255;
    const g = (intVal >> 8) & 255;
    const b = intVal & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function normalizeUrl(url) {
    return url.replace(/^https?:\/\//i, '').replace(/\/$/, '');
}

function initAmbientAudio() {
    if (!ambientAudio) return;
    ambientAudio.volume = 0.7;

    const attemptPlay = () => ambientAudio.play().catch(() => { /* autoplay blocked */ });
    const unlock = () => {
        attemptPlay();
        document.removeEventListener('pointerdown', unlock);
        document.removeEventListener('keydown', unlock);
    };

    const playPromise = ambientAudio.play();
    if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(() => {
            document.addEventListener('pointerdown', unlock, { once: true });
            document.addEventListener('keydown', unlock, { once: true });
        });
    }
}

function setupPlayerControls() {
    if (!ambientAudio) return;
    const updateButton = () => {
        if (playerEls.toggle) playerEls.toggle.textContent = ambientAudio.paused ? '▶' : '❚❚';
        if (playerEls.mobileToggle) playerEls.mobileToggle.textContent = ambientAudio.paused ? 'play' : 'pause';
    };
    const updateSlider = () => {
        const value = ambientAudio.volume.toString();
        if (playerEls.volume) playerEls.volume.value = value;
        if (playerEls.mobileVolume) playerEls.mobileVolume.value = value;
    };

    const handleToggle = () => {
        if (ambientAudio.paused) {
            ambientAudio.play().catch(() => { /* user gesture required */ });
        } else {
            ambientAudio.pause();
        }
    };

    [playerEls.toggle, playerEls.mobileToggle].forEach(btn => {
        if (!btn) return;
        btn.addEventListener('click', handleToggle);
    });

    const handleVolume = (event) => {
        const value = parseFloat(event.target.value);
        if (!Number.isNaN(value)) ambientAudio.volume = value;
    };

    [playerEls.volume, playerEls.mobileVolume].forEach(slider => {
        if (!slider) return;
        slider.addEventListener('input', handleVolume);
    });
    updateSlider();

    ambientAudio.addEventListener('play', updateButton);
    ambientAudio.addEventListener('pause', updateButton);
    ambientAudio.addEventListener('volumechange', updateSlider);
    updateButton();
}


function createOrbitControls() {
    controls = new THREE.OrbitControls(camera, effect.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = true;
    controls.enableRotate = true;
    controls.enablePan = true;
    controls.rotateSpeed = 1.0;
    controls.zoomSpeed = 1.0;
    controls.panSpeed = 1.0;
    controls.touches = {
        ONE: THREE.TOUCH.ROTATE,
        TWO: THREE.TOUCH.PAN
    };
}

function updateCameraFraming() {
    if (modelRadius === null) return;

    const orientationLandscape = window.innerWidth > window.innerHeight;
    let distanceMultiplier = 2.6;
    let heightMultiplier = 0.85;

    if (isMobileDevice()) {
        if (orientationLandscape) {
            distanceMultiplier = 1.6;
            heightMultiplier = 0.65;
        } else {
            distanceMultiplier = 1.35;
            heightMultiplier = 0.8;
        }
    }

    const distance = modelRadius * distanceMultiplier;
    const height = modelRadius * heightMultiplier;

    camera.position.set(distance, height, distance);
    camera.lookAt(0, 0, 0);

    if (controls) {
        controls.target.set(0, 0, 0);
        controls.update();
    }

    updateControlsSensitivity(orientationLandscape);
}

function updateControlsSensitivity(orientationLandscape) {
    if (!controls || modelRadius === null) return;

    const mobile = isMobileDevice();
    const baseRotate = mobile ? 1.8 : 1.0;
    const baseZoom = mobile ? 1.4 : 1.0;
    const basePan = mobile ? 1.2 : 1.0;

    controls.rotateSpeed = orientationLandscape && mobile ? baseRotate * 1.1 : baseRotate;
    controls.zoomSpeed = baseZoom;
    controls.panSpeed = basePan;

    const minDistanceMultiplier = mobile ? 0.9 : 0.8;
    const maxDistanceMultiplier = mobile ? 3.2 : 5.0;

    controls.minDistance = modelRadius * minDistanceMultiplier;
    controls.maxDistance = modelRadius * maxDistanceMultiplier;
}


if (shouldRenderAscii) {
    stlLoader.load(MODEL_URL, function (geometry) {
        myMesh.material = material;
        myMesh.geometry = geometry;

        geometry.computeVertexNormals();
        myMesh.geometry.center();
        myMesh.geometry.computeBoundingBox();
        myMesh.geometry.computeBoundingSphere();

        myMesh.position.set(0, 0, 0);
        const sphere = myMesh.geometry.boundingSphere;
        const radius = sphere ? sphere.radius : Math.max(
            myMesh.geometry.boundingBox.max.x - myMesh.geometry.boundingBox.min.x,
            myMesh.geometry.boundingBox.max.y - myMesh.geometry.boundingBox.min.y,
            myMesh.geometry.boundingBox.max.z - myMesh.geometry.boundingBox.min.z
        ) * 0.5;
        modelRadius = radius;

        scene.add(myMesh);
        createOrbitControls();

        if (controls) {
            controls.target.set(0, 0, 0);
            controls.update();
        }

        updateCameraFraming();


        function tick() {
            controls.update();
            effect.render(scene, camera);
            window.requestAnimationFrame(tick);
        }

        tick();
    });
}


if (shouldRenderAscii) {
    window.addEventListener('resize', onWindowResize);
}
function onWindowResize() {
    if (!shouldRenderAscii || !effect) return;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    effect.setSize(window.innerWidth, window.innerHeight);
 
    if (typeof centerAsciiContent === 'function') centerAsciiContent();
    updateCameraFraming();
}


function resetPositions() {
    myMesh.scale.set(1, 1, 1);
    myMesh.rotation.set(-90 * Math.PI / 180, 0, 0);
}
