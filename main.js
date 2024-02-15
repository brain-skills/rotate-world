// Создаем сцену, камеру и рендерер
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container').appendChild(renderer.domElement);

// Загружаем текстуру карты мира
const textureLoader = new THREE.TextureLoader();
const mapTexture = textureLoader.load('worldmap.png'); // Замените 'worldmap.png' на имя вашей текстуры

// Создаем геометрию и материал для планеты с текстурой
const geometry = new THREE.SphereGeometry(8, 32, 32);
const material = new THREE.MeshBasicMaterial({ map: mapTexture, transparent: true, opacity: 0.25, color: 0xFFFFFF, wireframe: true, wireframeLinewidth: 2});
const earth = new THREE.Mesh(geometry, material);
scene.add(earth);

// Устанавливаем цвет обводки (lime)
material.color.setHex(0x00FF00);

// Устанавливаем начальное положение камеры
camera.position.z = 15;

// Добавляем освещение
const light = new THREE.PointLight(0xFFFFFF);
light.position.set(10, 10, 10);
scene.add(light);

// Добавляем вращение планеты
const animate = function () {
    requestAnimationFrame(animate);
    earth.rotation.y += 0.005;
    renderer.render(scene, camera);
};

// Обновляем размеры при изменении размеров окна
window.addEventListener('resize', function () {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;

    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(newWidth, newHeight);
});

// Запускаем анимацию
animate();