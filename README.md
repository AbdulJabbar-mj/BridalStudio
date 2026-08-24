# Studio & Seam — Boutique + Bridal Studio Website

A React site for a business with two sides: a fashion-design boutique and a
bridal makeup/hairstyling studio. Each side has its own dynamic image
gallery that an admin can add to or remove from without touching code, plus
an enquiry form that emails the owner directly.

## Stack

- **React + Vite + Tailwind CSS** — the site itself
- **Firebase** — Firestore (image metadata), Storage (image files), Auth (admin login)
- **Formspree** — enquiry form submissions, no backend needed
- **Netlify or Vercel** — free static hosting with CI from Git

## 1. Install dependencies

```bash
npm install
```

## 2. Set up Firebase (for the dynamic galleries)

1. Go to [console.firebase.google.com](https://console.firebase.google.com) and create a new project (free "Spark" plan is enough for a small business site).
2. In the project, enable:
   - **Firestore Database** → Create database → start in production mode.
   - **Storage** → Get started (keep default settings).
   - **Authentication** → Sign-in method → enable **Email/Password**.
3. Under **Authentication → Users**, manually add one user — this is the shop owner/admin's login (e.g. their email + a password you set). There is no public sign-up page on purpose.
4. Go to **Project settings → General → Your apps**, add a Web app, and copy the config values.
5. Copy `.env.example` to `.env` and paste in those values:

```bash
cp .env.example .env
```

6. Set Firestore security rules (Firestore → Rules) so anyone can *read* the galleries but only signed-in admins can *write*:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{collection}/{docId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

7. Set Storage rules (Storage → Rules) the same way:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

This means: anyone visiting the site can see the images, but only the
logged-in admin account can add or remove them.

## 3. Set up Formspree (for the enquiry form)

1. Go to [formspree.io](https://formspree.io) and create a free account.
2. Create a new form — Formspree gives you a form ID like `xayzabcd`.
3. Set the email address it should forward enquiries to (the shop owner's inbox).
4. Add the form ID to `.env`:

```
VITE_FORMSPREE_ID=xayzabcd
```

## 4. Run it locally

```bash
npm run dev
```

Visit `http://localhost:5173`. Go to `/admin/login` and sign in with the
admin account you created in step 2 to add or remove gallery images.

## 5. Deploy

**Netlify** (recommended, free):
1. Push this project to a GitHub repo.
2. In Netlify, "Add new site" → "Import from Git" → pick the repo.
3. Build command: `npm run build`. Publish directory: `dist`.
4. Add all the `VITE_...` variables from your `.env` file under Site settings → Environment variables.
5. Deploy.

**Vercel** works the same way — import the repo, framework preset "Vite",
add the same environment variables.

## How the two "panels" work

- `/boutique` and `/bridal-studio` are separate pages, each pulling images
  from its own Firestore collection (`boutique` and `bridal-studio`) — so
  content never mixes between the two businesses.
- `/admin` (behind login) has a tab for each gallery. Adding an image
  uploads the file to Firebase Storage and saves its URL + caption in
  Firestore; removing one deletes both. Changes appear on the public pages
  instantly — no rebuild or redeploy needed, since the pages read live from
  Firestore.
- `/contact` posts straight to Formspree, which emails the enquiry to the
  shop owner. No database or backend involved for this part.

## Project structure

```
src/
  components/
    Navbar.jsx, Footer.jsx        — shared layout
    SeamDivider.jsx                — signature stitched-seam divider
    Gallery.jsx                    — dynamic image panel (public + admin modes)
    EnquiryForm.jsx                — Formspree contact form
    ProtectedRoute.jsx             — guards /admin behind login
  pages/
    Home.jsx                       — split hero: boutique vs bridal studio
    Boutique.jsx, BridalStudio.jsx — each with its own gallery
    Contact.jsx                    — enquiry form page
    AdminLogin.jsx, AdminDashboard.jsx
  firebase.js                      — Firebase initialization
```

## Handing this off to a non-technical shop owner

Once deployed, the owner only needs two things:
1. The **admin login URL** (`yoursite.com/admin/login`) and their email/password.
2. To know that adding/removing images happens right on the site — no code, no file uploads elsewhere.

Everything else (hosting, Firebase, Formspree) is invisible to them.
