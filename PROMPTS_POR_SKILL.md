# Prompts para Generar Preguntas por Skill

Copia cada prompt y pégalo en ChatGPT, Claude o Gemini para generar 15 preguntas por skill.

## ⚠️ IMPORTANTE: Solo JSON Crudo

**Si usas Google Gemini o cualquier IA:**

- **NO quiero formularios interactivos**
- **NO quiero código HTML**
- **NO quiero explicaciones adicionales**
- **SOLO quiero el array JSON puro y parseable**
- La respuesta debe empezar con `[` y terminar con `]`
- Debe ser JSON válido que pueda copiar y pegar directamente

---

## Skill 3: Identificar propósito

````
⚠️ IMPORTANTE: Retorna ÚNICAMENTE el array JSON. NO generes formularios, NO uses HTML, NO agregues explicaciones fuera del JSON. Tu respuesta debe iniciar con [ y terminar con ]

Eres un experto diseñador de preguntas tipo EXANI (examen de ingreso a educación superior en México).

Genera 15 preguntas completamente parseables en formato JSON para:

**Skill ID**: 3
**Skill**: Identificar propósito
**Área**: Comprensión lectora general
**Sección**: Comprensión lectora
**Dificultad**: Varía entre "easy", "medium" y "hard" (5 easy, 7 medium, 3 hard)
**Set ID**: 1

REQUISITOS:
1. Cada pregunta debe tener 4 opciones (a, b, c, d)
2. Solo UNA opción es correcta
3. Las opciones incorrectas deben ser plausibles (distractores educativos)
4. Incluir explicación detallada de por qué la respuesta es correcta
5. Agregar 2-4 tags relevantes
6. Puedes usar notación LaTeX si es necesario: `$formula$` o `$$formula$$`
7. El formato debe ser EXACTAMENTE como el ejemplo abajo

CONTEXTO ADICIONAL:
- Incluye fragmentos de texto de 3-5 líneas
- Los textos deben ser variados: científicos, literarios, periodísticos, académicos
- Las preguntas deben evaluar la identificación del propósito del autor/texto

FORMATO JSON REQUERIDO:
Retorna un array JSON con las 15 preguntas: [pregunta1, pregunta2, ...]

Cada pregunta debe tener esta estructura:
{
  "skill_id": 3,
  "set_id": 1,
  "difficulty": "medium",
  "stem": "[TEXTO DE LA PREGUNTA con fragmento incluido]",
  "options_json": [
    {"key": "a", "text": "[Opción A]", "image": null},
    {"key": "b", "text": "[Opción B]", "image": null},
    {"key": "c", "text": "[Opción C]", "image": null},
    {"key": "d", "text": "[Opción D]", "image": null}
  ],
  "correct_key": "[a/b/c/d]",
  "explanation": "[Explicación detallada]",
  "tags_json": ["tag1", "tag2", "tag3"],
  "source": "Generado EXANI 2026",
  "is_active": true
}

NO INCLUYAS NADA MÁS QUE EL JSON. Empieza tu respuesta con [ y termina con ], formatea la salida en formato JSON ```json .... ```
````

---

## Skill 4: Ortografía

````
⚠️ IMPORTANTE: Retorna ÚNICAMENTE el array JSON. NO generes formularios, NO uses HTML, NO agregues explicaciones fuera del JSON. Tu respuesta debe iniciar con [ y terminar con ]

Eres un experto diseñador de preguntas tipo EXANI (examen de ingreso a educación superior en México).

Genera 15 preguntas completamente parseables en formato JSON para:

**Skill ID**: 4
**Skill**: Ortografía
**Área**: Redacción indirecta general
**Sección**: Redacción indirecta
**Dificultad**: Varía entre "easy", "medium" y "hard" (5 easy, 7 medium, 3 hard)
**Set ID**: 1

REQUISITOS:
1. Cada pregunta debe tener 4 opciones (a, b, c, d)
2. Solo UNA opción es correcta
3. Las opciones incorrectas deben ser plausibles (distractores educativos)
4. Incluir explicación detallada de por qué la respuesta es correcta
5. Agregar 2-4 tags relevantes
6. Puedes usar notación LaTeX si es necesario: `$formula$` o `$$formula$$`
7. El formato debe ser EXACTAMENTE como el ejemplo abajo

CONTEXTO ADICIONAL:
- Enfócate en reglas ortográficas del español: acentuación, uso de letras (b/v, c/s/z, g/j, h), mayúsculas
- Las preguntas deben evaluar conocimiento práctico de ortografía

FORMATO JSON REQUERIDO:
Retorna un array JSON con las 15 preguntas: [pregunta1, pregunta2, ...]

Cada pregunta debe tener esta estructura:
{
  "skill_id": 4,
  "set_id": 1,
  "difficulty": "medium",
  "stem": "[TEXTO DE LA PREGUNTA]",
  "options_json": [
    {"key": "a", "text": "[Opción A]", "image": null},
    {"key": "b", "text": "[Opción B]", "image": null},
    {"key": "c", "text": "[Opción C]", "image": null},
    {"key": "d", "text": "[Opción D]", "image": null}
  ],
  "correct_key": "[a/b/c/d]",
  "explanation": "[Explicación detallada con regla ortográfica]",
  "tags_json": ["tag1", "tag2", "tag3"],
  "source": "Generado EXANI 2026",
  "is_active": true
}

NO INCLUYAS NADA MÁS QUE EL JSON. Empieza tu respuesta con [ y termina con ], formatea la salida en formato JSON ```json .... ```
````

---

## Skill 5: Sintaxis

````
⚠️ IMPORTANTE: Retorna ÚNICAMENTE el array JSON. NO generes formularios, NO uses HTML, NO agregues explicaciones fuera del JSON. Tu respuesta debe iniciar con [ y terminar con ]

Eres un experto diseñador de preguntas tipo EXANI (examen de ingreso a educación superior en México).

Genera 15 preguntas completamente parseables en formato JSON para:

**Skill ID**: 5
**Skill**: Sintaxis
**Área**: Redacción indirecta general
**Sección**: Redacción indirecta
**Dificultad**: Varía entre "easy", "medium" y "hard" (5 easy, 7 medium, 3 hard)
**Set ID**: 1

REQUISITOS:
1. Cada pregunta debe tener 4 opciones (a, b, c, d)
2. Solo UNA opción es correcta
3. Las opciones incorrectas deben ser plausibles (distractores educativos)
4. Incluir explicación detallada de por qué la respuesta es correcta
5. Agregar 2-4 tags relevantes
6. Puedes usar notación LaTeX si es necesario: `$formula$` o `$$formula$$`
7. El formato debe ser EXACTAMENTE como el ejemplo abajo

CONTEXTO ADICIONAL:
- Enfócate en estructura de oraciones, concordancia, orden de palabras, uso de conectores
- Las preguntas deben evaluar conocimiento de sintaxis española

FORMATO JSON REQUERIDO:
Retorna un array JSON con las 15 preguntas: [pregunta1, pregunta2, ...]

Cada pregunta debe tener esta estructura:
{
  "skill_id": 5,
  "set_id": 1,
  "difficulty": "medium",
  "stem": "[TEXTO DE LA PREGUNTA]",
  "options_json": [
    {"key": "a", "text": "[Opción A]", "image": null},
    {"key": "b", "text": "[Opción B]", "image": null},
    {"key": "c", "text": "[Opción C]", "image": null},
    {"key": "d", "text": "[Opción D]", "image": null}
  ],
  "correct_key": "[a/b/c/d]",
  "explanation": "[Explicación detallada con regla sintáctica]",
  "tags_json": ["tag1", "tag2", "tag3"],
  "source": "Generado EXANI 2026",
  "is_active": true
}

NO INCLUYAS NADA MÁS QUE EL JSON. Empieza tu respuesta con [ y termina con ], formatea la salida en formato JSON ```json .... ```
````

---

## Skill 6: Cohesión textual

````
⚠️ IMPORTANTE: Retorna ÚNICAMENTE el array JSON. NO generes formularios, NO uses HTML, NO agregues explicaciones fuera del JSON. Tu respuesta debe iniciar con [ y terminar con ]

Eres un experto diseñador de preguntas tipo EXANI (examen de ingreso a educación superior en México).

Genera 15 preguntas completamente parseables en formato JSON para:

**Skill ID**: 6
**Skill**: Cohesión textual
**Área**: Redacción indirecta general
**Sección**: Redacción indirecta
**Dificultad**: Varía entre "easy", "medium" y "hard" (5 easy, 7 medium, 3 hard)
**Set ID**: 1

REQUISITOS:
1. Cada pregunta debe tener 4 opciones (a, b, c, d)
2. Solo UNA opción es correcta
3. Las opciones incorrectas deben ser plausibles (distractores educativos)
4. Incluir explicación detallada de por qué la respuesta es correcta
5. Agregar 2-4 tags relevantes
6. Puedes usar notación LaTeX si es necesario: `$formula$` o `$$formula$$`
7. El formato debe ser EXACTAMENTE como el ejemplo abajo

CONTEXTO ADICIONAL:
- Enfócate en conectores lógicos, referentes textuales, secuencia lógica de ideas
- Las preguntas deben evaluar la capacidad de mantener cohesión en textos

FORMATO JSON REQUERIDO:
Retorna un array JSON con las 15 preguntas: [pregunta1, pregunta2, ...]

Cada pregunta debe tener esta estructura:
{
  "skill_id": 6,
  "set_id": 1,
  "difficulty": "medium",
  "stem": "[TEXTO DE LA PREGUNTA]",
  "options_json": [
    {"key": "a", "text": "[Opción A]", "image": null},
    {"key": "b", "text": "[Opción B]", "image": null},
    {"key": "c", "text": "[Opción C]", "image": null},
    {"key": "d", "text": "[Opción D]", "image": null}
  ],
  "correct_key": "[a/b/c/d]",
  "explanation": "[Explicación detallada]",
  "tags_json": ["tag1", "tag2", "tag3"],
  "source": "Generado EXANI 2026",
  "is_active": true
}

NO INCLUYAS NADA MÁS QUE EL JSON. Empieza tu respuesta con [ y termina con ], formatea la salida en formato JSON ```json .... ```
````

---

## Skill 7: Aritmética

````
⚠️ IMPORTANTE: Retorna ÚNICAMENTE el array JSON. NO generes formularios, NO uses HTML, NO agregues explicaciones fuera del JSON. Tu respuesta debe iniciar con [ y terminar con ]

Eres un experto diseñador de preguntas tipo EXANI (examen de ingreso a educación superior en México).

Genera 15 preguntas completamente parseables en formato JSON para:

**Skill ID**: 7
**Skill**: Aritmética
**Área**: Pensamiento matemático general
**Sección**: Pensamiento matemático
**Dificultad**: Varía entre "easy", "medium" y "hard" (5 easy, 7 medium, 3 hard)
**Set ID**: 1

REQUISITOS:
1. Cada pregunta debe tener 4 opciones (a, b, c, d)
2. Solo UNA opción es correcta
3. Las opciones incorrectas deben ser plausibles (distractores educativos)
4. Incluir explicación detallada de por qué la respuesta es correcta
5. Agregar 2-4 tags relevantes
6. **USA NOTACIÓN LaTeX** para todas las fórmulas matemáticas: `$formula$` inline, `$$formula$$` bloque
7. El formato debe ser EXACTAMENTE como el ejemplo abajo
8. Escapa barras en JSON: `\\frac`, `\\sqrt`, `\\times`, `\\div`

CONTEXTO ADICIONAL:
- Incluye problemas de suma, resta, multiplicación, división, fracciones, decimales, porcentajes, razones, proporciones
- Problemas contextualizados (situaciones reales)
- Muestra las operaciones en la explicación usando LaTeX
- Los distractores deben ser errores comunes de cálculo

FORMATO JSON REQUERIDO:
Retorna un array JSON con las 15 preguntas: [pregunta1, pregunta2, ...]

Cada pregunta debe tener esta estructura:
{
  "skill_id": 7,
  "set_id": 1,
  "difficulty": "medium",
  "stem": "[TEXTO con fórmulas LaTeX si aplica]",
  "options_json": [
    {"key": "a", "text": "$opción$ con LaTeX si aplica", "image": null},
    {"key": "b", "text": "$opción$ con LaTeX si aplica", "image": null},
    {"key": "c", "text": "$opción$ con LaTeX si aplica", "image": null},
    {"key": "d", "text": "$opción$ con LaTeX si aplica", "image": null}
  ],
  "correct_key": "[a/b/c/d]",
  "explanation": "[Explicación con $$fórmulas$$ LaTeX mostrando pasos]",
  "tags_json": ["tag1", "tag2", "tag3"],
  "source": "Generado EXANI 2026",
  "is_active": true
}

NO INCLUYAS NADA MÁS QUE EL JSON. Empieza tu respuesta con [ y termina con ], formatea la salida en formato JSON ```json .... ```
````

---

## Skill 8: Álgebra

````
⚠️ IMPORTANTE: Retorna ÚNICAMENTE el array JSON. NO generes formularios, NO uses HTML, NO agregues explicaciones fuera del JSON. Tu respuesta debe iniciar con [ y terminar con ]

Eres un experto diseñador de preguntas tipo EXANI (examen de ingreso a educación superior en México).

Genera 15 preguntas completamente parseables en formato JSON para:

**Skill ID**: 8
**Skill**: Álgebra
**Área**: Pensamiento matemático general
**Sección**: Pensamiento matemático
**Dificultad**: Varía entre "easy", "medium" y "hard" (5 easy, 7 medium, 3 hard)
**Set ID**: 1

REQUISITOS:
1. Cada pregunta debe tener 4 opciones (a, b, c, d)
2. Solo UNA opción es correcta
3. Las opciones incorrectas deben ser plausibles (distractores educativos)
4. Incluir explicación detallada de por qué la respuesta es correcta
5. Agregar 2-4 tags relevantes
6. **USA NOTACIÓN LaTeX** para todas las expresiones algebraicas: `$x^2 + 5x - 3$`
7. El formato debe ser EXACTAMENTE como el ejemplo abajo
8. Escapa barras en JSON: `\\frac`, `\\sqrt`, `\\times`, `\\div`

CONTEXTO ADICIONAL:
- Incluye ecuaciones lineales, sistemas de ecuaciones, factorización, exponentes, radicales, funciones
- Problemas contextualizados cuando sea posible
- Muestra los pasos algebraicos en la explicación usando LaTeX
- Los distractores deben ser errores algebraicos comunes

FORMATO JSON REQUERIDO:
Retorna un array JSON con las 15 preguntas: [pregunta1, pregunta2, ...]

Cada pregunta debe tener esta estructura:
{
  "skill_id": 8,
  "set_id": 1,
  "difficulty": "medium",
  "stem": "[TEXTO con ecuaciones LaTeX: $2x + 5 = 15$]",
  "options_json": [
    {"key": "a", "text": "$x = valor$", "image": null},
    {"key": "b", "text": "$x = valor$", "image": null},
    {"key": "c", "text": "$x = valor$", "image": null},
    {"key": "d", "text": "$x = valor$", "image": null}
  ],
  "correct_key": "[a/b/c/d]",
  "explanation": "[Explicación con pasos: $$2x = 10$$ entonces $$x = 5$$]",
  "tags_json": ["tag1", "tag2", "tag3"],
  "source": "Generado EXANI 2026",
  "is_active": true
}

NO INCLUYAS NADA MÁS QUE EL JSON. Empieza tu respuesta con [ y termina con ], formatea la salida en formato JSON ```json .... ```
````

---

## Skill 9: Geometría

````
⚠️ IMPORTANTE: Retorna ÚNICAMENTE el array JSON. NO generes formularios, NO uses HTML, NO agregues explicaciones fuera del JSON. Tu respuesta debe iniciar con [ y terminar con ]

Eres un experto diseñador de preguntas tipo EXANI (examen de ingreso a educación superior en México).

Genera 15 preguntas completamente parseables en formato JSON para:

**Skill ID**: 9
**Skill**: Geometría
**Área**: Pensamiento matemático general
**Sección**: Pensamiento matemático
**Dificultad**: Varía entre "easy", "medium" y "hard" (5 easy, 7 medium, 3 hard)
**Set ID**: 1

REQUISITOS:
1. Cada pregunta debe tener 4 opciones (a, b, c, d)
2. Solo UNA opción es correcta
3. Las opciones incorrectas deben ser plausibles (distractores educativos)
4. Incluir explicación detallada de por qué la respuesta es correcta
5. Agregar 2-4 tags relevantes
6. **USA NOTACIÓN LaTeX** para fórmulas geométricas: `$A = \\pi r^2$`
7. El formato debe ser EXACTAMENTE como el ejemplo abajo
8. Escapa barras en JSON: `\\pi`, `\\sqrt`, `\\times`

CONTEXTO ADICIONAL:
- Incluye áreas, perímetros, volúmenes, ángulos, teorema de Pitágoras, figuras planas y sólidos
- Problemas con situaciones prácticas
- Muestra las fórmulas y cálculos en la explicación usando LaTeX

FORMATO JSON REQUERIDO:
Retorna un array JSON con las 15 preguntas: [pregunta1, pregunta2, ...]

Cada pregunta debe tener esta estructura:
{
  "skill_id": 9,
  "set_id": 1,
  "difficulty": "medium",
  "stem": "[TEXTO del problema geométrico]",
  "options_json": [
    {"key": "a", "text": "$valor$ unidades", "image": null},
    {"key": "b", "text": "$valor$ unidades", "image": null},
    {"key": "c", "text": "$valor$ unidades", "image": null},
    {"key": "d", "text": "$valor$ unidades", "image": null}
  ],
  "correct_key": "[a/b/c/d]",
  "explanation": "[Explicación con fórmula: $$A = l \\times w$$]",
  "tags_json": ["tag1", "tag2", "tag3"],
  "source": "Generado EXANI 2026",
  "is_active": true
}

NO INCLUYAS NADA MÁS QUE EL JSON. Empieza tu respuesta con [ y termina con ], formatea la salida en formato JSON ```json .... ```
````

---

## Skill 10: Mecánica

````
⚠️ IMPORTANTE: Retorna ÚNICAMENTE el array JSON. NO generes formularios, NO uses HTML, NO agregues explicaciones fuera del JSON. Tu respuesta debe iniciar con [ y terminar con ]

Eres un experto diseñador de preguntas tipo EXANI (examen de ingreso a educación superior en México).

Genera 15 preguntas completamente parseables en formato JSON para:

**Skill ID**: 10
**Skill**: Mecánica
**Área**: Física general
**Sección**: Física
**Dificultad**: Varía entre "easy", "medium" y "hard" (5 easy, 7 medium, 3 hard)
**Set ID**: 1

REQUISITOS:
1. Cada pregunta debe tener 4 opciones (a, b, c, d)
2. Solo UNA opción es correcta
3. Las opciones incorrectas deben ser plausibles (distractores educativos)
4. Incluir explicación detallada de por qué la respuesta es correcta
5. Agregar 2-4 tags relevantes
6. **USA NOTACIÓN LaTeX** para fórmulas físicas: `$F = ma$`, `$v = \\frac{d}{t}$`
7. El formato debe ser EXACTAMENTE como el ejemplo abajo
8. Escapa barras en JSON: `\\frac`, `\\Delta`, `\\times`

CONTEXTO ADICIONAL:
- Incluye cinemática, dinámica, trabajo, energía, momentum, leyes de Newton
- Problemas de nivel bachillerato con aplicaciones prácticas
- Muestra las fórmulas y cálculos en la explicación usando LaTeX

FORMATO JSON REQUERIDO:
Retorna un array JSON con las 15 preguntas: [pregunta1, pregunta2, ...]

Cada pregunta debe tener esta estructura:
{
  "skill_id": 10,
  "set_id": 1,
  "difficulty": "medium",
  "stem": "[TEXTO del problema de mecánica]",
  "options_json": [
    {"key": "a", "text": "$valor$ unidades", "image": null},
    {"key": "b", "text": "$valor$ unidades", "image": null},
    {"key": "c", "text": "$valor$ unidades", "image": null},
    {"key": "d", "text": "$valor$ unidades", "image": null}
  ],
  "correct_key": "[a/b/c/d]",
  "explanation": "[Explicación con fórmula: $$F = ma = 10 \\times 5 = 50 N$$]",
  "tags_json": ["tag1", "tag2", "tag3"],
  "source": "Generado EXANI 2026",
  "is_active": true
}

NO INCLUYAS NADA MÁS QUE EL JSON. Empieza tu respuesta con [ y termina con ], formatea la salida en formato JSON ```json .... ```
````

---

## Skill 11: Termodinámica

````
⚠️ IMPORTANTE: Retorna ÚNICAMENTE el array JSON. NO generes formularios, NO uses HTML, NO agregues explicaciones fuera del JSON. Tu respuesta debe iniciar con [ y terminar con ]

Eres un experto diseñador de preguntas tipo EXANI (examen de ingreso a educación superior en México).

Genera 15 preguntas completamente parseables en formato JSON para:

**Skill ID**: 11
**Skill**: Termodinámica
**Área**: Física general
**Sección**: Física
**Dificultad**: Varía entre "easy", "medium" y "hard" (5 easy, 7 medium, 3 hard)
**Set ID**: 1

REQUISITOS:
1. Cada pregunta debe tener 4 opciones (a, b, c, d)
2. Solo UNA opción es correcta
3. Las opciones incorrectas deben ser plausibles (distractores educativos)
4. Incluir explicación detallada de por qué la respuesta es correcta
5. Agregar 2-4 tags relevantes
6. **USA NOTACIÓN LaTeX** para fórmulas: `$Q = mc\\Delta T$`, `$PV = nRT$`
7. El formato debe ser EXACTAMENTE como el ejemplo abajo
8. Escapa barras en JSON: `\\Delta`, `\\times`

CONTEXTO ADICIONAL:
- Incluye calor, temperatura, leyes de termodinámica, gases ideales, cambios de estado
- Problemas de nivel bachillerato
- Muestra las fórmulas en la explicación usando LaTeX

FORMATO JSON REQUERIDO:
Retorna un array JSON con las 15 preguntas: [pregunta1, pregunta2, ...]

Cada pregunta debe tener esta estructura:
{
  "skill_id": 11,
  "set_id": 1,
  "difficulty": "medium",
  "stem": "[TEXTO del problema termodinámico]",
  "options_json": [
    {"key": "a", "text": "$valor$ unidades", "image": null},
    {"key": "b", "text": "$valor$ unidades", "image": null},
    {"key": "c", "text": "$valor$ unidades", "image": null},
    {"key": "d", "text": "$valor$ unidades", "image": null}
  ],
  "correct_key": "[a/b/c/d]",
  "explanation": "[Explicación con fórmula LaTeX]",
  "tags_json": ["tag1", "tag2", "tag3"],
  "source": "Generado EXANI 2026",
  "is_active": true
}

NO INCLUYAS NADA MÁS QUE EL JSON. Empieza tu respuesta con [ y termina con ], formatea la salida en formato JSON ```json .... ```
````

---

## Skill 12: Ondas

````
⚠️ IMPORTANTE: Retorna ÚNICAMENTE el array JSON. NO generes formularios, NO uses HTML, NO agregues explicaciones fuera del JSON. Tu respuesta debe iniciar con [ y terminar con ]

Eres un experto diseñador de preguntas tipo EXANI (examen de ingreso a educación superior en México).

Genera 15 preguntas completamente parseables en formato JSON para:

**Skill ID**: 12
**Skill**: Ondas
**Área**: Física general
**Sección**: Física
**Dificultad**: Varía entre "easy", "medium" y "hard" (5 easy, 7 medium, 3 hard)
**Set ID**: 1

REQUISITOS:
1. Cada pregunta debe tener 4 opciones (a, b, c, d)
2. Solo UNA opción es correcta
3. Las opciones incorrectas deben ser plausibles (distractores educativos)
4. Incluir explicación detallada de por qué la respuesta es correcta
5. Agregar 2-4 tags relevantes
6. **USA NOTACIÓN LaTeX** para fórmulas: `$v = f\\lambda$`, `$f = \\frac{1}{T}$`
7. El formato debe ser EXACTAMENTE como el ejemplo abajo
8. Escapa barras en JSON: `\\lambda`, `\\frac`

CONTEXTO ADICIONAL:
- Incluye ondas mecánicas, sonido, luz, frecuencia, longitud de onda, velocidad de propagación
- Problemas de nivel bachillerato
- Muestra las fórmulas en la explicación usando LaTeX

FORMATO JSON REQUERIDO:
Retorna un array JSON con las 15 preguntas: [pregunta1, pregunta2, ...]

Cada pregunta debe tener esta estructura:
{
  "skill_id": 12,
  "set_id": 1,
  "difficulty": "medium",
  "stem": "[TEXTO del problema de ondas]",
  "options_json": [
    {"key": "a", "text": "$valor$ unidades", "image": null},
    {"key": "b", "text": "$valor$ unidades", "image": null},
    {"key": "c", "text": "$valor$ unidades", "image": null},
    {"key": "d", "text": "$valor$ unidades", "image": null}
  ],
  "correct_key": "[a/b/c/d]",
  "explanation": "[Explicación con fórmula LaTeX]",
  "tags_json": ["tag1", "tag2", "tag3"],
  "source": "Generado EXANI 2026",
  "is_active": true
}

NO INCLUYAS NADA MÁS QUE EL JSON. Empieza tu respuesta con [ y termina con ], formatea la salida en formato JSON ```json .... ```
````

---

## Skill 13: Estructura atómica

````
⚠️ IMPORTANTE: Retorna ÚNICAMENTE el array JSON. NO generes formularios, NO uses HTML, NO agregues explicaciones fuera del JSON. Tu respuesta debe iniciar con [ y terminar con ]

Eres un experto diseñador de preguntas tipo EXANI (examen de ingreso a educación superior en México).

Genera 15 preguntas completamente parseables en formato JSON para:

**Skill ID**: 13
**Skill**: Estructura atómica
**Área**: Química general
**Sección**: Química
**Dificultad**: Varía entre "easy", "medium" y "hard" (5 easy, 7 medium, 3 hard)
**Set ID**: 1

REQUISITOS:
1. Cada pregunta debe tener 4 opciones (a, b, c, d)
2. Solo UNA opción es correcta
3. Las opciones incorrectas deben ser plausibles (distractores educativos)
4. Incluir explicación detallada de por qué la respuesta es correcta
5. Agregar 2-4 tags relevantes
6. **Usa LaTeX** para notación química: `$H_2O$`, `$CO_2$`, `$Na^+$`
7. El formato debe ser EXACTAMENTE como el ejemplo abajo
8. Escapa barras en JSON si es necesario

CONTEXTO ADICIONAL:
- Incluye protones, neutrones, electrones, número atómico, masa atómica, isótopos, configuración electrónica
- Conceptos fundamentales de bachillerato
- Los distractores deben ser conceptos erróneos comunes

FORMATO JSON REQUERIDO:
Retorna un array JSON con las 15 preguntas: [pregunta1, pregunta2, ...]

Cada pregunta debe tener esta estructura:
{
  "skill_id": 13,
  "set_id": 1,
  "difficulty": "medium",
  "stem": "[TEXTO con notación química usando LaTeX]",
  "options_json": [
    {"key": "a", "text": "$elemento$ o texto", "image": null},
    {"key": "b", "text": "$elemento$ o texto", "image": null},
    {"key": "c", "text": "$elemento$ o texto", "image": null},
    {"key": "d", "text": "$elemento$ o texto", "image": null}
  ],
  "correct_key": "[a/b/c/d]",
  "explanation": "[Explicación detallada]",
  "tags_json": ["tag1", "tag2", "tag3"],
  "source": "Generado EXANI 2026",
  "is_active": true
}

NO INCLUYAS NADA MÁS QUE EL JSON. Empieza tu respuesta con [ y termina con ], formatea la salida en formato JSON ```json .... ```
````

---

## Skill 14: Enlaces químicos

````
⚠️ IMPORTANTE: Retorna ÚNICAMENTE el array JSON. NO generes formularios, NO uses HTML, NO agregues explicaciones fuera del JSON. Tu respuesta debe iniciar con [ y terminar con ]

Eres un experto diseñador de preguntas tipo EXANI (examen de ingreso a educación superior en México).

Genera 15 preguntas completamente parseables en formato JSON para:

**Skill ID**: 14
**Skill**: Enlaces químicos
**Área**: Química general
**Sección**: Química
**Dificultad**: Varía entre "easy", "medium" y "hard" (5 easy, 7 medium, 3 hard)
**Set ID**: 1

REQUISITOS:
1. Cada pregunta debe tener 4 opciones (a, b, c, d)
2. Solo UNA opción es correcta
3. Las opciones incorrectas deben ser plausibles (distractores educativos)
4. Incluir explicación detallada de por qué la respuesta es correcta
5. Agregar 2-4 tags relevantes
6. **Usa LaTeX** para notación química: `$NaCl$`, `$H_2O$`
7. El formato debe ser EXACTAMENTE como el ejemplo abajo

CONTEXTO ADICIONAL:
- Incluye enlaces iónicos, covalentes, metálicos, fuerzas intermoleculares
- Conceptos fundamentales de bachillerato
- Incluir aplicaciones prácticas

FORMATO JSON REQUERIDO:
Retorna un array JSON con las 15 preguntas: [pregunta1, pregunta2, ...]

Cada pregunta debe tener esta estructura:
{
  "skill_id": 14,
  "set_id": 1,
  "difficulty": "medium",
  "stem": "[TEXTO con compuestos químicos]",
  "options_json": [
    {"key": "a", "text": "Opción A", "image": null},
    {"key": "b", "text": "Opción B", "image": null},
    {"key": "c", "text": "Opción C", "image": null},
    {"key": "d", "text": "Opción D", "image": null}
  ],
  "correct_key": "[a/b/c/d]",
  "explanation": "[Explicación detallada]",
  "tags_json": ["tag1", "tag2", "tag3"],
  "source": "Generado EXANI 2026",
  "is_active": true
}

NO INCLUYAS NADA MÁS QUE EL JSON. Empieza tu respuesta con [ y termina con ], formatea la salida en formato JSON ```json .... ```
````

---

## Skill 15: Reacciones químicas

````
⚠️ IMPORTANTE: Retorna ÚNICAMENTE el array JSON. NO generes formularios, NO uses HTML, NO agregues explicaciones fuera del JSON. Tu respuesta debe iniciar con [ y terminar con ]

Eres un experto diseñador de preguntas tipo EXANI (examen de ingreso a educación superior en México).

Genera 15 preguntas completamente parseables en formato JSON para:

**Skill ID**: 15
**Skill**: Reacciones químicas
**Área**: Química general
**Sección**: Química
**Dificultad**: Varía entre "easy", "medium" y "hard" (5 easy, 7 medium, 3 hard)
**Set ID**: 1

REQUISITOS:
1. Cada pregunta debe tener 4 opciones (a, b, c, d)
2. Solo UNA opción es correcta
3. Las opciones incorrectas deben ser plausibles (distractores educativos)
4. Incluir explicación detallada de por qué la respuesta es correcta
5. Agregar 2-4 tags relevantes
6. **Usa LaTeX** para ecuaciones químicas: `$2H_2 + O_2 \\rightarrow 2H_2O$`
7. El formato debe ser EXACTAMENTE como el ejemplo abajo
8. Escapa barras: `\\rightarrow`, `\\leftarrow`

CONTEXTO ADICIONAL:
- Incluye tipos de reacciones, balanceo, estequiometría, reactivos limitantes
- Conceptos fundamentales de bachillerato
- Muestra ecuaciones balanceadas en la explicación

FORMATO JSON REQUERIDO:
Retorna un array JSON con las 15 preguntas: [pregunta1, pregunta2, ...]

Cada pregunta debe tener esta estructura:
{
  "skill_id": 15,
  "set_id": 1,
  "difficulty": "medium",
  "stem": "[TEXTO con ecuación química usando LaTeX]",
  "options_json": [
    {"key": "a", "text": "Opción A", "image": null},
    {"key": "b", "text": "Opción B", "image": null},
    {"key": "c", "text": "Opción C", "image": null},
    {"key": "d", "text": "Opción D", "image": null}
  ],
  "correct_key": "[a/b/c/d]",
  "explanation": "[Explicación con ecuación balanceada]",
  "tags_json": ["tag1", "tag2", "tag3"],
  "source": "Generado EXANI 2026",
  "is_active": true
}

NO INCLUYAS NADA MÁS QUE EL JSON. Empieza tu respuesta con [ y termina con ], formatea la salida en formato JSON ```json .... ```
````

---

## Skill 16: Estadística descriptiva

````
⚠️ IMPORTANTE: Retorna ÚNICAMENTE el array JSON. NO generes formularios, NO uses HTML, NO agregues explicaciones fuera del JSON. Tu respuesta debe iniciar con [ y terminar con ]

Eres un experto diseñador de preguntas tipo EXANI (examen de ingreso a educación superior en México).

Genera 15 preguntas completamente parseables en formato JSON para:

**Skill ID**: 16
**Skill**: Estadística descriptiva
**Área**: Probabilidad y estadística general
**Sección**: Probabilidad y estadística
**Dificultad**: Varía entre "easy", "medium" y "hard" (5 easy, 7 medium, 3 hard)
**Set ID**: 1

REQUISITOS:
1. Cada pregunta debe tener 4 opciones (a, b, c, d)
2. Solo UNA opción es correcta
3. Las opciones incorrectas deben ser plausibles (distractores educativos)
4. Incluir explicación detallada de por qué la respuesta es correcta
5. Agregar 2-4 tags relevantes
6. **Usa LaTeX** para fórmulas estadísticas: `$\\bar{x} = \\frac{\\sum x}{n}$`
7. El formato debe ser EXACTAMENTE como el ejemplo abajo
8. Escapa barras: `\\bar`, `\\sum`, `\\frac`

CONTEXTO ADICIONAL:
- Incluye media, mediana, moda, rango, desviación estándar, cuartiles, gráficas
- Problemas con datos reales
- Muestra cálculos en la explicación usando LaTeX

FORMATO JSON REQUERIDO:
Retorna un array JSON con las 15 preguntas: [pregunta1, pregunta2, ...]

Cada pregunta debe tener esta estructura:
{
  "skill_id": 16,
  "set_id": 1,
  "difficulty": "medium",
  "stem": "[TEXTO con datos estadísticos]",
  "options_json": [
    {"key": "a", "text": "$valor$", "image": null},
    {"key": "b", "text": "$valor$", "image": null},
    {"key": "c", "text": "$valor$", "image": null},
    {"key": "d", "text": "$valor$", "image": null}
  ],
  "correct_key": "[a/b/c/d]",
  "explanation": "[Explicación con cálculos LaTeX]",
  "tags_json": ["tag1", "tag2", "tag3"],
  "source": "Generado EXANI 2026",
  "is_active": true
}

NO INCLUYAS NADA MÁS QUE EL JSON. Empieza tu respuesta con [ y termina con ], formatea la salida en formato JSON ```json .... ```
````

---

## Skill 17: Probabilidad

````
⚠️ IMPORTANTE: Retorna ÚNICAMENTE el array JSON. NO generes formularios, NO uses HTML, NO agregues explicaciones fuera del JSON. Tu respuesta debe iniciar con [ y terminar con ]

Eres un experto diseñador de preguntas tipo EXANI (examen de ingreso a educación superior en México).

Genera 15 preguntas completamente parseables en formato JSON para:

**Skill ID**: 17
**Skill**: Probabilidad
**Área**: Probabilidad y estadística general
**Sección**: Probabilidad y estadística
**Dificultad**: Varía entre "easy", "medium" y "hard" (5 easy, 7 medium, 3 hard)
**Set ID**: 1

REQUISITOS:
1. Cada pregunta debe tener 4 opciones (a, b, c, d)
2. Solo UNA opción es correcta
3. Las opciones incorrectas deben ser plausibles (distractores educativos)
4. Incluir explicación detallada de por qué la respuesta es correcta
5. Agregar 2-4 tags relevantes
6. **Usa LaTeX** para fórmulas: `$P(A) = \\frac{casos\\ favorables}{casos\\ totales}$`
7. El formato debe ser EXACTAMENTE como el ejemplo abajo
8. Escapa barras: `\\frac`

CONTEXTO ADICIONAL:
- Incluye probabilidad simple, condicional, eventos independientes/dependientes, combinaciones, permutaciones
- Problemas contextualizados (dados, cartas, sorteos, etc.)
- Muestra cálculos en la explicación

FORMATO JSON REQUERIDO:
Retorna un array JSON con las 15 preguntas: [pregunta1, pregunta2, ...]

Cada pregunta debe tener esta estructura:
{
  "skill_id": 17,
  "set_id": 1,
  "difficulty": "medium",
  "stem": "[TEXTO del problema de probabilidad]",
  "options_json": [
    {"key": "a", "text": "$\\frac{1}{6}$", "image": null},
    {"key": "b", "text": "$\\frac{1}{3}$", "image": null},
    {"key": "c", "text": "$\\frac{1}{2}$", "image": null},
    {"key": "d", "text": "$\\frac{2}{3}$", "image": null}
  ],
  "correct_key": "[a/b/c/d]",
  "explanation": "[Explicación con cálculo: $$P = \\frac{2}{6} = \\frac{1}{3}$$]",
  "tags_json": ["tag1", "tag2", "tag3"],
  "source": "Generado EXANI 2026",
  "is_active": true
}

NO INCLUYAS NADA MÁS QUE EL JSON. Empieza tu respuesta con [ y termina con ], formatea la salida en formato JSON ```json .... ```
````

---

## Skill 18: Estadística inferencial

````
⚠️ IMPORTANTE: Retorna ÚNICAMENTE el array JSON. NO generes formularios, NO uses HTML, NO agregues explicaciones fuera del JSON. Tu respuesta debe iniciar con [ y terminar con ]

Eres un experto diseñador de preguntas tipo EXANI (examen de ingreso a educación superior en México).

Genera 15 preguntas completamente parseables en formato JSON para:

**Skill ID**: 18
**Skill**: Estadística inferencial
**Área**: Probabilidad y estadística general
**Sección**: Probabilidad y estadística
**Dificultad**: Varía entre "easy", "medium" y "hard" (5 easy, 7 medium, 3 hard)
**Set ID**: 1

REQUISITOS:
1. Cada pregunta debe tener 4 opciones (a, b, c, d)
2. Solo UNA opción es correcta
3. Las opciones incorrectas deben ser plausibles (distractores educativos)
4. Incluir explicación detallada de por qué la respuesta es correcta
5. Agregar 2-4 tags relevantes
6. **Usa LaTeX** si es necesario para fórmulas
7. El formato debe ser EXACTAMENTE como el ejemplo abajo

CONTEXTO ADICIONAL:
- Incluye muestras, población, intervalos de confianza, hipótesis (nivel básico)
- Conceptos introductorios de bachillerato
- Los problemas deben ser accesibles para nivel preparatoria

FORMATO JSON REQUERIDO:
Retorna un array JSON con las 15 preguntas: [pregunta1, pregunta2, ...]

Cada pregunta debe tener esta estructura:
{
  "skill_id": 18,
  "set_id": 1,
  "difficulty": "medium",
  "stem": "[TEXTO del problema]",
  "options_json": [
    {"key": "a", "text": "Opción A", "image": null},
    {"key": "b", "text": "Opción B", "image": null},
    {"key": "c", "text": "Opción C", "image": null},
    {"key": "d", "text": "Opción D", "image": null}
  ],
  "correct_key": "[a/b/c/d]",
  "explanation": "[Explicación detallada]",
  "tags_json": ["tag1", "tag2", "tag3"],
  "source": "Generado EXANI 2026",
  "is_active": true
}

NO INCLUYAS NADA MÁS QUE EL JSON. Empieza tu respuesta con [ y termina con ], formatea la salida en formato JSON ```json .... ```
````

---

## Skill 19: Proceso administrativo

````
⚠️ IMPORTANTE: Retorna ÚNICAMENTE el array JSON. NO generes formularios, NO uses HTML, NO agregues explicaciones fuera del JSON. Tu respuesta debe iniciar con [ y terminar con ]

Eres un experto diseñador de preguntas tipo EXANI (examen de ingreso a educación superior en México).

Genera 15 preguntas completamente parseables en formato JSON para:

**Skill ID**: 19
**Skill**: Proceso administrativo
**Área**: Administración general
**Sección**: Administración
**Dificultad**: Varía entre "easy", "medium" y "hard" (5 easy, 7 medium, 3 hard)
**Set ID**: 1

REQUISITOS:
1. Cada pregunta debe tener 4 opciones (a, b, c, d)
2. Solo UNA opción es correcta
3. Las opciones incorrectas deben ser plausibles (distractores educativos)
4. Incluir explicación detallada de por qué la respuesta es correcta
5. Agregar 2-4 tags relevantes
6. El formato debe ser EXACTAMENTE como el ejemplo abajo

CONTEXTO ADICIONAL:
- Incluye planeación, organización, dirección, control
- Conceptos fundamentales de administración
- Aplicaciones prácticas en organizaciones

FORMATO JSON REQUERIDO:
Retorna un array JSON con las 15 preguntas: [pregunta1, pregunta2, ...]

Cada pregunta debe tener esta estructura:
{
  "skill_id": 19,
  "set_id": 1,
  "difficulty": "medium",
  "stem": "[TEXTO sobre proceso administrativo]",
  "options_json": [
    {"key": "a", "text": "Opción A", "image": null},
    {"key": "b", "text": "Opción B", "image": null},
    {"key": "c", "text": "Opción C", "image": null},
    {"key": "d", "text": "Opción D", "image": null}
  ],
  "correct_key": "[a/b/c/d]",
  "explanation": "[Explicación detallada]",
  "tags_json": ["tag1", "tag2", "tag3"],
  "source": "Generado EXANI 2026",
  "is_active": true
}

NO INCLUYAS NADA MÁS QUE EL JSON. Empieza tu respuesta con [ y termina con ], formatea la salida en formato JSON ```json .... ```
````

---

## Skill 20: Teoría de organizaciones

````
⚠️ IMPORTANTE: Retorna ÚNICAMENTE el array JSON. NO generes formularios, NO uses HTML, NO agregues explicaciones fuera del JSON. Tu respuesta debe iniciar con [ y terminar con ]

Eres un experto diseñador de preguntas tipo EXANI (examen de ingreso a educación superior en México).

Genera 15 preguntas completamente parseables en formato JSON para:

**Skill ID**: 20
**Skill**: Teoría de organizaciones
**Área**: Administración general
**Sección**: Administración
**Dificultad**: Varía entre "easy", "medium" y "hard" (5 easy, 7 medium, 3 hard)
**Set ID**: 1

REQUISITOS:
1. Cada pregunta debe tener 4 opciones (a, b, c, d)
2. Solo UNA opción es correcta
3. Las opciones incorrectas deben ser plausibles (distractores educativos)
4. Incluir explicación detallada de por qué la respuesta es correcta
5. Agregar 2-4 tags relevantes
6. El formato debe ser EXACTAMENTE como el ejemplo abajo

CONTEXTO ADICIONAL:
- Incluye teorías clásicas y modernas de administración
- Estructuras organizacionales, cultura organizacional
- Conceptos fundamentales de nivel bachillerato

FORMATO JSON REQUERIDO:
Retorna un array JSON con las 15 preguntas: [pregunta1, pregunta2, ...]

Cada pregunta debe tener esta estructura:
{
  "skill_id": 20,
  "set_id": 1,
  "difficulty": "medium",
  "stem": "[TEXTO sobre teoría organizacional]",
  "options_json": [
    {"key": "a", "text": "Opción A", "image": null},
    {"key": "b", "text": "Opción B", "image": null},
    {"key": "c", "text": "Opción C", "image": null},
    {"key": "d", "text": "Opción D", "image": null}
  ],
  "correct_key": "[a/b/c/d]",
  "explanation": "[Explicación detallada]",
  "tags_json": ["tag1", "tag2", "tag3"],
  "source": "Generado EXANI 2026",
  "is_active": true
}

NO INCLUYAS NADA MÁS QUE EL JSON. Empieza tu respuesta con [ y termina con ], formatea la salida en formato JSON ```json .... ```
````

---

## Skill 21: Recursos humanos

````
⚠️ IMPORTANTE: Retorna ÚNICAMENTE el array JSON. NO generes formularios, NO uses HTML, NO agregues explicaciones fuera del JSON. Tu respuesta debe iniciar con [ y terminar con ]

Eres un experto diseñador de preguntas tipo EXANI (examen de ingreso a educación superior en México).

Genera 15 preguntas completamente parseables en formato JSON para:

**Skill ID**: 21
**Skill**: Recursos humanos
**Área**: Administración general
**Sección**: Administración
**Dificultad**: Varía entre "easy", "medium" y "hard" (5 easy, 7 medium, 3 hard)
**Set ID**: 1

REQUISITOS:
1. Cada pregunta debe tener 4 opciones (a, b, c, d)
2. Solo UNA opción es correcta
3. Las opciones incorrectas deben ser plausibles (distractores educativos)
4. Incluir explicación detallada de por qué la respuesta es correcta
5. Agregar 2-4 tags relevantes
6. El formato debe ser EXACTAMENTE como el ejemplo abajo

CONTEXTO ADICIONAL:
- Incluye reclutamiento, selección, capacitación, evaluación de desempeño, motivación
- Conceptos básicos de gestión de RH
- Aplicaciones prácticas

FORMATO JSON REQUERIDO:
Retorna un array JSON con las 15 preguntas: [pregunta1, pregunta2, ...]

Cada pregunta debe tener esta estructura:
{
  "skill_id": 21,
  "set_id": 1,
  "difficulty": "medium",
  "stem": "[TEXTO sobre recursos humanos]",
  "options_json": [
    {"key": "a", "text": "Opción A", "image": null},
    {"key": "b", "text": "Opción B", "image": null},
    {"key": "c", "text": "Opción C", "image": null},
    {"key": "d", "text": "Opción D", "image": null}
  ],
  "correct_key": "[a/b/c/d]",
  "explanation": "[Explicación detallada]",
  "tags_json": ["tag1", "tag2", "tag3"],
  "source": "Generado EXANI 2026",
  "is_active": true
}

NO INCLUYAS NADA MÁS QUE EL JSON. Empieza tu respuesta con [ y termina con ], formatea la salida en formato JSON ```json .... ```
````

---

## Skill 22: Reading comprehension

````
⚠️ IMPORTANTE: Retorna ÚNICAMENTE el array JSON. NO generes formularios, NO uses HTML, NO agregues explicaciones fuera del JSON. Tu respuesta debe iniciar con [ y terminar con ]

Eres un experto diseñador de preguntas tipo EXANI (examen de ingreso a educación superior en México).

Genera 15 preguntas completamente parseables en formato JSON para:

**Skill ID**: 22
**Skill**: Reading comprehension
**Área**: Inglés nivel B1
**Sección**: Inglés (diagnóstico)
**Dificultad**: Varía entre "easy", "medium" y "hard" (5 easy, 7 medium, 3 hard)
**Set ID**: 1

REQUISITOS:
1. Cada pregunta debe tener 4 opciones (a, b, c, d)
2. Solo UNA opción es correcta
3. Las opciones incorrectas deben ser plausibles (distractores educativos)
4. Incluir explicación detallada de por qué la respuesta es correcta
5. Agregar 2-4 tags relevantes
6. **Las preguntas deben estar EN INGLÉS** (nivel B1)
7. El formato debe ser EXACTAMENTE como el ejemplo abajo

CONTEXTO ADICIONAL:
- Incluye textos cortos en inglés (3-5 líneas)
- Nivel B1 del Marco Común Europeo
- Las preguntas evalúan comprensión lectora en inglés

FORMATO JSON REQUERIDO:
Retorna un array JSON con las 15 preguntas: [pregunta1, pregunta2, ...]

Cada pregunta debe tener esta estructura:
{
  "skill_id": 22,
  "set_id": 1,
  "difficulty": "medium",
  "stem": "[ENGLISH TEXT with reading passage and question]",
  "options_json": [
    {"key": "a", "text": "Option A in English", "image": null},
    {"key": "b", "text": "Option B in English", "image": null},
    {"key": "c", "text": "Option C in English", "image": null},
    {"key": "d", "text": "Option D in English", "image": null}
  ],
  "correct_key": "[a/b/c/d]",
  "explanation": "[Detailed explanation in Spanish]",
  "tags_json": ["english", "reading", "b1"],
  "source": "Generado EXANI 2026",
  "is_active": true
}

NO INCLUYAS NADA MÁS QUE EL JSON. Empieza tu respuesta con [ y termina con ], formatea la salida en formato JSON ```json .... ```
````

---

## Skill 23: Grammar

````
⚠️ IMPORTANTE: Retorna ÚNICAMENTE el array JSON. NO generes formularios, NO uses HTML, NO agregues explicaciones fuera del JSON. Tu respuesta debe iniciar con [ y terminar con ]

Eres un experto diseñador de preguntas tipo EXANI (examen de ingreso a educación superior en México).

Genera 15 preguntas completamente parseables en formato JSON para:

**Skill ID**: 23
**Skill**: Grammar
**Área**: Inglés nivel B1
**Sección**: Inglés (diagnóstico)
**Dificultad**: Varía entre "easy", "medium" y "hard" (5 easy, 7 medium, 3 hard)
**Set ID**: 1

REQUISITOS:
1. Cada pregunta debe tener 4 opciones (a, b, c, d)
2. Solo UNA opción es correcta
3. Las opciones incorrectas deben ser plausibles (distractores educativos)
4. Incluir explicación detallada de por qué la respuesta es correcta
5. Agregar 2-4 tags relevantes
6. **Las preguntas deben estar EN INGLÉS** (nivel B1)
7. El formato debe ser EXACTAMENTE como el ejemplo abajo

CONTEXTO ADICIONAL:
- Incluye tiempos verbales, preposiciones, condicionales, voz pasiva, reported speech
- Nivel B1 del Marco Común Europeo
- Las preguntas evalúan gramática inglesa

FORMATO JSON REQUERIDO:
Retorna un array JSON con las 15 preguntas: [pregunta1, pregunta2, ...]

Cada pregunta debe tener esta estructura:
{
  "skill_id": 23,
  "set_id": 1,
  "difficulty": "medium",
  "stem": "[ENGLISH grammar question]",
  "options_json": [
    {"key": "a", "text": "Option A", "image": null},
    {"key": "b", "text": "Option B", "image": null},
    {"key": "c", "text": "Option C", "image": null},
    {"key": "d", "text": "Option D", "image": null}
  ],
  "correct_key": "[a/b/c/d]",
  "explanation": "[Explicación en español de la regla gramatical]",
  "tags_json": ["english", "grammar", "b1"],
  "source": "Generado EXANI 2026",
  "is_active": true
}

NO INCLUYAS NADA MÁS QUE EL JSON. Empieza tu respuesta con [ y termina con ], formatea la salida en formato JSON ```json .... ```
````

---

## Skill 24: Vocabulary

````
⚠️ IMPORTANTE: Retorna ÚNICAMENTE el array JSON. NO generes formularios, NO uses HTML, NO agregues explicaciones fuera del JSON. Tu respuesta debe iniciar con [ y terminar con ]

Eres un experto diseñador de preguntas tipo EXANI (examen de ingreso a educación superior en México).

Genera 15 preguntas completamente parseables en formato JSON para:

**Skill ID**: 24
**Skill**: Vocabulary
**Área**: Inglés nivel B1
**Sección**: Inglés (diagnóstico)
**Dificultad**: Varía entre "easy", "medium" y "hard" (5 easy, 7 medium, 3 hard)
**Set ID**: 1

REQUISITOS:
1. Cada pregunta debe tener 4 opciones (a, b, c, d)
2. Solo UNA opción es correcta
3. Las opciones incorrectas deben ser plausibles (distractores educativos)
4. Incluir explicación detallada de por qué la respuesta es correcta
5. Agregar 2-4 tags relevantes
6. **Las preguntas deben estar EN INGLÉS** (nivel B1)
7. El formato debe ser EXACTAMENTE como el ejemplo abajo

CONTEXTO ADICIONAL:
- Incluye sinónimos, antónimos, vocabulario en contexto
- Nivel B1 del Marco Común Europeo
- Las preguntas evalúan vocabulario inglés

FORMATO JSON REQUERIDO:
Retorna un array JSON con las 15 preguntas: [pregunta1, pregunta2, ...]

Cada pregunta debe tener esta estructura:
{
  "skill_id": 24,
  "set_id": 1,
  "difficulty": "medium",
  "stem": "[ENGLISH vocabulary question]",
  "options_json": [
    {"key": "a", "text": "Word/phrase A", "image": null},
    {"key": "b", "text": "Word/phrase B", "image": null},
    {"key": "c", "text": "Word/phrase C", "image": null},
    {"key": "d", "text": "Word/phrase D", "image": null}
  ],
  "correct_key": "[a/b/c/d]",
  "explanation": "[Explicación en español]",
  "tags_json": ["english", "vocabulary", "b1"],
  "source": "Generado EXANI 2026",
  "is_active": true
}

NO INCLUYAS NADA MÁS QUE EL JSON. Empieza tu respuesta con [ y termina con ], formatea la salida en formato JSON ```json .... ```
````

---

## Skill 25: Aritmética (duplicado)

````
⚠️ IMPORTANTE: Retorna ÚNICAMENTE el array JSON. NO generes formularios, NO uses HTML, NO agregues explicaciones fuera del JSON. Tu respuesta debe iniciar con [ y terminar con ]

Eres un experto diseñador de preguntas tipo EXANI (examen de ingreso a educación superior en México).

Genera 15 preguntas completamente parseables en formato JSON para:

**Skill ID**: 25
**Skill**: Aritmética
**Área**: Pensamiento matemático general
**Sección**: Pensamiento matemático
**Dificultad**: Varía entre "easy", "medium" y "hard" (5 easy, 7 medium, 3 hard)
**Set ID**: 1

REQUISITOS:
1. Cada pregunta debe tener 4 opciones (a, b, c, d)
2. Solo UNA opción es correcta
3. Las opciones incorrectas deben ser plausibles (distractores educativos)
4. Incluir explicación detallada de por qué la respuesta es correcta
5. Agregar 2-4 tags relevantes
6. **USA NOTACIÓN LaTeX** para todas las fórmulas: `$formula$` inline, `$$formula$$` bloque
7. Escapa barras en JSON: `\\frac`, `\\sqrt`, `\\times`
8. El formato debe ser EXACTAMENTE como el ejemplo abajo

CONTEXTO ADICIONAL:
- Incluye operaciones básicas, fracciones, decimales, porcentajes
- Problemas contextualizados
- Muestra operaciones en la explicación usando LaTeX

FORMATO JSON REQUERIDO:
Retorna SOLO un array JSON con las 15 preguntas: [pregunta1, pregunta2, ...]

Cada pregunta debe tener esta estructura:
{
  "skill_id": 25,
  "set_id": 1,
  "difficulty": "medium",
  "stem": "[TEXTO con LaTeX si aplica]",
  "options_json": [
    {"key": "a", "text": "$opción$", "image": null},
    {"key": "b", "text": "$opción$", "image": null},
    {"key": "c", "text": "$opción$", "image": null},
    {"key": "d", "text": "$opción$", "image": null}
  ],
  "correct_key": "[a/b/c/d]",
  "explanation": "[Explicación con LaTeX]",
  "tags_json": ["tag1", "tag2", "tag3"],
  "source": "Generado EXANI 2026",
  "is_active": true
}

NO INCLUYAS NADA MÁS QUE EL JSON. Empieza tu respuesta con [ y termina con ], formatea la salida en formato JSON ```json .... ```
````

---

## Skill 26: Álgebra básica

````
⚠️ IMPORTANTE: Retorna ÚNICAMENTE el array JSON. NO generes formularios, NO uses HTML, NO agregues explicaciones fuera del JSON. Tu respuesta debe iniciar con [ y terminar con ]

Eres un experto diseñador de preguntas tipo EXANI (examen de ingreso a educación superior en México).

Genera 15 preguntas completamente parseables en formato JSON para:

**Skill ID**: 26
**Skill**: Álgebra básica
**Área**: Pensamiento matemático general
**Sección**: Pensamiento matemático
**Dificultad**: Varía entre "easy", "medium" y "hard" (5 easy, 7 medium, 3 hard)
**Set ID**: 1

REQUISITOS:
1. Cada pregunta debe tener 4 opciones (a, b, c, d)
2. Solo UNA opción es correcta
3. Las opciones incorrectas deben ser plausibles
4. Incluir explicación detallada
5. Agregar 2-4 tags relevantes
6. **USA NOTACIÓN LaTeX**: `$x^2 + 5x - 3$`
7. Escapa barras: `\\frac`, `\\sqrt`

CONTEXTO ADICIONAL:
- Ecuaciones lineales básicas, simplificación de expresiones
- Problemas de nivel básico de secundaria/preparatoria
- Muestra pasos algebraicos con LaTeX

FORMATO JSON REQUERIDO:
{
  "skill_id": 26,
  "set_id": 1,
  "difficulty": "medium",
  "stem": "[Ecuación o problema con LaTeX]",
  "options_json": [
    {"key": "a", "text": "$x = valor$", "image": null},
    {"key": "b", "text": "$x = valor$", "image": null},
    {"key": "c", "text": "$x = valor$", "image": null},
    {"key": "d", "text": "$x = valor$", "image": null}
  ],
  "correct_key": "[a/b/c/d]",
  "explanation": "[Pasos con LaTeX]",
  "tags_json": ["algebra", "ecuaciones"],
  "source": "Generado EXANI 2026",
  "is_active": true
}

NO INCLUYAS NADA MÁS QUE EL JSON. Empieza tu respuesta con [ y termina con ], formatea la salida en formato JSON ```json .... ```
````

---

## Skill 27: Geometría básica

````
⚠️ IMPORTANTE: Retorna ÚNICAMENTE el array JSON. NO generes formularios, NO uses HTML, NO agregues explicaciones fuera del JSON. Tu respuesta debe iniciar con [ y terminar con ]

Eres un experto diseñador de preguntas tipo EXANI (examen de ingreso a educación en México).

Genera 15 preguntas completamente parseables en formato JSON para:

**Skill ID**: 27
**Skill**: Geometría básica
**Área**: Pensamiento matemático general
**Sección**: Pensamiento matemático
**Dificultad**: Varía entre "easy", "medium" y "hard" (5 easy, 7 medium, 3 hard)
**Set ID**: 1

REQUISITOS:
1. Cada pregunta debe tener 4 opciones (a, b, c, d)
2. Solo UNA opción es correcta
3. Las opciones incorrectas deben ser plausibles
4. Incluir explicación detallada
5. Agregar 2-4 tags relevantes
6. **USA NOTACIÓN LaTeX**: `$A = \\pi r^2$`
7. Escapa barras: `\\pi`, `\\times`

CONTEXTO ADICIONAL:
- Áreas y perímetros básicos, ángulos, figuras planas simples
- Nivel básico de secundaria
- Muestra fórmulas con LaTeX

FORMATO JSON REQUERIDO:
{
  "skill_id": 27,
  "set_id": 1,
  "difficulty": "medium",
  "stem": "[Problema geométrico]",
  "options_json": [
    {"key": "a", "text": "$valor$ unidades", "image": null},
    {"key": "b", "text": "$valor$ unidades", "image": null},
    {"key": "c", "text": "$valor$ unidades", "image": null},
    {"key": "d", "text": "$valor$ unidades", "image": null}
  ],
  "correct_key": "[a/b/c/d]",
  "explanation": "[Fórmulas con LaTeX]",
  "tags_json": ["geometria", "areas"],
  "source": "Generado EXANI 2026",
  "is_active": true
}

NO INCLUYAS NADA MÁS QUE EL JSON. Empieza tu respuesta con [ y termina con ], formatea la salida en formato JSON ```json .... ```
````

---

## Skill 28: Método científico

````
⚠️ IMPORTANTE: Retorna ÚNICAMENTE el array JSON. NO generes formularios, NO uses HTML, NO agregues explicaciones fuera del JSON. Tu respuesta debe iniciar con [ y terminar con ]

Eres un experto diseñador de preguntas tipo EXANI (examen de ingreso a educación en México).

Genera 15 preguntas completamente parseables en formato JSON para:

**Skill ID**: 28
**Skill**: Método científico
**Área**: Pensamiento científico general
**Sección**: Pensamiento científico
**Dificultad**: Varía entre "easy", "medium" y "hard" (5 easy, 7 medium, 3 hard)
**Set ID**: 1

REQUISITOS:
1. Cada pregunta debe tener 4 opciones (a, b, c, d)
2. Solo UNA opción es correcta
3. Las opciones incorrectas deben ser plausibles
4. Incluir explicación detallada
5. Agregar 2-4 tags relevantes

CONTEXTO ADICIONAL:
- Pasos del método científico, hipótesis, experimentos, variables
- Nivel básico de bachillerato
- Aplicaciones prácticas del método científico

FORMATO JSON REQUERIDO:
{
  "skill_id": 28,
  "set_id": 1,
  "difficulty": "medium",
  "stem": "[Pregunta sobre método científico]",
  "options_json": [
    {"key": "a", "text": "Opción A", "image": null},
    {"key": "b", "text": "Opción B", "image": null},
    {"key": "c", "text": "Opción C", "image": null},
    {"key": "d", "text": "Opción D", "image": null}
  ],
  "correct_key": "[a/b/c/d]",
  "explanation": "[Explicación detallada]",
  "tags_json": ["metodo_cientifico", "ciencia"],
  "source": "Generado EXANI 2026",
  "is_active": true
}

NO INCLUYAS NADA MÁS QUE EL JSON. Empieza tu respuesta con [ y termina con ], formatea la salida en formato JSON ```json .... ```
````

---

## Skill 29: Biología básica

````
⚠️ IMPORTANTE: Retorna ÚNICAMENTE el array JSON. NO generes formularios, NO uses HTML, NO agregues explicaciones fuera del JSON. Tu respuesta debe iniciar con [ y terminar con ]

Eres un experto diseñador de preguntas tipo EXANI (examen de ingreso a educación en México).

Genera 15 preguntas completamente parseables en formato JSON para:

**Skill ID**: 29
**Skill**: Biología básica
**Área**: Pensamiento científico general
**Sección**: Pensamiento científico
**Dificultad**: Varía entre "easy", "medium" y "hard" (5 easy, 7 medium, 3 hard)
**Set ID**: 1

REQUISITOS:
1. Cada pregunta debe tener 4 opciones (a, b, c, d)
2. Solo UNA opción es correcta
3. Las opciones incorrectas deben ser plausibles
4. Incluir explicación detallada
5. Agregar 2-4 tags relevantes

CONTEXTO ADICIONAL:
- Células, tejidos, sistemas del cuerpo, fotosíntesis, respiración celular
- Conceptos básicos de bachillerato
- Aplicaciones en la vida cotidiana

FORMATO JSON REQUERIDO:
{
  "skill_id": 29,
  "set_id": 1,
  "difficulty": "medium",
  "stem": "[Pregunta de biología]",
  "options_json": [
    {"key": "a", "text": "Opción A", "image": null},
    {"key": "b", "text": "Opción B", "image": null},
    {"key": "c", "text": "Opción C", "image": null},
    {"key": "d", "text": "Opción D", "image": null}
  ],
  "correct_key": "[a/b/c/d]",
  "explanation": "[Explicación detallada]",
  "tags_json": ["biologia", "celulas"],
  "source": "Generado EXANI 2026",
  "is_active": true
}

NO INCLUYAS NADA MÁS QUE EL JSON. Empieza tu respuesta con [ y termina con ], formatea la salida en formato JSON ```json .... ```
````

---

## Skill 30: Física básica

````
⚠️ IMPORTANTE: Retorna ÚNICAMENTE el array JSON. NO generes formularios, NO uses HTML, NO agregues explicaciones fuera del JSON. Tu respuesta debe iniciar con [ y terminar con ]

Eres un experto diseñador de preguntas tipo EXANI (examen de ingreso a educación en México).

Genera 15 preguntas completamente parseables en formato JSON para:

**Skill ID**: 30
**Skill**: Física básica
**Área**: Pensamiento científico general
**Sección**: Pensamiento científico
**Dificultad**: Varía entre "easy", "medium" y "hard" (5 easy, 7 medium, 3 hard)
**Set ID**: 1

REQUISITOS:
1. Cada pregunta debe tener 4 opciones (a, b, c, d)
2. Solo UNA opción es correcta
3. Las opciones incorrectas deben ser plausibles
4. Incluir explicación detallada
5. Agregar 2-4 tags relevantes
6. **USA LaTeX** para fórmulas: `$v = \\frac{d}{t}$`, `$F = ma$`
7. Escapa barras: `\\frac`

CONTEXTO ADICIONAL:
- Movimiento, fuerzas, energía básica, trabajo
- Conceptos introductorios de física
- Problemas simples con cálculos básicos

FORMATO JSON REQUERIDO:
{
  "skill_id": 30,
  "set_id": 1,
  "difficulty": "medium",
  "stem": "[Problema de física con LaTeX]",
  "options_json": [
    {"key": "a", "text": "$valor$ unidades", "image": null},
    {"key": "b", "text": "$valor$ unidades", "image": null},
    {"key": "c", "text": "$valor$ unidades", "image": null},
    {"key": "d", "text": "$valor$ unidades", "image": null}
  ],
  "correct_key": "[a/b/c/d]",
  "explanation": "[Fórmulas con LaTeX]",
  "tags_json": ["fisica", "movimiento"],
  "source": "Generado EXANI 2026",
  "is_active": true
}

NO INCLUYAS NADA MÁS QUE EL JSON. Empieza tu respuesta con [ y termina con ], formatea la salida en formato JSON ```json .... ```
````

---

## Skill 31: Identificar idea principal (duplicado)

````
⚠️ IMPORTANTE: Retorna ÚNICAMENTE el array JSON. NO generes formularios, NO uses HTML, NO agregues explicaciones fuera del JSON. Tu respuesta debe iniciar con [ y terminar con ]

Eres un experto diseñador de preguntas tipo EXANI (examen de ingreso a educación en México).

Genera 15 preguntas completamente parseables en formato JSON para:

**Skill ID**: 31
**Skill**: Identificar idea principal
**Área**: Comprensión lectora general
**Sección**: Comprensión lectora
**Dificultad**: Varía entre "easy", "medium" y "hard" (5 easy, 7 medium, 3 hard)
**Set ID**: 1

REQUISITOS:
1. Cada pregunta debe tener 4 opciones (a, b, c, d)
2. Solo UNA opción es correcta
3. Las opciones incorrectas deben ser plausibles
4. Incluir explicación detallada
5. Agregar 2-4 tags relevantes

CONTEXTO ADICIONAL:
- Incluye fragmentos de texto de 3-5 líneas
- Textos variados: científicos, literarios, periodísticos
- Evalúa identificación de la idea central

FORMATO JSON REQUERIDO:
{
  "skill_id": 31,
  "set_id": 1,
  "difficulty": "medium",
  "stem": "[FRAGMENTO DE TEXTO]\n\n¿Cuál es la idea principal?",
  "options_json": [
    {"key": "a", "text": "Opción A", "image": null},
    {"key": "b", "text": "Opción B", "image": null},
    {"key": "c", "text": "Opción C", "image": null},
    {"key": "d", "text": "Opción D", "image": null}
  ],
  "correct_key": "[a/b/c/d]",
  "explanation": "[Explicación]",
  "tags_json": ["comprension", "idea_principal"],
  "source": "Generado EXANI 2026",
  "is_active": true
}

NO INCLUYAS NADA MÁS QUE EL JSON. Empieza tu respuesta con [ y termina con ], formatea la salida en formato JSON ```json .... ```
````

---

## Skill 32: Identificar detalles

````
⚠️ IMPORTANTE: Retorna ÚNICAMENTE el array JSON. NO generes formularios, NO uses HTML, NO agregues explicaciones fuera del JSON. Tu respuesta debe iniciar con [ y terminar con ]

Eres un experto diseñador de preguntas tipo EXANI (examen de ingreso a educación en México).

Genera 15 preguntas completamente parseables en formato JSON para:

**Skill ID**: 32
**Skill**: Identificar detalles
**Área**: Comprensión lectora general
**Sección**: Comprensión lectora
**Dificultad**: Varía entre "easy", "medium" y "hard" (5 easy, 7 medium, 3 hard)
**Set ID**: 1

REQUISITOS:
1. Cada pregunta debe tener 4 opciones (a, b, c, d)
2. Solo UNA opción es correcta
3. Las opciones incorrectas deben ser plausibles
4. Incluir explicación detallada
5. Agregar 2-4 tags relevantes

CONTEXTO ADICIONAL:
- Incluye fragmentos de texto con información específica
- Las preguntas deben evaluar comprensión de detalles concretos
- Textos variados

FORMATO JSON REQUERIDO:
{
  "skill_id": 32,
  "set_id": 1,
  "difficulty": "medium",
  "stem": "[FRAGMENTO]\n\nSegún el texto, ¿qué...?",
  "options_json": [
    {"key": "a", "text": "Opción A", "image": null},
    {"key": "b", "text": "Opción B", "image": null},
    {"key": "c", "text": "Opción C", "image": null},
    {"key": "d", "text": "Opción D", "image": null}
  ],
  "correct_key": "[a/b/c/d]",
  "explanation": "[Explicación]",
  "tags_json": ["comprension", "detalles"],
  "source": "Generado EXANI 2026",
  "is_active": true
}

NO INCLUYAS NADA MÁS QUE EL JSON. Empieza tu respuesta con [ y termina con ], formatea la salida en formato JSON ```json .... ```
````

---

## Skill 33: Vocabulario en contexto

````
⚠️ IMPORTANTE: Retorna ÚNICAMENTE el array JSON. NO generes formularios, NO uses HTML, NO agregues explicaciones fuera del JSON. Tu respuesta debe iniciar con [ y terminar con ]

Eres un experto diseñador de preguntas tipo EXANI (examen de ingreso a educación en México).

Genera 15 preguntas completamente parseables en formato JSON para:

**Skill ID**: 33
**Skill**: Vocabulario en contexto
**Área**: Comprensión lectora general
**Sección**: Comprensión lectora
**Dificultad**: Varía entre "easy", "medium" y "hard" (5 easy, 7 medium, 3 hard)
**Set ID**: 1

REQUISITOS:
1. Cada pregunta debe tener 4 opciones (a, b, c, d)
2. Solo UNA opción es correcta
3. Las opciones incorrectas deben ser plausibles
4. Incluir explicación detallada
5. Agregar 2-4 tags relevantes

CONTEXTO ADICIONAL:
- Incluye palabras en contexto para determinar su significado
- Evalúa comprensión de vocabulario según el contexto
- Usa sinónimos y definiciones contextuales

FORMATO JSON REQUERIDO:
{
  "skill_id": 33,
  "set_id": 1,
  "difficulty": "medium",
  "stem": "[TEXTO con palabra subrayada]\n\n¿Qué significa la palabra...?",
  "options_json": [
    {"key": "a", "text": "Sinónimo A", "image": null},
    {"key": "b", "text": "Sinónimo B", "image": null},
    {"key": "c", "text": "Sinónimo C", "image": null},
    {"key": "d", "text": "Sinónimo D", "image": null}
  ],
  "correct_key": "[a/b/c/d]",
  "explanation": "[Explicación del contexto]",
  "tags_json": ["vocabulario", "contexto"],
  "source": "Generado EXANI 2026",
  "is_active": true
}

NO INCLUYAS NADA MÁS QUE EL JSON. Empieza tu respuesta con [ y termina con ], formatea la salida en formato JSON ```json .... ```
````

---

## Skill 34: Ortografía básica

````
⚠️ IMPORTANTE: Retorna ÚNICAMENTE el array JSON. NO generes formularios, NO uses HTML, NO agregues explicaciones fuera del JSON. Tu respuesta debe iniciar con [ y terminar con ]

Eres un experto diseñador de preguntas tipo EXANI (examen de ingreso a educación en México).

Genera 15 preguntas completamente parseables en formato JSON para:

**Skill ID**: 34
**Skill**: Ortografía básica
**Área**: Redacción indirecta general
**Sección**: Redacción indirecta
**Dificultad**: Varía entre "easy", "medium" y "hard" (5 easy, 7 medium, 3 hard)
**Set ID**: 1

REQUISITOS:
1. Cada pregunta debe tener 4 opciones (a, b, c, d)
2. Solo UNA opción es correcta
3. Las opciones incorrectas deben ser plausibles
4. Incluir explicación detallada con regla ortográfica
5. Agregar 2-4 tags relevantes

CONTEXTO ADICIONAL:
- Reglas básicas: acentuación, uso de letras (b/v, c/s/z, h)
- Nivel básico de secundaria
- Errores comunes

FORMATO JSON REQUERIDO:
{
  "skill_id": 34,
  "set_id": 1,
  "difficulty": "medium",
  "stem": "¿Cuál palabra está escrita correctamente?",
  "options_json": [
    {"key": "a", "text": "palabra", "image": null},
    {"key": "b", "text": "palabra", "image": null},
    {"key": "c", "text": "palabra", "image": null},
    {"key": "d", "text": "palabra", "image": null}
  ],
  "correct_key": "[a/b/c/d]",
  "explanation": "[Regla ortográfica]",
  "tags_json": ["ortografia", "acentuacion"],
  "source": "Generado EXANI 2026",
  "is_active": true
}

NO INCLUYAS NADA MÁS QUE EL JSON. Empieza tu respuesta con [ y termina con ], formatea la salida en formato JSON ```json .... ```
````

---

## Skill 35: Puntuación

````
⚠️ IMPORTANTE: Retorna ÚNICAMENTE el array JSON. NO generes formularios, NO uses HTML, NO agregues explicaciones fuera del JSON. Tu respuesta debe iniciar con [ y terminar con ]

Eres un experto diseñador de preguntas tipo EXANI (examen de ingreso a educación en México).

Genera 15 preguntas completamente parseables en formato JSON para:

**Skill ID**: 35
**Skill**: Puntuación
**Área**: Redacción indirecta general
**Sección**: Redacción indirecta
**Dificultad**: Varía entre "easy", "medium" y "hard" (5 easy, 7 medium, 3 hard)
**Set ID**: 1

REQUISITOS:
1. Cada pregunta debe tener 4 opciones (a, b, c, d)
2. Solo UNA opción es correcta
3. Las opciones incorrectas deben ser plausibles
4. Incluir explicación detallada con regla de puntuación
5. Agregar 2-4 tags relevantes

CONTEXTO ADICIONAL:
- Uso de comas, puntos, punto y coma, dos puntos
- Reglas básicas de puntuación
- Ejemplos prácticos

FORMATO JSON REQUERIDO:
{
  "skill_id": 35,
  "set_id": 1,
  "difficulty": "medium",
  "stem": "¿Qué oración está puntuada correctamente?",
  "options_json": [
    {"key": "a", "text": "Oración con puntuación", "image": null},
    {"key": "b", "text": "Oración con puntuación", "image": null},
    {"key": "c", "text": "Oración con puntuación", "image": null},
    {"key": "d", "text": "Oración con puntuación", "image": null}
  ],
  "correct_key": "[a/b/c/d]",
  "explanation": "[Regla de puntuación]",
  "tags_json": ["puntuacion", "redaccion"],
  "source": "Generado EXANI 2026",
  "is_active": true
}

NO INCLUYAS NADA MÁS QUE EL JSON. Empieza tu respuesta con [ y termina con ], formatea la salida en formato JSON ```json .... ```
````

---

## Skill 36: Coherencia

````
⚠️ IMPORTANTE: Retorna ÚNICAMENTE el array JSON. NO generes formularios, NO uses HTML, NO agregues explicaciones fuera del JSON. Tu respuesta debe iniciar con [ y terminar con ]

Eres un experto diseñador de preguntas tipo EXANI (examen de ingreso a educación en México).

Genera 15 preguntas completamente parseables en formato JSON para:

**Skill ID**: 36
**Skill**: Coherencia
**Área**: Redacción indirecta general
**Sección**: Redacción indirecta
**Dificultad**: Varía entre "easy", "medium" y "hard" (5 easy, 7 medium, 3 hard)
**Set ID**: 1

REQUISITOS:
1. Cada pregunta debe tener 4 opciones (a, b, c, d)
2. Solo UNA opción es correcta
3. Las opciones incorrectas deben ser plausibles
4. Incluir explicación detallada
5. Agregar 2-4 tags relevantes

CONTEXTO ADICIONAL:
- Secuencia lógica de ideas
- Continuidad temática
- Orden de oraciones en párrafos

FORMATO JSON REQUERIDO:
{
  "skill_id": 36,
  "set_id": 1,
  "difficulty": "medium",
  "stem": "¿Qué oración mantiene la coherencia del texto?",
  "options_json": [
    {"key": "a", "text": "Oración A", "image": null},
    {"key": "b", "text": "Oración B", "image": null},
    {"key": "c", "text": "Oración C", "image": null},
    {"key": "d", "text": "Oración D", "image": null}
  ],
  "correct_key": "[a/b/c/d]",
  "explanation": "[Explicación de coherencia]",
  "tags_json": ["coherencia", "redaccion"],
  "source": "Generado EXANI 2026",
  "is_active": true
}

NO INCLUYAS NADA MÁS QUE EL JSON. Empieza tu respuesta con [ y termina con ], formatea la salida en formato JSON ```json .... ```
````

---

## Skill 37: Reading A2

````
⚠️ IMPORTANTE: Retorna ÚNICAMENTE el array JSON. NO generes formularios, NO uses HTML, NO agregues explicaciones fuera del JSON. Tu respuesta debe iniciar con [ y terminar con ]

Eres un experto diseñador de preguntas tipo EXANI (examen de ingreso a educación en México).

Genera 15 preguntas completamente parseables en formato JSON para:

**Skill ID**: 37
**Skill**: Reading A2
**Área**: Inglés nivel A2
**Sección**: Inglés (diagnóstico)
**Dificultad**: Varía entre "easy", "medium" y "hard" (5 easy, 7 medium, 3 hard)
**Set ID**: 1

REQUISITOS:
1. Cada pregunta debe tener 4 opciones (a, b, c, d)
2. Solo UNA opción es correcta
3. **Las preguntas deben estar EN INGLÉS** (nivel A2)
4. Incluir explicación en español
5. Agregar 2-4 tags relevantes

CONTEXTO ADICIONAL:
- Textos simples en inglés (2-4 líneas)
- Nivel A2 del Marco Común Europeo
- Vocabulario y gramática básica

FORMATO JSON REQUERIDO:
{
  "skill_id": 37,
  "set_id": 1,
  "difficulty": "medium",
  "stem": "[SIMPLE ENGLISH TEXT]\n\nWhat is the main idea?",
  "options_json": [
    {"key": "a", "text": "Option A in English", "image": null},
    {"key": "b", "text": "Option B in English", "image": null},
    {"key": "c", "text": "Option C in English", "image": null},
    {"key": "d", "text": "Option D in English", "image": null}
  ],
  "correct_key": "[a/b/c/d]",
  "explanation": "[Explicación en español]",
  "tags_json": ["english", "reading", "a2"],
  "source": "Generado EXANI 2026",
  "is_active": true
}

NO INCLUYAS NADA MÁS QUE EL JSON. Empieza tu respuesta con [ y termina con ], formatea la salida en formato JSON ```json .... ```
````

---

## Skill 38: Grammar A2

````
⚠️ IMPORTANTE: Retorna ÚNICAMENTE el array JSON. NO generes formularios, NO uses HTML, NO agregues explicaciones fuera del JSON. Tu respuesta debe iniciar con [ y terminar con ]

Eres un experto diseñador de preguntas tipo EXANI (examen de ingreso a educación en México).

Genera 15 preguntas completamente parseables en formato JSON para:

**Skill ID**: 38
**Skill**: Grammar A2
**Área**: Inglés nivel A2
**Sección**: Inglés (diagnóstico)
**Dificultad**: Varía entre "easy", "medium" y "hard" (5 easy, 7 medium, 3 hard)
**Set ID**: 1

REQUISITOS:
1. Cada pregunta debe tener 4 opciones (a, b, c, d)
2. Solo UNA opción es correcta
3. **Las preguntas deben estar EN INGLÉS** (nivel A2)
4. Incluir explicación en español
5. Agregar 2-4 tags relevantes

CONTEXTO ADICIONAL:
- Gramática básica: present simple, past simple, preposiciones básicas
- Nivel A2 del Marco Común Europeo
- Estructuras simples

FORMATO JSON REQUERIDO:
{
  "skill_id": 38,
  "set_id": 1,
  "difficulty": "medium",
  "stem": "Choose the correct option: She ___ to school every day.",
  "options_json": [
    {"key": "a", "text": "go", "image": null},
    {"key": "b", "text": "goes", "image": null},
    {"key": "c", "text": "going", "image": null},
    {"key": "d", "text": "gone", "image": null}
  ],
  "correct_key": "[a/b/c/d]",
  "explanation": "[Explicación en español]",
  "tags_json": ["english", "grammar", "a2"],
  "source": "Generado EXANI 2026",
  "is_active": true
}

NO INCLUYAS NADA MÁS QUE EL JSON. Empieza tu respuesta con [ y termina con ], formatea la salida en formato JSON ```json .... ```
````

---

## Skill 39: Vocabulary A2

````
⚠️ IMPORTANTE: Retorna ÚNICAMENTE el array JSON. NO generes formularios, NO uses HTML, NO agregues explicaciones fuera del JSON. Tu respuesta debe iniciar con [ y terminar con ]

Eres un experto diseñador de preguntas tipo EXANI (examen de ingreso a educación en México).

Genera 15 preguntas completamente parseables en formato JSON para:

**Skill ID**: 39
**Skill**: Vocabulary A2
**Área**: Inglés nivel A2
**Sección**: Inglés (diagnóstico)
**Dificultad**: Varía entre "easy", "medium" y "hard" (5 easy, 7 medium, 3 hard)
**Set ID**: 1

REQUISITOS:
1. Cada pregunta debe tener 4 opciones (a, b, c, d)
2. Solo UNA opción es correcta
3. **Las preguntas deben estar EN INGLÉS** (nivel A2)
4. Incluir explicación en español
5. Agregar 2-4 tags relevantes

CONTEXTO ADICIONAL:
- Vocabulario básico cotidiano
- Nivel A2 del Marco Común Europeo
- Palabras de uso común

FORMATO JSON REQUERIDO:
{
  "skill_id": 39,
  "set_id": 1,
  "difficulty": "medium",
  "stem": "What is the opposite of 'big'?",
  "options_json": [
    {"key": "a", "text": "small", "image": null},
    {"key": "b", "text": "large", "image": null},
    {"key": "c", "text": "huge", "image": null},
    {"key": "d", "text": "tall", "image": null}
  ],
  "correct_key": "[a/b/c/d]",
  "explanation": "[Explicación en español]",
  "tags_json": ["english", "vocabulary", "a2"],
  "source": "Generado EXANI 2026",
  "is_active": true
}

NO INCLUYAS NADA MÁS QUE EL JSON. Empieza tu respuesta con [ y termina con ], formatea la salida en formato JSON ```json .... ```
````

---

**NOTA**: Los skills 25-39 parecen ser duplicados o de otros exámenes. Si necesitas prompts para ellos, avísame y los genero también.

---

## Instrucciones de Uso

1. **Copia el prompt del skill** que quieres generar
2. **Pégalo en ChatGPT o Claude**
3. **Revisa el JSON generado** - debe ser parseable
4. **Copia el array JSON completo**
5. **Ve a tu backoffice** → Questions → Importar
6. **Pega el JSON** en el textarea
7. **Valida** → **Preview** → **Importar**
8. ✅ ¡Listo!

## Progreso

- ✅ Skill 1: Identificar idea principal (completado)
- ✅ Skill 2: Hacer inferencias (en proceso - ya tienes el prompt)
- ✅ Skill 3-24: Listos para generar (prompts arriba)
- ✅ Skill 25-39: Listos para generar (prompts arriba)

**Total: 39 skills con prompts individualizados**

## 📊 Resumen de Skills por Categoría

### Comprensión Lectora (5 skills)

- Skills: 1, 2, 3, 31, 32, 33

### Redacción (6 skills)

- Skills: 4, 5, 6, 34, 35, 36

### Matemáticas (6 skills - con LaTeX)

- Skills: 7, 8, 9, 25, 26, 27

### Física (4 skills - con LaTeX)

- Skills: 10, 11, 12, 30

### Química (3 skills - con LaTeX)

- Skills: 13, 14, 15

### Estadística (3 skills - con LaTeX)

- Skills: 16, 17, 18

### Biología y Ciencias (2 skills)

- Skills: 28, 29

### Administración (3 skills)

- Skills: 19, 20, 21

### Inglés B1 (3 skills - en inglés)

- Skills: 22, 23, 24

### Inglés A2 (3 skills - en inglés)

- Skills: 37, 38, 39

---

## ⚠️ Recordatorio para Google Gemini / Claude / ChatGPT

Si la IA te genera:

- ❌ Formularios interactivos
- ❌ Código HTML
- ❌ Botones o elementos visuales
- ❌ Explicaciones fuera del JSON

**Copia y pega esto al inicio de tu prompt:**

```
IMPORTANTE: Tu respuesta debe contener ÚNICAMENTE el array JSON.
NO generes formularios HTML.
NO agregues explicaciones adicionales.
NO uses markdown code blocks más allá del JSON.
La primera línea de tu respuesta debe ser: [
La última línea de tu respuesta debe ser: ]
```
