"use client";

import { useState } from "react";
import { useCreate } from "@refinedev/core";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  ArrowLeft,
  Upload,
  CheckCircle2,
  XCircle,
  FileJson,
} from "lucide-react";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";

export const dynamic = "force-dynamic";

type Question = {
  skill_id: number;
  set_id: number;
  difficulty: "easy" | "medium" | "hard";
  stem: string;
  options_json: Array<{
    key: string;
    text: string;
    image?: string | null;
  }>;
  correct_key: string;
  explanation: string;
  tags_json: string[];
  source?: string;
  is_active: boolean;
};

export default function ImportQuestionsPage() {
  const { mutate: createQuestion } = useCreate();

  const [jsonInput, setJsonInput] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [isValidated, setIsValidated] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [importProgress, setImportProgress] = useState(0);
  const [importResults, setImportResults] = useState<{
    success: number;
    failed: number;
    errors: string[];
  } | null>(null);

  const validateQuestion = (q: Question, index: number): string[] => {
    const errors: string[] = [];
    const prefix = `Pregunta #${index + 1}:`;

    if (!q.skill_id) errors.push(`${prefix} skill_id es requerido`);
    if (!q.set_id) errors.push(`${prefix} set_id es requerido`);
    if (!q.stem || q.stem.trim() === "") {
      errors.push(`${prefix} stem no puede estar vacío`);
    }
    if (!q.options_json || !Array.isArray(q.options_json)) {
      errors.push(`${prefix} options_json debe ser un array`);
    } else if (q.options_json.length !== 4) {
      errors.push(`${prefix} debe tener exactamente 4 opciones`);
    } else {
      // Validar estructura de cada opción
      q.options_json.forEach((opt, idx) => {
        if (!opt.key || !opt.text) {
          errors.push(`${prefix} opción #${idx + 1} debe tener key y text`);
        }
      });
    }
    if (!["a", "b", "c", "d"].includes(q.correct_key)) {
      errors.push(`${prefix} correct_key debe ser a, b, c o d`);
    }
    if (!["easy", "medium", "hard"].includes(q.difficulty)) {
      errors.push(`${prefix} difficulty debe ser easy, medium o hard`);
    }

    return errors;
  };

  const handleValidate = () => {
    setErrors([]);
    setQuestions([]);
    setIsValidated(false);
    setImportResults(null);

    try {
      const parsed = JSON.parse(jsonInput);

      if (!Array.isArray(parsed)) {
        setErrors(["El JSON debe ser un array de preguntas"]);
        return;
      }

      if (parsed.length === 0) {
        setErrors(["El array está vacío, debe contener al menos una pregunta"]);
        return;
      }

      const allErrors: string[] = [];
      const validQuestions: Question[] = [];

      parsed.forEach((q, index) => {
        const qErrors = validateQuestion(q as Question, index);
        if (qErrors.length === 0) {
          validQuestions.push(q as Question);
        } else {
          allErrors.push(...qErrors);
        }
      });

      if (allErrors.length > 0) {
        setErrors(allErrors);
        if (validQuestions.length > 0) {
          // Hay algunas preguntas válidas, mostrarlas de todos modos
          setQuestions(validQuestions);
          setIsValidated(true);
        }
        return;
      }

      setQuestions(validQuestions);
      setIsValidated(true);
    } catch (error) {
      setErrors([
        `Error al parsear JSON: ${error instanceof Error ? error.message : "Error desconocido"}`,
      ]);
    }
  };

  const handleImport = async () => {
    if (!isValidated || questions.length === 0) return;

    setIsImporting(true);
    setImportProgress(0);

    const results = {
      success: 0,
      failed: 0,
      errors: [] as string[],
    };

    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];

      try {
        await new Promise<void>((resolve, reject) => {
          createQuestion(
            {
              resource: "questions",
              values: question,
            },
            {
              onSuccess: () => {
                results.success++;
                resolve();
              },
              onError: (error) => {
                results.failed++;
                results.errors.push(
                  `Pregunta #${i + 1}: ${error.message || "Error desconocido"}`,
                );
                reject(error);
              },
            },
          );
        });
        // Espera exitosa, continuar
      } catch {
        // Error ya manejado en onError callback
      }

      setImportProgress(((i + 1) / questions.length) * 100);
      // Pequeña pausa para no saturar la API
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    setImportResults(results);
    setIsImporting(false);
  };

  const handleClear = () => {
    setJsonInput("");
    setQuestions([]);
    setErrors([]);
    setIsValidated(false);
    setImportResults(null);
    setImportProgress(0);
  };

  const difficultyConfig = {
    easy: { label: "Fácil", color: "bg-green-500" },
    medium: { label: "Media", color: "bg-yellow-500" },
    hard: { label: "Difícil", color: "bg-red-500" },
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/questions">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Importación Masiva</h1>
            <p className="text-muted-foreground">
              Pega un array JSON de preguntas para importar
            </p>
          </div>
        </div>
        <Button variant="outline" asChild>
          <Link href="/questions">Cancelar</Link>
        </Button>
      </div>

      {/* Instrucciones */}
      <Alert>
        <FileJson className="h-4 w-4" />
        <AlertDescription>
          <strong>Formato requerido:</strong> Un array JSON con preguntas.{" "}
          <Link
            href="/ejemplos-preguntas.json"
            className="text-primary underline"
            target="_blank"
          >
            Ver ejemplo
          </Link>
          . Cada pregunta debe tener: skill_id, set_id, difficulty, stem,
          options_json (4 opciones), correct_key, explanation, tags_json.
        </AlertDescription>
      </Alert>

      {/* Input JSON */}
      <Card>
        <CardHeader>
          <CardTitle>1. Pega el JSON</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder='[
  {
    "skill_id": 7,
    "set_id": 1,
    "difficulty": "medium",
    "stem": "¿Cuánto es 2 + 2?",
    "options_json": [
      {"key": "a", "text": "3", "image": null},
      {"key": "b", "text": "4", "image": null},
      {"key": "c", "text": "5", "image": null},
      {"key": "d", "text": "6", "image": null}
    ],
    "correct_key": "b",
    "explanation": "2 + 2 = 4",
    "tags_json": ["aritmetica", "suma"],
    "source": "Ejemplo",
    "is_active": true
  }
]'
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            className="font-mono text-sm min-h-75"
            disabled={isImporting}
          />

          <div className="flex gap-2">
            <Button
              onClick={handleValidate}
              disabled={!jsonInput || isImporting}
            >
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Validar JSON
            </Button>
            <Button
              variant="outline"
              onClick={handleClear}
              disabled={isImporting}
            >
              Limpiar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Errores de Validación */}
      {errors.length > 0 && (
        <Alert variant="destructive">
          <XCircle className="h-4 w-4" />
          <AlertDescription>
            <strong>Se encontraron {errors.length} errores:</strong>
            <ul className="mt-2 list-disc list-inside space-y-1">
              {errors.slice(0, 10).map((error, i) => (
                <li key={i} className="text-sm">
                  {error}
                </li>
              ))}
              {errors.length > 10 && (
                <li className="text-sm">
                  ... y {errors.length - 10} errores más
                </li>
              )}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      {/* Preview de Preguntas Validadas */}
      {isValidated && questions.length > 0 && !importResults && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>
                2. Confirmar Importación ({questions.length} preguntas)
              </CardTitle>
              <Button
                onClick={handleImport}
                disabled={isImporting}
                className="gap-2"
              >
                <Upload className="h-4 w-4" />
                {isImporting ? "Importando..." : "Importar Ahora"}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {isImporting && (
              <div className="mb-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Importando preguntas...</span>
                  <span>{Math.round(importProgress)}%</span>
                </div>
                <Progress value={importProgress} />
              </div>
            )}

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {questions.map((q, i) => (
                <div
                  key={i}
                  className="border rounded-lg p-3 space-y-2 bg-muted/50"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <p className="text-sm font-medium line-clamp-2">
                        {i + 1}. {q.stem}
                      </p>
                    </div>
                    <Badge
                      variant="outline"
                      className={difficultyConfig[q.difficulty].color}
                    >
                      {difficultyConfig[q.difficulty].label}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>Skill ID: {q.skill_id}</span>
                    <span>•</span>
                    <span>Set ID: {q.set_id}</span>
                    <span>•</span>
                    <span>Correcta: {q.correct_key.toUpperCase()}</span>
                    <span>•</span>
                    <span>{q.tags_json.length} tags</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Resultados de Importación */}
      {importResults && (
        <Alert
          variant={importResults.failed > 0 ? "destructive" : "default"}
          className="border-green-500"
        >
          <CheckCircle2 className="h-4 w-4" />
          <AlertDescription>
            <strong>Importación completada</strong>
            <div className="mt-2 space-y-1">
              <p className="text-green-600 dark:text-green-400">
                ✓ {importResults.success} preguntas importadas exitosamente
              </p>
              {importResults.failed > 0 && (
                <>
                  <p className="text-red-600 dark:text-red-400">
                    ✗ {importResults.failed} preguntas fallidas
                  </p>
                  {importResults.errors.length > 0 && (
                    <ul className="mt-2 list-disc list-inside space-y-1 text-sm">
                      {importResults.errors.slice(0, 5).map((error, i) => (
                        <li key={i}>{error}</li>
                      ))}
                    </ul>
                  )}
                </>
              )}
              {importResults.success > 0 && (
                <p className="text-sm text-muted-foreground mt-2">
                  Redirigiendo al listado de preguntas...
                </p>
              )}
            </div>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
