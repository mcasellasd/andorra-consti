# Scripts Utilitaris

Aquest directori conté scripts d'ajuda per gestionar els articles digitalitzats del Codi Civil d'Andorra.

## Scripts Disponibles

### `process-text-to-articles.js`

Processa el text extret del PDF i genera articles TypeScript.

**Ús:**
```bash
# Assegura't que tens docs/extracted-text.txt amb el text del PDF
node scripts/process-text-to-articles.js
```

**Què fa:**
- Llegeix el text del PDF
- Identifica tots els articles (format: Article 511-1)
- Organitza per títols, capítols i seccions
- Genera fitxers d'articles per als diferents llibres del Codi Civil d'Andorra

---

### Scripts de generació d'embeddings

Hi ha scripts disponibles per generar embeddings per als diferents llibres del Codi Civil d'Andorra. Consulta els fitxers individuals per més informació.

## Instal·lació de Dependències

Els scripts utilitzen `dotenv` per llegir variables d'entorn:

```bash
npm install
```

Això instal·larà totes les dependències necessàries, incloent `dotenv`.

