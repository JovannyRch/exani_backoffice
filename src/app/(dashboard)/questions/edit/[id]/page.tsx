"use client";

import { useOne, useUpdate, useList } from "@refinedev/core";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { BaseRecord } from "@refinedev/core";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Plus, AlertCircle } from "lucide-react";

const questionSchema = z.object({
  stem: z.string().min(10, "El enunciado debe tener al menos 10 caracteres"),
  explanation: z.string().min(20, "La explicación debe tener al menos 20 caracteres"),
  difficulty: z.enum(["easy", "medium", "hard"]),
  skill_id: z.string().min(1, "Selecciona un skill"),
  source: z.string().optional(),
  tags: z.array(z.string()),
});

type QuestionForm = z.infer<typeof questionSchema>;

type Option = {
  text: string;
  is_correct: boolean;
};

const STATUS_TRANSITIONS: Record<string, { label: string; next: { value: string; label: string }[] }> = {
  draft: {
    label: "Borrador",
    next: [{ value: "pending_review", label: "Enviar a revisión" }],
  },
  pending_review: {
    label: "En revisión",
    next: [
      { value: "approved", label: "Aprobar" },
      { value: "rejected", label: "Rechazar" },
      { value: "draft", label: "Regresar a borrador" },
    ],
  },
  approved: {
    label: "Aprobada",
    next: [
      { value: "published", label: "Publicar" },
      { value: "draft", label: "Regresar a borrador" },
    ],
  },
  rejected: {
    label: "Rechazada",
    next: [{ value: "draft", label: "Regresar a borrador" }],
  },
  published: {
    label: "Publicada",
    next: [{ value: "archived", label: "Archivar" }],
  },
  archived: {
    label: "Archivada",
    next: [{ value: "draft", label: "Restaurar como borrador" }],
  },
};

const STATUS_VARIANT: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  published: "default",
  approved: "secondary",
  pending_review: "outline",
  draft: "outline",
  rejected: "destructive",
  archived: "secondary",
};

export default function EditQuestionPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const { result: question, query } = useOne({
    resource: "questions",
    id,
    meta: { select: "id, stem, explanation, difficulty, skill_id, source, tags, status, options" },
  });

  const { mutate: updateQuestion, mutation } = useUpdate();
  const isPending = mutation.isPending;

  const { result: skillsResult } = useList({
    resource: "skills",
    pagination: { pageSize: 100 },
    meta: { select: "id, name" },
  });

  const [options, setOptions] = useState<Option[]>([
    { text: "", is_correct: false },
    { text: "", is_correct: false },
    { text: "", is_correct: false },
    { text: "", is_correct: false },
  ]);
  const [optionsError, setOptionsError] = useState<string | null>(null);
  const [tagInput, setTagInput] = useState("");
  const [currentStatus, setCurrentStatus] = useState<string>("draft");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isDirty },
  } = useForm<QuestionForm>({
    resolver: zodResolver(questionSchema),
    defaultValues: { difficulty: "medium", tags: [] },
  });

  const tags = watch("tags");
  const selectedSkillId = watch("skill_id");
  const selectedDifficulty = watch("difficulty");

  useEffect(() => {
    if (!question) return;

    reset({
      stem: (question.stem as string) ?? "",
      explanation: (question.explanation as string) ?? "",
      difficulty: (question.difficulty as "easy" | "medium" | "hard") ?? "medium",
      skill_id: (question.skill_id as string) ?? "",
      source: (question.source as string) ?? "",
      tags: (question.tags as string[]) ?? [],
    });

    if (question.options && Array.isArray(question.options)) {
      setOptions(question.options as Option[]);
    }

    if (question.status) {
      setCurrentStatus(question.status as string);
    }
  }, [question, reset]);

  const validateOptions = (): boolean => {
    const correctCount = options.filter((o) => o.is_correct).length;
    if (correctCount !== 1) {
      setOptionsError("Debes seleccionar exactamente una respuesta correcta");
      return false;
    }
    const emptyOptions = options.filter((o) => !o.text.trim());
    if (emptyOptions.length > 0) {
      setOptionsError("Completa todas las opciones");
      return false;
    }
    setOptionsError(null);
    return true;
  };

  const onSubmit = (values: QuestionForm) => {
    if (!validateOptions()) return;

    updateQuestion(
      {
        resource: "questions",
        id,
        values: { ...values, options },
      },
      {
        onSuccess: () => router.push("/questions"),
      }
    );
  };

  const handleStatusChange = (newStatus: string) => {
    updateQuestion(
      {
        resource: "questions",
        id,
        values: { status: newStatus },
      },
      {
        onSuccess: () => setCurrentStatus(newStatus),
      }
    );
  };

  const setCorrect = (index: number) => {
    setOptionsError(null);
    setOptions((prev) => prev.map((o, i) => ({ ...o, is_correct: i === index })));
  };

  const updateOptionText = (index: number, text: string) => {
    setOptions((prev) => prev.map((o, i) => (i === index ? { ...o, text } : o)));
  };

  const addTag = () => {
    const tag = tagInput.trim().toLowerCase();
    if (tag && !tags.includes(tag)) {
      setValue("tags", [...tags, tag], { shouldDirty: true });
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    setValue("tags", tags.filter((t) => t !== tag), { shouldDirty: true });
  };

  const isLoading = query.isLoading;
  const statusInfo = STATUS_TRANSITIONS[currentStatus];

  if (isLoading) {
    return (
      <div className="max-w-3xl space-y-6">
        <div className="flex items-center gap-3">
          <Skeleton className="h-9 w-9 rounded-md" />
          <div className="space-y-1">
            <Skeleton className="h-7 w-48" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-5 w-32" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-24 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/questions">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Editar Pregunta</h1>
            <p className="text-muted-foreground text-sm font-mono">#{id}</p>
          </div>
        </div>
        <Badge variant={STATUS_VARIANT[currentStatus] ?? "outline"}>
          {statusInfo?.label ?? currentStatus}
        </Badge>
      </div>

      {statusInfo?.next.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Estado del workflow</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {statusInfo.next.map((transition) => (
                <Button
                  key={transition.value}
                  variant="outline"
                  size="sm"
                  disabled={isPending}
                  onClick={() => handleStatusChange(transition.value)}
                >
                  {transition.label}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Clasificación</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="skill_id">Skill</Label>
              <Select
                value={selectedSkillId}
                onValueChange={(v) => setValue("skill_id", v, { shouldDirty: true })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un skill" />
                </SelectTrigger>
                <SelectContent>
                  {skillsResult.data?.map((skill: BaseRecord) => (
                    <SelectItem key={skill.id as string} value={skill.id as string}>
                      {skill.name as string}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.skill_id && (
                <p className="text-xs text-destructive">{errors.skill_id.message}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label>Dificultad</Label>
              <Select
                value={selectedDifficulty}
                onValueChange={(v) =>
                  setValue("difficulty", v as "easy" | "medium" | "hard", { shouldDirty: true })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">Fácil</SelectItem>
                  <SelectItem value="medium">Media</SelectItem>
                  <SelectItem value="hard">Difícil</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="source">Fuente</Label>
              <Input id="source" placeholder="Ej: Ceneval 2024" {...register("source")} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Enunciado</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Textarea
              rows={5}
              placeholder="Escribe o pega el enunciado de la pregunta aquí..."
              {...register("stem")}
            />
            {errors.stem && (
              <p className="text-xs text-destructive">{errors.stem.message}</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Opciones de Respuesta</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-xs text-muted-foreground">
              Haz clic en la letra para marcar la respuesta correcta
            </p>
            {options.map((option, index) => (
              <div key={index} className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setCorrect(index)}
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold transition-colors ${
                    option.is_correct
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-muted-foreground text-muted-foreground hover:border-primary"
                  }`}
                >
                  {String.fromCharCode(65 + index)}
                </button>
                <Input
                  placeholder={`Opción ${String.fromCharCode(65 + index)}`}
                  value={option.text}
                  onChange={(e) => updateOptionText(index, e.target.value)}
                />
              </div>
            ))}
            {optionsError && (
              <Alert variant="destructive" className="py-2">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{optionsError}</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Explicación</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Textarea
              rows={4}
              placeholder="Explica por qué la respuesta correcta es correcta..."
              {...register("explanation")}
            />
            {errors.explanation && (
              <p className="text-xs text-destructive">{errors.explanation.message}</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Tags</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex gap-2">
              <Input
                placeholder="Agregar tag..."
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addTag();
                  }
                }}
              />
              <Button type="button" variant="outline" onClick={addTag}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="cursor-pointer"
                    onClick={() => removeTag(tag)}
                  >
                    {tag} ×
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Separator />

        <div className="flex items-center justify-between">
          {isDirty && (
            <p className="text-sm text-muted-foreground">Tienes cambios sin guardar</p>
          )}
          <div className="flex gap-3 ml-auto">
            <Button variant="outline" type="button" asChild>
              <Link href="/questions">Cancelar</Link>
            </Button>
            <Button type="submit" disabled={isPending || !isDirty}>
              {isPending ? "Guardando..." : "Guardar cambios"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
