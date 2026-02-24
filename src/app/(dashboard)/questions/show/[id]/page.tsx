"use client";

import { useOne, useList } from "@refinedev/core";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Edit, CheckCircle2 } from "lucide-react";
import { MathText } from "@/components/math-text";

type Option = {
  key: string;
  text: string;
};

type OptionDB = {
  key: string;
  text: string;
  image?: string | null;
};

export const dynamic = "force-dynamic";

export default function ShowQuestionPage() {
  const { id } = useParams<{ id: string }>();

  const { result: questionResult, query: questionQuery } = useOne({
    resource: "questions",
    id,
    meta: {
      select:
        "id, stem, explanation, difficulty, skill_id, set_id, source, tags_json, options_json, correct_key, is_active, created_at",
    },
  });

  const { result: skillResult } = useList({
    resource: "skills",
    filters: questionResult?.skill_id
      ? [{ field: "id", operator: "eq", value: questionResult.skill_id }]
      : [],
    pagination: { pageSize: 1 },
    meta: { select: "id, name, code, area_id" },
    queryOptions: { enabled: !!questionResult?.skill_id },
  });

  const { result: setResult } = useList({
    resource: "question_sets",
    filters: questionResult?.set_id
      ? [{ field: "id", operator: "eq", value: questionResult.set_id }]
      : [],
    pagination: { pageSize: 1 },
    meta: { select: "id, name" },
    queryOptions: { enabled: !!questionResult?.set_id },
  });

  const data = questionResult;
  const skill = skillResult?.data?.[0];
  const set = setResult?.data?.[0];

  // Debug logging
  console.log("🔍 Debug Show Page:", {
    id,
    questionResult,
    data,
    isLoading: questionQuery.isLoading,
    isError: questionQuery.isError,
    error: questionQuery.error,
  });

  if (questionQuery.isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Skeleton className="h-10 w-10" />
          <div className="space-y-2">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center py-8 space-y-4">
        <p className="text-muted-foreground">Pregunta no encontrada</p>
        {questionQuery.isError && (
          <p className="text-xs text-destructive">
            Error:{" "}
            {questionQuery.error?.message || "Error al cargar la pregunta"}
          </p>
        )}
        <Button asChild variant="outline">
          <Link href="/questions">Volver al listado</Link>
        </Button>
      </div>
    );
  }

  // Parse options
  let options: Option[] = [];
  if (data.options_json) {
    if (Array.isArray(data.options_json)) {
      // Si ya es un array, puede tener el formato [{key, text, image}] o [{key, text}]
      options = data.options_json.map((opt: OptionDB) => ({
        key: opt.key,
        text: opt.text,
      }));
    } else if (typeof data.options_json === "object") {
      options = Object.entries(data.options_json).map(([key, text]) => ({
        key,
        text: String(text),
      }));
    }
  }

  // Parse tags
  const tags = Array.isArray(data.tags_json) ? data.tags_json : [];

  // Difficulty badge
  const difficultyConfig = {
    easy: { label: "🟢 Fácil", variant: "secondary" as const },
    medium: { label: "🟡 Media", variant: "default" as const },
    hard: { label: "🔴 Difícil", variant: "destructive" as const },
  };

  const difficulty =
    difficultyConfig[data.difficulty as "easy" | "medium" | "hard"] ||
    difficultyConfig.medium;

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
            <h1 className="text-2xl font-bold">Pregunta #{id}</h1>
            <p className="text-muted-foreground text-sm">
              {new Date(data.created_at).toLocaleDateString("es-MX", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
        <Button asChild>
          <Link href={`/questions/edit/${id}`}>
            <Edit className="h-4 w-4 mr-2" />
            Editar
          </Link>
        </Button>
      </div>

      {/* Metadata */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Información</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Skill</p>
              <p className="font-medium">{skill?.name || "—"}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Set</p>
              <p className="font-medium">{set?.name || "—"}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Dificultad</p>
              <Badge variant={difficulty.variant}>{difficulty.label}</Badge>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Estado</p>
              <Badge variant={data.is_active ? "default" : "secondary"}>
                {data.is_active ? "✓ Activa" : "Inactiva"}
              </Badge>
            </div>
          </div>
          {data.source && (
            <div>
              <p className="text-sm text-muted-foreground">Fuente</p>
              <p className="font-medium">{data.source}</p>
            </div>
          )}
          {tags.length > 0 && (
            <div>
              <p className="text-sm text-muted-foreground mb-2">Tags</p>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag: string, idx: number) => (
                  <Badge key={idx} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Enunciado */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Enunciado</CardTitle>
        </CardHeader>
        <CardContent>
          <MathText text={data.stem} className="whitespace-pre-wrap" />
        </CardContent>
      </Card>

      {/* Opciones */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Opciones de Respuesta</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {options.map((option) => {
            const isCorrect = option.key === data.correct_key;
            return (
              <div
                key={option.key}
                className={`flex items-start gap-3 p-3 rounded-lg border ${
                  isCorrect
                    ? "bg-green-50 border-green-300 dark:bg-green-950 dark:border-green-800"
                    : "bg-muted/50"
                }`}
              >
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                    isCorrect
                      ? "bg-green-500 text-white"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {option.key}
                </div>
                <div className="flex-1 pt-1">
                  <MathText text={option.text} />
                </div>
                {isCorrect && (
                  <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-1" />
                )}
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Explicación */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Explicación</CardTitle>
        </CardHeader>
        <CardContent>
          <MathText text={data.explanation} className="whitespace-pre-wrap" />
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex gap-2">
        <Button variant="outline" asChild>
          <Link href="/questions">Volver al listado</Link>
        </Button>
        <Button asChild>
          <Link href={`/questions/edit/${id}`}>
            <Edit className="h-4 w-4 mr-2" />
            Editar Pregunta
          </Link>
        </Button>
      </div>
    </div>
  );
}
