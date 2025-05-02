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

### 📌 5. Mejoras Futuras

El proyecto tiene varias áreas de mejora que se pueden implementar para mejorar la experiencia del usuario y la calidad del código:

#### 🎯 Mejoras de UX/UI
- **Páginas de Error Personalizadas**
  - Implementar páginas 404 y 500 con diseños atractivos
  - Agregar mensajes de error descriptivos

- **Paginador de Personajes**
  - Implementar paginación en el listado de personajes
  - Agregar controles de navegación intuitivos

- **Buscador con Autocompletado**
  - Implementar sugerencias en tiempo real
  - Agregar filtros avanzados (especie, estado, etc.)

#### 🧪 Mejoras de Testing
- **Tests E2E (End-to-End)**
  - Implementar pruebas con Cypress o Playwright
  - Cubrir flujos completos de usuario

- **Mejoras en Tests Unitarios**
  - Aumentar la cobertura de tests
  - Implementar tests de integración

### 📌 6. Pain Point o Bug Interesante

Me presente con el problema de que en la forma con arme la pagina, habia una pagina de detalle que se completaba con un layout y cargaba el resto de personajes y componente de search. El layout estaba y la pagina de detalle se cargaban en el directorio de app de Next.

Next, en sus archivos Layout no permite acceder a los search params si es un server side component, y pasarlo a client side component reduce el rendimeinto al renderizar ahora todo el layout en el cliente.

Lo solucione definiendo un layout basico para toda la pagina y la parte del layout donde necesitaba acceder al serachparams enviarlo a un componente aparte que se llamara en la pagina de detalle. En la pagina si puedo acceder al search params y podia pasarlo al nuevo componente que tiene la parte del layout.

Esto me desarmo un poco la organizacion de layout que tenia pero me permitio resolver rapidamente este problema. Tal vez con mas tiempo pudiera reorganizar el layout y rutar para hacerlo de una forma mas elegante.


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

