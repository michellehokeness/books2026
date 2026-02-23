# Modern Gentleman's Bookshelf (2026)

A simple front-end project that shows five recommended books for 2026, lets you click into details, and stores state in `localStorage`.

## Features

- Front-end only (HTML/CSS/JS)
- Book data stored directly in `app.js`
- Click a book spine to view summary + author
- Mark books as read/unread
- Persists:
  - Active selected book
  - Read/unread state

## Run locally

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Git setup (already initialized)

```bash
git add .
git commit -m "Initial bookshelf app"
```

## Publish to GitHub + GitHub Pages

1. Create a new empty GitHub repository.
2. Connect this project to that repo:

```bash
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

3. In GitHub, open `Settings -> Pages`.
4. Under **Build and deployment**:
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/ (root)`
5. Save.

Your site will be available at:

`https://<your-username>.github.io/<repo-name>/`

## Customize the books

Edit the `BOOKS` array in `app.js` and change:

- `title`
- `author`
- `year`
- `genre`
- `summary`
- `whyRead`
- `source`
