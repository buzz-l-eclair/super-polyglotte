# 🌍 Polyglotte

Application d'apprentissage de **4 langues** (Russe, Persan, Hébreu, Arabe) — niveau A1 → B1.

## Stack
- **Backend** : Node.js + Express + SQLite (better-sqlite3)
- **Auth** : Email/Pseudo + mot de passe · Google OAuth
- **Frontend** : Vanilla JS + CSS (aucune dépendance UI)
- **Déploiement** : Railway ou Render (1 clic)

---

## 🚀 Lancer en local

```bash
npm install
node server.js
# → http://localhost:3000
```

Avec variables d'env :
```bash
cp .env.example .env
# Éditez .env puis :
node server.js
```

---

## ☁️ Déployer sur Railway

1. Créez un repo GitHub et poussez ce projet
2. Allez sur [railway.app](https://railway.app) → **New Project → Deploy from GitHub**
3. Sélectionnez votre repo
4. Dans **Variables**, ajoutez :
   - `JWT_SECRET` → une chaîne aléatoire longue
   - `GOOGLE_CLIENT_ID` → votre client ID Google (optionnel)
   - `NODE_ENV` → `production`
5. Railway détecte automatiquement Node.js et démarre `node server.js`
6. ✅ Votre app est en ligne !

> **Persistance de la DB** : Sur Railway, ajoutez un **Volume** monté sur `/app` et définissez `DB_PATH=/app/polyglotte.db`.

---

## ☁️ Déployer sur Render

1. Créez un repo GitHub et poussez ce projet
2. Allez sur [render.com](https://render.com) → **New → Web Service**
3. Connectez votre repo
4. Render lit automatiquement `render.yaml` → configuration prête
5. Ajoutez `GOOGLE_CLIENT_ID` dans les variables d'env
6. ✅ Deploy !

> Render Free inclut un **Disk** de 1 Go pour la base SQLite (configuré dans `render.yaml`).

---

## 🔑 Google Auth (optionnel)

1. [console.cloud.google.com](https://console.cloud.google.com) → Créez un projet
2. **APIs & Services → Identifiants → Créer des identifiants → ID client OAuth 2.0**
3. Type : **Application Web**
4. Origines autorisées : `https://votre-app.up.railway.app` (ou votre domaine Render)
5. Copiez le **Client ID** → variable `GOOGLE_CLIENT_ID`

---

## ➕ Ajouter des exercices

Ouvrez `public/curriculum.js`. Chaque leçon est un tableau `exercises`. Copiez-collez un bloc :

```js
// Exemple — QCM
{ type:'qcm', q:'Question ?', choices:['A','B','C','D'], correct:0 }

// Flashcard
{ type:'flashcard', q:'Mot cible', a:'Traduction', hint:'Indice' }

// Vrai/Faux
{ type:'truefalse', q:'Affirmation à évaluer', correct: true }

// Compléter (fill)
{ type:'fill', q:'Phrase à compl___ter', answer:'été', hint:'Indice', choices:['été','ors','and'] }

// Association (pair)
{ type:'pair', q:'Associez', pairs:[['A','1'],['B','2'],['C','3'],['D','4']] }

// Remettre en ordre
{ type:'order', q:'Remettez dans l\'ordre', words:['C','A','B'], answer:['A','B','C'] }

// Écoute
{ type:'listen', q:'Écoutez et choisissez', text:'Texte à lire à voix haute', choices:['A','B','C','D'], correct:0 }

// Grammaire (carte explicative, pas de réponse)
{ type:'grammar', title:'Titre de la règle', content:'Explication\n• Point 1\n• Point 2' }
```

Pour ajouter une **nouvelle unité**, copiez un bloc `{ id, level, title, icon, lessons:[...] }` dans le tableau `units` de la langue concernée.

---

## 📊 Système adaptatif

- Après chaque leçon, l'app calcule la **précision** et l'**XP**
- Si précision > 85% sur 70%+ du niveau → bannière "Passer au niveau supérieur"
- Si précision < 60% sur 30%+ du niveau → bannière "Revenir au niveau précédent"
- L'utilisateur peut aussi changer de niveau manuellement via les onglets A1/A2/B1

---

## 🗂 Structure

```
polyglotte/
├── server.js          # Backend Express + SQLite
├── package.json
├── railway.toml       # Config Railway
├── render.yaml        # Config Render
├── .env.example
└── public/
    ├── index.html     # SPA (une seule page)
    ├── style.css      # Design "bleu nuit"
    ├── app.js         # Logique frontend
    └── curriculum.js  # TOUS les exercices (A1→B1, 4 langues)
```
