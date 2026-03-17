// scripts/seed-products.mjs
// Ejecutar con: node scripts/seed-products.mjs

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

// ⚠️ Pega aquí tus variables de .env.local
const firebaseConfig = {
  apiKey: "AIzaSyAbLY4_z-Nlo_fFN0YyAjelSFnm4C1s7CI",
  authDomain: "apasofirme-ca777.firebaseapp.com",
  projectId: "apasofirme-ca777",
  storageBucket: "apasofirme-ca777.firebasestorage.app",
  messagingSenderId: "223080200265",
  appId: "1:223080200265:web:bf38c65d232ee3c6396798"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Función que genera un nombre legible desde el nombre del archivo
function formatName(filename) {
  return filename
    .replace(/\.(jpg|png|jpeg|webp)$/i, '')
    .split(' ')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

// Detectar categoría por prefijo del nombre de archivo
function getCategory(filename) {
  const lower = filename.toLowerCase();
  if (lower.startsWith('nike') || lower.startsWith('adi2000') === false && lower.startsWith('nike')) return 'nike';
  if (lower.startsWith('vans')) return 'vans';
  if (lower.startsWith('adidas') || lower.startsWith('adi2000')) return 'adidas';
  if (lower.startsWith('dc')) return 'dc';
  return 'otro';
}

// Lista de imágenes (solo productos, sin logos ni fondos)
const imageFiles = [
  // ADIDAS
  'adi2000 blancas.jpg',
  'adi2000 gris.jpg',
  'adi2000 negras.jpg',
  'adi2000 total black.jpg',
  'adidas campus bad bunny negras.jpg',
  'adidas campus badbunny clasicas.jpg',
  'adidas forum blanca azul.jpg',
  'adidas forum blanca celeste.jpg',
  'adidas forum blanca gris.jpg',
  'adidas forum blanca violeta.jpg',
  'adidas forum blanca.jpg',
  'adidas forum negras.jpg',

  // DC SHOES
  'dc shoes blancas.jpg',
  'dc shoes clasicas.jpg',
  'dc shoes negras 2.0.jpg',
  'dc shoes negras.jpg',
  'dc shoes slayer lila.jpg',
  'dc shoes total black.jpg',

  // NIKE AIR FORCE
  'nike air force beige 2.0.jpg',
  'nike air force beige.jpg',
  'nike air force blancas 2.0.jpg',
  'nike air force blancas.jpg',
  'nike air force chumky laces.jpg',
  'nike air force grey black.jpg',
  'nike air force grey fog.jpg',
  'nike air force grey.jpg',
  'nike air force gris blanca.jpg',
  'nike air force gris negra.jpg',
  'nike air force negras 2.0.jpg',
  'nike air force negras celeste.jpg',
  'nike air force panda.jpg',
  'nike air force stussy.jpg',
  'nike air force supreme blanca.jpg',
  'nike air force supreme negra.jpg',
  'nike air force total black.jpg',
  'nike air force tricol3r.jpg',
  'nike air force tricolor.jpg',
  'nike air force white navy.jpg',
  'nike aire force negras.jpg',

  // NIKE DUNK
  'nike dunk black gum.jpg',
  'nike dunk bordo.jpg',
  'nike dunk cacao.jpg',
  'nike dunk city of love.jpg',
  'nike dunk gliter jean.jpg',
  'nike dunk grey fog.jpg',
  'nike dunk la dodgers.jpg',
  'nike dunk lv clasica.jpg',
  'nike dunk magestic.jpg',
  'nike dunk midnight.jpg',
  'nike dunk negras 2.0.jpg',
  'nike dunk negras.jpg',
  'nike dunk night.jpg',
  'nike dunk panda.jpg',
  'nike dunk pistacho reverse.jpg',
  'nike dunk total black.jpg',
  'nike dunk triple white.jpg',
  'nike dunk versity green.jpg',
  'nike dunk white navy.jpg',
  'nike dunk94 black red.jpg',
  'nike dunk94 white.jpg',

  // NIKE JORDAN
  'nike jordan blanca negra.jpg',
  'nike jordan gris negro.jpg',
  'nike jordan high grey.jpg',
  'nike jordan low black.jpg',
  'nike jordan low tricolor.jpg',
  'nike jordan mid blanca negra.jpg',
  'nike jordan mid dior blanca.jpg',
  'nike jordan mid dios gris.jpg',
  'nike jordan mid grey black.jpg',
  'nike jordan mid grey fog.jpg',
  'nike jordan mid gris 2.0.jpg',
  'nike jordan mid gris negro.jpg',
  'nike jordan mid gris.jpg',
  'nike jordan mid negro rojo.jpg',
  'nike jordan mid panda.jpg',
  'nike jordan niquel.jpg',
  'nike jordan panda.jpg',
  'nike jordan rojo negro.jpg',

  // NIKE TRAVIS SCOTT
  'nike travis scott black phantom.jpg',
  'nike travis scott mocha reverse.jpg',
  'nike travis scott mocha.jpg',

  // VANS
  'vans hylane blancas.jpg',
  'vans knu blancas.jpg',
  'vans knu negras.jpg',
  'vans knu.jpg',
];

async function seedProducts() {
  console.log(`🚀 Iniciando seeder con ${imageFiles.length} productos...\n`);
  let count = 0;

  for (const file of imageFiles) {
    const category = getCategory(file);
    const name = formatName(file);
    // La URL pública es la ruta desde /public/img/
    const imageUrl = `/img/${file}`;

    const product = {
      name,
      description: `${name} - Disponible en todos los talles`,
      price: 0, // ← Actualizá el precio desde el Admin
      stock: 10,  // ← Stock inicial por defecto
      imageUrl,
      category,
      whatsappNumber: '+5493758434182',
      createdAt: new Date(),
    };

    try {
      await addDoc(collection(db, 'products'), product);
      console.log(`✅ [${category.toUpperCase()}] ${name}`);
      count++;
    } catch (err) {
      console.error(`❌ Error con ${name}:`, err.message);
    }
  }

  console.log(`\n✅ Seeder completado: ${count}/${imageFiles.length} productos agregados.`);
  console.log('⚠️  Recorda actualizar los precios desde el panel de administración.');
  process.exit(0);
}

seedProducts();
