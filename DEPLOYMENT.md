# Guide de Déploiement

## Option 1 : Vercel (Recommandé)

### 1. Préparer le Projet
- Assurez-vous que `.env.local` est dans `.gitignore`
- Poussez votre code sur GitHub

### 2. Déployer
1. Allez sur https://vercel.com
2. Importez votre dépôt GitHub
3. **Variables d'environnement** (CRITIQUE) :
   - Ajoutez `NEXT_PUBLIC_SUPABASE_URL`
   - Ajoutez `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Cliquez sur "Deploy"

---

## Option 2 : Netlify

### 1. Configuration
Le fichier `netlify.toml` est déjà créé pour vous.

### 2. Variables d'environnement (CRITIQUE)
Si votre build échoue avec `Error: supabaseUrl is required`, c'est que vous avez oublié cette étape !

1. Allez sur votre tableau de bord Netlify
2. Sélectionnez votre site
3. Allez dans **Site configuration** > **Environment variables**
4. Cliquez sur **Add a variable**
5. Ajoutez ces deux variables (les mêmes que dans votre `.env.local`) :
   - Key: `NEXT_PUBLIC_SUPABASE_URL`
     Value: `votre_url_supabase`
   - Key: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     Value: `votre_cle_anon`

### 3. Redéployer
Une fois les variables ajoutées :
1. Allez dans l'onglet **Deploys**
2. Cliquez sur **Trigger deploy** > **Clear cache and deploy site**
