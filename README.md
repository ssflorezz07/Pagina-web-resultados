# Liga BetPlay - Página estática

Este repositorio contiene una pequeña página estática con resultados de la Liga BetPlay.

Cómo publicar en GitHub Pages:

1. Asegúrate de tener el repositorio en GitHub y haber empujado la rama `main`.
2. El workflow `.github/workflows/deploy.yml` deploya automáticamente a la rama `gh-pages` cuando haces push a `main`.
3. Espera unos minutos y la página estará disponible en:

   https://TU_USUARIO.github.io/NOMBRE-REPO/

Notas:
- Los recursos usan rutas relativas y `index.html` incluye `<base href="./">` para que funcionen correctamente cuando el sitio se sirve desde `https://github.io/TU_USUARIO/NOMBRE-REPO/`.
- Si GitHub Pages no aparece inmediatamente revisa la pestaña **Actions** y **Pages** en el repositorio.
