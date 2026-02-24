# Configuración del Usuario Administrador

## ✅ Protección de Rutas Implementada

El sistema ahora requiere autenticación para acceder a todas las rutas del dashboard:

- ✅ **Rutas protegidas**: Todo bajo `/` (dashboard) requiere login
- ✅ **Redirección automática**: Los usuarios no autenticados son redirigidos a `/login`
- ✅ **Sesión persistente**: Los usuarios autenticados se mantienen logueados
- ✅ **Logout funcional**: Botón de cerrar sesión en el sidebar

## 1. Crear usuario admin en Supabase

Ve a tu proyecto de Supabase > Authentication > Users y crea un nuevo usuario con:

- **Email**: `admin@exani.com`
- **Password**: `Admin123!` (cámbiala después del primer login)
- **Email Verified**: ✅ Activado

**O usa el SQL Editor para crearlo automáticamente:**

```sql
-- Esto inserta directamente en auth.users (solo funciona desde el SQL Editor de Supabase)
-- Primero, crea el usuario manualmente desde la UI de Supabase Authentication

-- Luego crea su perfil:
INSERT INTO profiles (id, email, full_name, role)
VALUES (
  'REEMPLAZA_CON_EL_UUID_DEL_USUARIO',
  'admin@exani.com',
  'Administrador',
  'admin'
);
```

## 2. Crear tabla de profiles (si no existe)

```sql
-- Crear tabla de perfiles
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'author',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS para profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Políticas para profiles
CREATE POLICY "Users can view their own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Trigger para crear perfil automáticamente cuando se crea un usuario
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'full_name', new.email),
    'author'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger que se ejecuta al crear usuario
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

## 3. Actualizar Políticas RLS para requerir autenticación

```sql
-- EXAMS - Requerir autenticación para escritura
DROP POLICY IF EXISTS "Public read access for exams" ON exams;
DROP POLICY IF EXISTS "Authenticated write access for exams" ON exams;

CREATE POLICY "Public read access for exams"
  ON exams FOR SELECT
  USING (true);

CREATE POLICY "Authenticated write access for exams"
  ON exams FOR ALL
  USING (auth.role() = 'authenticated');

-- SECTIONS
DROP POLICY IF EXISTS "Public read access for sections" ON sections;
DROP POLICY IF EXISTS "Authenticated write access for sections" ON sections;

CREATE POLICY "Public read access for sections"
  ON sections FOR SELECT
  USING (true);

CREATE POLICY "Authenticated write access for sections"
  ON sections FOR ALL
  USING (auth.role() = 'authenticated');

-- AREAS
DROP POLICY IF EXISTS "Public read access for areas" ON areas;
DROP POLICY IF EXISTS "Authenticated write access for areas" ON areas;

CREATE POLICY "Public read access for areas"
  ON areas FOR SELECT
  USING (true);

CREATE POLICY "Authenticated write access for areas"
  ON areas FOR ALL
  USING (auth.role() = 'authenticated');

-- SKILLS
DROP POLICY IF EXISTS "Public read access for skills" ON skills;
DROP POLICY IF EXISTS "Authenticated write access for skills" ON skills;

CREATE POLICY "Public read access for skills"
  ON skills FOR SELECT
  USING (true);

CREATE POLICY "Authenticated write access for skills"
  ON skills FOR ALL
  USING (auth.role() = 'authenticated');

-- QUESTION_SETS
DROP POLICY IF EXISTS "Public read access for question_sets" ON question_sets;
DROP POLICY IF EXISTS "Authenticated write access for question_sets" ON question_sets;

CREATE POLICY "Public read access for question_sets"
  ON question_sets FOR SELECT
  USING (true);

CREATE POLICY "Authenticated write access for question_sets"
  ON question_sets FOR ALL
  USING (auth.role() = 'authenticated');

-- QUESTIONS
DROP POLICY IF EXISTS "Public read access for questions" ON questions;
DROP POLICY IF EXISTS "Authenticated write access for questions" ON questions;

CREATE POLICY "Public read access for questions"
  ON questions FOR SELECT
  USING (true);

CREATE POLICY "Authenticated write access for questions"
  ON questions FOR ALL
  USING (auth.role() = 'authenticated');
```

## 4. Credenciales del Admin

**Email**: `admin@exani.com`  
**Password**: `Admin123!`

⚠️ **IMPORTANTE**: Cambia la contraseña después del primer login.

## Pasos a seguir:

1. Ve a tu dashboard de Supabase
2. Abre el **SQL Editor**
3. Ejecuta primero el SQL del paso 2 (crear tabla profiles)
4. Ve a **Authentication > Users**
5. Crea manualmente el usuario admin con el email y password arriba
6. Copia el UUID del usuario creado
7. Vuelve al SQL Editor y ejecuta el INSERT en profiles (reemplazando el UUID)
8. Ejecuta el SQL del paso 3 (políticas RLS)
9. ¡Listo! Ahora puedes iniciar sesión en el backoffice

## Verificación

Para verificar que todo funciona:

1. Ve a `http://localhost:3000/login`
2. Inicia sesión con las credenciales de admin
3. Deberías ser redirigido al dashboard
4. Intenta crear/editar contenido - solo funcionará si estás autenticado
<!--
Genera 15 preguntas completamente parseables para
**Skill ID**: 2
**Skill**: Hacer inferencias
**Dificultad**: medium (puede ser "easy", "medium" o "hard")
**Set ID**: 1
Puedes ocupar Latex en las preguntas si lo crees necesario
-->
