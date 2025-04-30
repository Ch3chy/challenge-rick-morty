# Challenge Rick & Morty

## 🚀 Instalación del Proyecto

Para configurar y ejecutar el proyecto correctamente, sigue estos pasos:

### 📌 1. Clonar el repositorio

```sh
git clone https://github.com/Ch3chy/challenge-rick-morty.git
cd challenge-rick-morty
```

### 📌 2. Instalar dependencias

Ejecuta el siguiente comando para instalar las dependencias necesarias:

```sh
npm install
```

Este paso también instalará los **hooks de Git** mediante **Lefthook**.

### 📌 3. Ejecutar el proyecto

Para iniciar el entorno de desarrollo:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Abrir [http://localhost:3000](http://localhost:3000) en su navegador para ver el resultado.

---

## 📖 Directrices para Commits (Conventional Commits)

Este proyecto sigue el estándar **Conventional Commits** para mantener un historial de commits estructurado y legible.

### 📌 Estructura del mensaje de commit

```
<tipo>: <descripción breve>
```

Ejemplo válido:

```sh
git commit -m "feat: proyecto base de nextjs"
```

### 📌 Tipos de commit permitidos

- `feat` → Nueva funcionalidad.
- `fix` → Corrección de errores.
- `docs` → Cambios en documentación.
- `style` → Cambios de formato (sin afectar código).
- `refactor` → Refactorización sin cambiar funcionalidad.
- `test` → Agregar o modificar pruebas.
- `chore` → Tareas de mantenimiento.

## 🛠 Configuración Manual de Lefthook (Opcional)

Si los hooks no funcionan después de clonar el repo, instala Lefthook manualmente:

```sh
npx lefthook install
```

Esto asegurará que los hooks de Git estén correctamente configurados.

---

