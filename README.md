# EXANI Backoffice

Panel de administración de contenido para exámenes tipo EXANI. Gestiona preguntas, secciones, áreas, skills y más.

## 🚀 Stack Tecnológico

- **Framework**: Next.js 16.1.6 (App Router + Turbopack)
- **UI**: React 19 + shadcn/ui + Tailwind CSS
- **Data Management**: Refine.dev v5
- **Backend**: Supabase (PostgreSQL)
- **Forms**: React Hook Form + Zod
- **Auth**: Supabase Auth

## 📦 Instalación

```bash
# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.local
# Edita .env.local con tus credenciales de Supabase

# Ejecutar en desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 🎯 Funcionalidades

### ✅ Implementado

- **Dashboard**: Estadísticas en tiempo real, cobertura por sección, alertas
- **Gestión de Preguntas**: CRUD completo con vista detallada
- **Estructura Jerárquica**: Exámenes → Secciones → Áreas → Skills
- **Formularios Inteligentes**: Selección jerárquica y validación con Zod
- **Autenticación**: Protección de rutas y roles de usuario
- **Búsqueda y Filtros**: Por dificultad, sección, skill, etc.

### 🔄 En Desarrollo

- Gestión de Sets de preguntas
- Preview de preguntas con renderizado
- Importación masiva desde Excel/CSV
- Analíticas avanzadas
- Gestión de multimedia (imágenes)

## 📝 Generar Preguntas con ChatGPT

Para generar contenido de preguntas:

1. **Lee la guía completa**: [GENERAR_PREGUNTAS.md](./GENERAR_PREGUNTAS.md)
2. **Usa el prompt** incluido en la guía con ChatGPT
3. **Importa las preguntas** usando una de estas opciones:

### Opción 1: Manual (UI)

```
http://localhost:3000/questions/create
```

### Opción 2: Script de importación

```bash
# Guarda el JSON de ChatGPT en un archivo
# Ejemplo: questions-matematicas.json

# Ejecuta el script de importación
node scripts/import-questions.js questions-matematicas.json
```

### Opción 3: SQL directo (Supabase Dashboard)

Genera INSERT statements directamente desde el JSON.

**Ver ejemplos de preguntas**: [ejemplos-preguntas.json](./ejemplos-preguntas.json)

## 🏗️ Estructura del Proyecto

```
src/
├── app/
│   ├── (dashboard)/          # Rutas protegidas
│   │   ├── page.tsx          # Dashboard principal
│   │   ├── questions/        # CRUD de preguntas
│   │   ├── sections/         # Gestión de secciones
│   │   ├── areas/            # Gestión de áreas
│   │   └── skills/           # Gestión de skills
│   ├── login/                # Página de login
│   └── layout.tsx            # Layout raíz
├── components/
│   ├── ui/                   # Componentes shadcn/ui
│   ├── app-sidebar.tsx       # Sidebar del dashboard
│   └── providers.tsx         # Providers de Refine
└── lib/
    ├── supabase.ts           # Cliente de Supabase
    ├── auth-provider.ts      # Provider de autenticación
    └── utils.ts              # Utilidades

scripts/
└── import-questions.js       # Script de importación masiva
```

## 🗄️ Base de Datos

### Tablas Principales

- `exams`: Exámenes (EXANI-II, módulos específicos)
- `sections`: Secciones del examen (Comprensión lectora, Matemáticas, etc.)
- `areas`: Áreas dentro de secciones
- `skills`: Habilidades específicas a evaluar
- `question_sets`: Conjuntos de preguntas
- `questions`: Banco de preguntas
- `profiles`: Perfiles de usuarios con roles

### RLS (Row Level Security)

- **Lectura pública**: Cualquier usuario autenticado puede leer
- **Escritura protegida**: Solo usuarios autenticados pueden crear/editar
- **Roles**: super_admin, content_manager, qa_reviewer, author

## 🔐 Autenticación

### Configurar usuario administrador

```sql
-- Actualizar rol de un usuario existente
UPDATE profiles
SET role = 'super_admin'
WHERE id = 'TU_USER_ID';
```

### Roles disponibles:

- `super_admin`: Acceso total
- `content_manager`: Gestión de contenido
- `qa_reviewer`: Revisión de calidad
- `author`: Creación de contenido (default)

## 📊 Skills Disponibles

El sistema viene pre-configurado con 20+ skills organizados en:

- **Comprensión lectora**: Idea principal, Inferencias, Propósito
- **Redacción indirecta**: Ortografía, Sintaxis, Cohesión
- **Pensamiento matemático**: Aritmética, Álgebra, Geometría
- **Física**: Mecánica, Termodinámica, Ondas
- **Química**: Estructura atómica, Enlaces, Reacciones
- **Probabilidad**: Estadística descriptiva/inferencial, Probabilidad
- **Y más...**

Ver lista completa en [GENERAR_PREGUNTAS.md](./GENERAR_PREGUNTAS.md#-skills-disponibles)

## 🛠️ Scripts Disponibles

```bash
npm run dev          # Desarrollo con Turbopack
npm run build        # Build de producción
npm run start        # Servidor de producción
npm run lint         # Lint con ESLint
```

## 📚 Documentación Adicional

- [MVP.md](./MVP.md) - Especificaciones completas del MVP
- [GENERAR_PREGUNTAS.md](./GENERAR_PREGUNTAS.md) - Guía para generar contenido
- [setup-admin.md](./setup-admin.md) - Configuración de administrador

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto es privado y propietario.

## 🆘 Soporte

Si encuentras problemas:

1. Revisa los archivos de documentación
2. Verifica la consola del navegador y terminal
3. Comprueba las políticas RLS en Supabase
4. Revisa los logs de Supabase

---

**Última actualización**: Febrero 2026
