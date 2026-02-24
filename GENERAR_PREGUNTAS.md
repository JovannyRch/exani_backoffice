# Guía para Generar Preguntas EXANI con ChatGPT

## 📋 Contexto del Sistema

Tu aplicación tiene la siguiente estructura jerárquica:

- **Exámenes** → Contienen secciones
- **Secciones** → Contienen áreas (ej: "Comprensión lectora", "Pensamiento matemático")
- **Áreas** → Contienen skills/habilidades
- **Skills** → Agrupan preguntas específicas
- **Preguntas** → Pertenecen a un skill y a un set

## 🎯 Skills Disponibles

Tu base de datos tiene estos skills (actualizado al momento de exportar):

| ID  | Skill                      | Área                       | Sección                    |
| --- | -------------------------- | -------------------------- | -------------------------- |
| 1   | Identificar idea principal | Comprensión lectora        | Comprensión lectora        |
| 2   | Hacer inferencias          | Comprensión lectora        | Comprensión lectora        |
| 3   | Identificar propósito      | Comprensión lectora        | Comprensión lectora        |
| 4   | Ortografía                 | Redacción indirecta        | Redacción indirecta        |
| 5   | Sintaxis                   | Redacción indirecta        | Redacción indirecta        |
| 6   | Cohesión textual           | Redacción indirecta        | Redacción indirecta        |
| 7   | Aritmética                 | Pensamiento matemático     | Pensamiento matemático     |
| 8   | Álgebra                    | Pensamiento matemático     | Pensamiento matemático     |
| 9   | Geometría                  | Pensamiento matemático     | Pensamiento matemático     |
| 10  | Mecánica                   | Física                     | Física                     |
| 11  | Termodinámica              | Física                     | Física                     |
| 12  | Ondas                      | Física                     | Física                     |
| 13  | Estructura atómica         | Química                    | Química                    |
| 14  | Enlaces químicos           | Química                    | Química                    |
| 15  | Reacciones químicas        | Química                    | Química                    |
| 16  | Estadística descriptiva    | Probabilidad y estadística | Probabilidad y estadística |
| 17  | Probabilidad               | Probabilidad y estadística | Probabilidad y estadística |
| 18  | Estadística inferencial    | Probabilidad y estadística | Probabilidad y estadística |
| 19  | Proceso administrativo     | Administración             | Administración             |
| 20  | Teoría de organizaciones   | Administración             | Administración             |

## 📝 Estructura de Pregunta (JSON)

```json
{
  "skill_id": 1,
  "set_id": 1,
  "difficulty": "medium",
  "stem": "Lee el siguiente fragmento y responde:\n\n\"La fotosíntesis es el proceso mediante el cual las plantas convierten la luz solar en energía química. Durante este proceso, las plantas absorben dióxido de carbono y liberan oxígeno.\"\n\n¿Cuál es la idea principal del texto?",
  "options_json": [
    {
      "key": "a",
      "text": "Las plantas necesitan agua para crecer",
      "image": null
    },
    {
      "key": "b",
      "text": "La fotosíntesis convierte luz en energía química",
      "image": null
    },
    {
      "key": "c",
      "text": "El oxígeno es importante para la vida",
      "image": null
    },
    {
      "key": "d",
      "text": "Las plantas consumen dióxido de carbono",
      "image": null
    }
  ],
  "correct_key": "b",
  "explanation": "La idea principal es el concepto central del texto. Aunque se menciona el oxígeno y el CO2, el foco está en explicar qué es la fotosíntesis: convertir luz en energía química.",
  "tags_json": ["comprension_lectora", "idea_principal", "ciencias"],
  "source": "Generado EXANI 2026",
  "is_active": true
}
```

## 🤖 Prompt para ChatGPT

Copia y pega este prompt en ChatGPT:

---

**PROMPT PARA CHATGPT:**

````
Eres un experto diseñador de preguntas tipo EXANI (examen de ingreso a educación superior en México).

Necesito que generes 10 preguntas de opción múltiple en formato JSON para el siguiente skill:

**Skill ID**: 7
**Skill**: Aritmética
**Área**: Pensamiento matemático
**Dificultad**: medium (puede ser "easy", "medium" o "hard")
**Set ID**: 1

REQUISITOS:
1. Cada pregunta debe tener 4 opciones (a, b, c, d)
2. Solo UNA opción es correcta
3. Las opciones incorrectas deben ser plausibles (distractores educativos)
4. Incluir explicación detallada de por qué la respuesta es correcta
5. Agregar 2-4 tags relevantes
6. El formato debe ser EXACTAMENTE como el ejemplo abajo

FORMATO JSON REQUERIDO:
```json
{
  "skill_id": 7,
  "set_id": 1,
  "difficulty": "medium",
  "stem": "[TEXTO DE LA PREGUNTA - puede incluir contexto, fragmentos, problemas]",
  "options_json": [
    {"key": "a", "text": "[Opción A]", "image": null},
    {"key": "b", "text": "[Opción B]", "image": null},
    {"key": "c", "text": "[Opción C]", "image": null},
    {"key": "d", "text": "[Opción D]", "image": null}
  ],
  "correct_key": "[a/b/c/d]",
  "explanation": "[Explicación detallada de la respuesta correcta y por qué las demás son incorrectas]",
  "tags_json": ["tag1", "tag2", "tag3"],
  "source": "Generado EXANI 2026",
  "is_active": true
}
````

IMPORTANTE:

- Retorna un array JSON con las 10 preguntas: [pregunta1, pregunta2, ...]
- NO incluyas comentarios en el JSON
- Las preguntas deben ser de nivel bachillerato/preparatoria
- Varía la dificultad: 3 easy, 5 medium, 2 hard
- Asegúrate que el JSON sea válido y parseable

Genera las 10 preguntas ahora.

```

---

## 📊 Variantes del Prompt por Tipo de Skill

### Para Comprensión Lectora (Skills 1-3)
Agrega al prompt:
```

CONTEXTO ADICIONAL:

- Incluye fragmentos de texto de 3-5 líneas
- Los textos deben ser variados: científicos, literarios, periodísticos, académicos
- Las preguntas deben evaluar comprensión real, no memoria

```

### Para Matemáticas (Skills 7-9)
Agrega al prompt:
```

CONTEXTO ADICIONAL:

- Incluye problemas contextualizados (situaciones reales)
- Muestra las operaciones en la explicación
- Los distractores deben ser errores comunes de cálculo

```

### Para Ciencias (Skills 10-15)
Agrega al prompt:
```

CONTEXTO ADICIONAL:

- Basar preguntas en conceptos fundamentales de bachillerato
- Incluir aplicaciones prácticas
- Los distractores deben ser conceptos erróneos comunes

````

## 💾 Cómo Importar las Preguntas

### Opción 1: Importación Masiva en la UI (RECOMENDADO ⭐)
1. Ve a tu backoffice: http://localhost:3000/questions
2. Haz clic en el botón **"Importar"**
3. Pega el JSON que te dio ChatGPT en el textarea
4. Haz clic en **"Validar JSON"** para verificar errores
5. Revisa el preview de las preguntas
6. Haz clic en **"Importar Ahora"**
7. ¡Listo! Las preguntas se crearán automáticamente

**Ventajas:**
- ✅ Interfaz visual y amigable
- ✅ Validación en tiempo real
- ✅ Preview antes de importar
- ✅ Barra de progreso
- ✅ Reporte de éxito/errores
- ✅ No requiere conocimientos técnicos

### Opción 2: Manual (Para pocas preguntas)
1. Ve a tu backoffice: http://localhost:3000/questions/create
2. Copia los datos del JSON y pégalos en el formulario
3. El formulario autocompleta con los datos del JSON

### Opción 3: Script Node.js (Para automatización)
Guarda el JSON que te da ChatGPT en un archivo y ejecuta:

```bash
node scripts/import-questions.js questions.json
```

### Opción 4: SQL Directo (Para muchas preguntas)
Usa el formato SQL en Supabase Dashboard:

```sql
INSERT INTO questions (skill_id, set_id, difficulty, stem, options_json, correct_key, explanation, tags_json, source, is_active)
VALUES
(7, 1, 'medium', '¿Cuánto es 2 + 2?',
 '[{"key":"a","text":"3","image":null},{"key":"b","text":"4","image":null},{"key":"c","text":"5","image":null},{"key":"d","text":"6","image":null}]'::jsonb,
 'b', 'La suma de 2 más 2 es igual a 4', '["aritmetica", "suma"]'::jsonb, 'Generado EXANI 2026', true);
````

### Opción 3: Script de Importación (Recomendado para producción)

Crea un archivo `import-questions.js`:

```javascript
const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");

const supabase = createClient(
  "https://quicsqnemgdvzmldalcq.supabase.co",
  "TU_SUPABASE_KEY",
);

const questions = JSON.parse(fs.readFileSync("questions.json", "utf-8"));

async function importQuestions() {
  for (const question of questions) {
    const { error } = await supabase.from("questions").insert(question);
    if (error) {
      console.error("Error:", error);
    } else {
      console.log("✓ Pregunta importada");
    }
  }
}

importQuestions();
```

## 📈 Plan de Generación Recomendado

1. **Fase 1 - Transversales (Prioridad Alta)**
   - Comprensión lectora: 30 preguntas (10 por skill)
   - Redacción indirecta: 30 preguntas (10 por skill)
   - Pensamiento matemático: 30 preguntas (10 por skill)

2. **Fase 2 - Ciencias**
   - Física: 30 preguntas (10 por skill)
   - Química: 30 preguntas (10 por skill)

3. **Fase 3 - Especialidades**
   - Probabilidad: 30 preguntas (10 por skill)
   - Otras áreas según tu examen

## ✅ Checklist de Calidad

Antes de importar, verifica que cada pregunta tenga:

- [ ] Texto claro y sin errores ortográficos
- [ ] Exactamente 4 opciones
- [ ] Solo una respuesta correcta marcada
- [ ] Explicación que justifique la respuesta
- [ ] Distractores plausibles (opciones incorrectas razonables)
- [ ] Dificultad apropiada al nivel
- [ ] Tags relevantes
- [ ] JSON válido (usa jsonlint.com para verificar)

## 🎓 Consejos para Mejores Preguntas

1. **Distractores efectivos**: Deben representar errores comunes o conceptos relacionados
2. **Contexto realista**: Situaciones que un estudiante podría encontrar
3. **Explicaciones educativas**: No solo "la respuesta es B", sino POR QUÉ
4. **Variedad**: Mezcla preguntas directas con análisis y aplicación
5. **Nivel apropiado**: Bachillerato/preparatoria mexicano

## 🔄 Iteración con ChatGPT

Si las preguntas no son adecuadas, usa estos prompts de refinamiento:

```
"Estas preguntas son muy fáciles, aumenta la dificultad requiriendo más análisis"

"Los distractores son muy obvios, hazlos más plausibles"

"Agrega más contexto a los stems, que sean situaciones reales"

"Las explicaciones son cortas, expándelas para que sean educativas"
```

## 📞 Soporte

Si tienes dudas sobre qué skill usar o cómo estructurar preguntas específicas, consulta el MVP.md o revisa ejemplos existentes en la base de datos.

---

**Última actualización**: Febrero 2026
**Versión**: 1.0
