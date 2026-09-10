const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

if (!process.env.FIREBASE_SERVICE_ACCOUNT) {
  console.error('Variável FIREBASE_SERVICE_ACCOUNT não encontrada. Verifique o Secret no GitHub.');
  process.exit(1);
}

let serviceAccount;
try {
  serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
} catch (e) {
  console.error('FIREBASE_SERVICE_ACCOUNT não é um JSON válido:', e.message);
  process.exit(1);
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

async function main() {
  const snap = await db.collection('iatfApp').doc('state').get();
  if (!snap.exists) {
    console.error('O documento iatfApp/state não existe no Firestore. Nada para salvar.');
    process.exit(1);
  }

  const data = snap.data();
  const payload = {
    exportedAt: new Date().toISOString(),
    exportedFrom: 'GitHub Actions - backup automático diário',
    db: data.db,
  };

  const dateStr = new Date().toISOString().slice(0, 10);
  const dir = path.join(__dirname, '..', 'backups');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  const filePath = path.join(dir, `backup_${dateStr}.json`);
  fs.writeFileSync(filePath, JSON.stringify(payload, null, 2));

  const animalsCount = Array.isArray(payload.db?.animals) ? payload.db.animals.length : 0;
  console.log(`Backup salvo em ${filePath} (${animalsCount} matriz(es) no total).`);
}

main().catch((e) => {
  console.error('Erro ao gerar backup:', e);
  process.exit(1);
});
