# GitHub Actions AI-native learning lab

Mini sitio estático para recorrer un pipeline desde el primer workflow hasta un despliegue en GitHub Pages. El proyecto no necesita paquetes externos: los tests usan node:test.

## Resultado

- pull_request y push a main ejecutan tests en Node 22 y 24.
- Los jobs de la matriz corren en paralelo.
- En main, build empaqueta site/ como artefacto de Pages.
- deploy publica el artefacto en GitHub Pages desde el environment github-pages.
- La pipeline no necesita secretos cloud.

## Requisitos

- Cuenta de GitHub con permiso para crear repositorios y habilitar Actions.
- Node.js 22 o 24 si vas a correr los tests localmente.
- Para publicar, habilitar GitHub Pages desde Settings → Pages → Build and deployment → Source → GitHub Actions.

## Recorrido del taller

1. Crea un repositorio vacío llamado actions-learning-lab.
2. Sigue workshop/steps/01-hello.yml: guárdalo en .github/workflows/hello.yml, haz commit y revisa el run en Actions.
3. Copia site/, test/ y package.json a la raíz. Corre npm test.
4. Sigue workshop/steps/02-ci.yml para convertir el hello workflow en CI para pull requests.
5. Provoca una regresión cambiando el título o el main de la página. Observa el test fallido, corrige y confirma el siguiente run.
6. Sigue workshop/steps/03-matrix.yml. Compara los jobs de Node 22 y 24.
7. Cuando CI pase, usa .github/workflows/site.yml. Configura Pages y comprueba el despliegue.
8. Revierte un cambio visual para practicar recuperación y redeploy.

## AI-native: trabajar con Codex

Usa Codex para proponer cambios acotados. Lee la propuesta como un diff de un compañero: verifica lo que cambió y pruébalo.

### Crear o reparar

> Revisa el repositorio y propone un workflow de GitHub Actions para correr `npm test` cuando se abre o actualiza un pull request y cuando hay push a `main`.
>
> Contexto: es un sitio estático en `site/`; los tests usan el runner nativo de Node y no hay dependencias externas.
>
> Límites: usa solo `contents: read`; no agregues secretos ni permisos de escritura; no despliegues desde pull requests. Si falta un dato del repo, indícalo antes de asumir.
>
> Entrega: resume el cambio, muestra el diff mínimo, explica triggers/permisos/actions externas y da pasos para verificarlo. Señala qué debe revisar una persona antes del merge.

### Auditar seguridad

> Audita el workflow contra la documentación oficial de GitHub Actions. Revisa eventos y código no confiable, GITHUB_TOKEN permissions, referencias de actions, interpolación en shell, secretos, caché, artifacts, runner y deploy. Clasifica cada observación como confirmado, riesgo potencial o recomendación. No edites el archivo.

### Diagnosticar una corrida

> Resume estos logs: identifica el primer error que explica la falla, qué step falló, una hipótesis verificable y el cambio mínimo. No inventes contexto que no esté en los logs.

Antes de merge, una persona revisa el diff, verifica las referencias y vuelve a ejecutar los tests.

## Estructura

- site/index.html: página que se prueba y publica.
- test/site.test.js: tests de contenido con el test runner nativo de Node.
- workshop/steps/: workflows didácticos por etapa; GitHub no los ejecuta desde esta ruta.
- .github/workflows/site.yml: pipeline final de CI y GitHub Pages.
- .gitlab-ci.yml: ejemplo de traducción del job de tests a GitLab CI/CD.

## Seguridad y límites de la demo

El workflow limita el token a contents: read en CI y da pages: write e id-token: write solo al job de despliegue. El código de pull requests de forks debe tratarse como entrada no confiable. No ejecutes ese código con secretos ni con acceso a un self-hosted runner de confianza.

Las actions del ejemplo están referenciadas por tags para que el ejercicio sea legible. Para repositorios productivos, aplica la política de tu organización: verifica cada action y considera fijarla a un SHA completo.

## Docs oficiales

### GitHub Actions

- https://docs.github.com/en/actions/get-started/quickstart
- https://docs.github.com/en/actions/get-started/understand-github-actions
- https://docs.github.com/en/actions/get-started/continuous-integration
- https://docs.github.com/en/actions/get-started/continuous-deployment
- https://docs.github.com/en/actions/get-started/actions-vs-apps
- https://docs.github.com/en/actions/concepts
- https://docs.github.com/en/actions/how-tos
- https://docs.github.com/en/actions/reference
- https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages
- https://docs.github.com/en/billing/reference/actions-runner-pricing
- https://docs.github.com/en/actions/concepts/billing-and-usage
- https://help.openai.com/en/articles/10032626-prompt-engineering-best-practices-for-chatgpt

### GitLab CI/CD

- https://docs.gitlab.com/user/get_started/
- https://docs.gitlab.com/ci/
- https://docs.gitlab.com/ci/quick_start/tutorial/
- https://docs.gitlab.com/ci/yaml/
- https://docs.gitlab.com/ci/runners/
