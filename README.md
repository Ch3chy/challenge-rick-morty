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

### 📌 4. Ejecutar Tests

El proyecto utiliza Jest y React Testing Library para las pruebas. Para ejecutar los tests:

```bash
# Ejecutar todos los tests
npm run test
```

#### Configuración de Tests

- Los tests se encuentran en archivos con extensión `.test.ts`
- Se utiliza `@testing-library/react` para pruebas de componentes
- Se utiliza `jest` como motor de pruebas
- Se utiliza `@testing-library/jest-dom` para expectativas específicas de DOM

#### Ejemplo de Test

```tsx
import { render, screen } from '@testing-library/react';
import Component from './Component';

describe('Component', () => {
  it('should render correctly', () => {
    render(<Component />);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });
});
```

---

## 🌐 Despliegue Continuo con AWS Amplify

Este proyecto utiliza AWS Amplify para implementar un despliegue continuo (CI/CD), lo que ofrece varias ventajas significativas:

### 📌 Ventajas del Despliegue en Amplify

- **Integración Automática**: Se integra perfectamente con GitHub, realizando despliegues automáticos con cada push a la rama principal.
- **Escalabilidad**: Amplify se encarga automáticamente de la infraestructura y el escalado según la demanda.
- **Seguridad**: Proporciona HTTPS por defecto y protección DDoS.
- **Optimización**: Incluye optimización automática de assets y caching.
- **Monitoreo**: Ofrece métricas y logs en tiempo real.

### 📌 URL de la Aplicación

La aplicación está disponible en: [https://main.d385ui0pylb0nn.amplifyapp.com/](https://main.d385ui0pylb0nn.amplifyapp.com/)

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

