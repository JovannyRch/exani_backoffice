#!/usr/bin/env node

/**
 * Script para importar preguntas desde un archivo JSON a Supabase
 *
 * Uso:
 *   node scripts/import-questions.js questions.json
 *
 * El archivo questions.json debe contener un array de objetos con esta estructura:
 * [
 *   {
 *     "skill_id": 1,
 *     "set_id": 1,
 *     "difficulty": "medium",
 *     "stem": "Texto de la pregunta",
 *     "options_json": [...],
 *     "correct_key": "b",
 *     "explanation": "Explicación",
 *     "tags_json": ["tag1", "tag2"],
 *     "source": "Fuente",
 *     "is_active": true
 *   }
 * ]
 */

const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");
const path = require("path");

// Configuración de Supabase (carga desde .env.local si existe)
const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://quicsqnemgdvzmldalcq.supabase.co";
const SUPABASE_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "sb_publishable_AUvnD8jXNN5HoCzUHf0i-g_ziZ7Lp3L";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Colores para consola
const colors = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  cyan: "\x1b[36m",
};

function log(color, message) {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function validateQuestion(question, index) {
  const errors = [];

  if (!question.skill_id) errors.push(`skill_id es requerido`);
  if (!question.set_id) errors.push(`set_id es requerido`);
  if (!question.stem || question.stem.trim() === "")
    errors.push(`stem no puede estar vacío`);
  if (!question.options_json || !Array.isArray(question.options_json)) {
    errors.push(`options_json debe ser un array`);
  } else if (question.options_json.length !== 4) {
    errors.push(`options_json debe tener exactamente 4 opciones`);
  }
  if (
    !question.correct_key ||
    !["a", "b", "c", "d"].includes(question.correct_key)
  ) {
    errors.push(`correct_key debe ser a, b, c o d`);
  }
  if (!["easy", "medium", "hard"].includes(question.difficulty)) {
    errors.push(`difficulty debe ser easy, medium o hard`);
  }

  if (errors.length > 0) {
    log("red", `\n❌ Error en pregunta #${index + 1}:`);
    errors.forEach((err) => log("red", `   - ${err}`));
    return false;
  }

  return true;
}

async function importQuestions(filePath) {
  log("cyan", "\n🚀 Iniciando importación de preguntas...\n");

  // Verificar que el archivo existe
  if (!fs.existsSync(filePath)) {
    log("red", `❌ Error: No se encontró el archivo ${filePath}`);
    process.exit(1);
  }

  // Leer y parsear el JSON
  let questions;
  try {
    const fileContent = fs.readFileSync(filePath, "utf-8");
    questions = JSON.parse(fileContent);
  } catch (error) {
    log("red", `❌ Error al leer o parsear el archivo JSON:`);
    log("red", error.message);
    process.exit(1);
  }

  // Verificar que sea un array
  if (!Array.isArray(questions)) {
    log("red", "❌ Error: El archivo JSON debe contener un array de preguntas");
    process.exit(1);
  }

  log("blue", `📊 Encontradas ${questions.length} preguntas para importar\n`);

  // Validar todas las preguntas primero
  let validCount = 0;
  const validQuestions = [];

  for (let i = 0; i < questions.length; i++) {
    if (validateQuestion(questions[i], i)) {
      validQuestions.push(questions[i]);
      validCount++;
    }
  }

  if (validCount === 0) {
    log("red", "\n❌ No hay preguntas válidas para importar");
    process.exit(1);
  }

  if (validCount < questions.length) {
    log(
      "yellow",
      `\n⚠️  Solo ${validCount} de ${questions.length} preguntas son válidas`,
    );
    log(
      "yellow",
      "¿Deseas continuar con las válidas? (Ctrl+C para cancelar)\n",
    );
    await new Promise((resolve) => setTimeout(resolve, 3000));
  }

  // Importar preguntas
  let imported = 0;
  let failed = 0;

  for (let i = 0; i < validQuestions.length; i++) {
    const question = validQuestions[i];

    try {
      const { data, error } = await supabase
        .from("questions")
        .insert(question)
        .select();

      if (error) {
        log("red", `❌ Error en pregunta #${i + 1}: ${error.message}`);
        failed++;
      } else {
        imported++;
        const stem = question.stem.substring(0, 60);
        log("green", `✓ Pregunta #${i + 1} importada: "${stem}..."`);
      }
    } catch (error) {
      log("red", `❌ Error inesperado en pregunta #${i + 1}: ${error.message}`);
      failed++;
    }

    // Pequeña pausa para no saturar la API
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  // Resumen
  log("cyan", "\n" + "=".repeat(60));
  log("cyan", "📋 RESUMEN DE IMPORTACIÓN");
  log("cyan", "=".repeat(60));
  log("green", `✓ Importadas exitosamente: ${imported}`);
  if (failed > 0) {
    log("red", `✗ Fallidas: ${failed}`);
  }
  log("cyan", "=".repeat(60) + "\n");

  if (imported > 0) {
    log("green", "🎉 ¡Importación completada!");
  }
}

// Ejecutar
const args = process.argv.slice(2);

if (args.length === 0) {
  log("yellow", "\n⚠️  Uso: node scripts/import-questions.js <archivo.json>\n");
  log("cyan", "Ejemplo:");
  log("cyan", "  node scripts/import-questions.js questions.json\n");
  process.exit(1);
}

const filePath = path.resolve(args[0]);
importQuestions(filePath).catch((error) => {
  log("red", `\n❌ Error fatal: ${error.message}`);
  process.exit(1);
});
