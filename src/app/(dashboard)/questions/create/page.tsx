"use client";

import { useCreate, useList } from "@refinedev/core";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
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
import { Plus, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import type { BaseRecord } from "@refinedev/core";

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

export default function CreateQuestionPage() {
  const router = useRouter();
  const { mutate: createQuestion, mutation } = useCreate();
  const isPending = mutation.isPending;
  const [options, setOptions] = useState<Option[]>([
    { text: "", is_correct: false },
    { text: "", is_correct: false },
    { text: "", is_correct: false },
    { text: "", is_correct: false },
  ]);
  const [tagInput, setTagInput] = useState("");

  const { result: skillsResult } = useList({
    resource: "skills",
    pagination: { pageSize: 100 },
    meta: { select: "id, name" },
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<QuestionForm>({
    resolver: zodResolver(questionSchema),
    defaultValues: { difficulty: "medium", tags: [] },
  });

  const tags = watch("tags");

  const onSubmit = (values: QuestionForm) => {
    const correctCount = options.filter((o) => o.is_correct).length;
    if (correctCount !== 1) {
      alert("Debes seleccionar exactamente una respuesta correcta");
      return;
    }
    const emptyOptions = options.filter((o) => !o.text.trim());
    if (emptyOptions.length > 0) {
      alert("Completa todas las opciones");
      return;
    }

    createQuestion(
      {
        resource: "questions",
        values: {
          ...values,
          status: "draft",
          options,
        },
      },
      {
        onSuccess: () => router.push("/questions"),
      }
    );
  };

  const setCorrect = (index: number) => {
    setOptions((prev) => prev.map((o, i) => ({ ...o, is_correct: i === index })));
  };

  const updateOptionText = (index: number, text: string) => {
    setOptions((prev) => prev.map((o, i) => (i === index ? { ...o, text } : o)));
  };

  const addTag = () => {
    const tag = tagInput.trim().toLowerCase();
    if (tag && !tags.includes(tag)) {
      setValue("tags", [...tags, tag]);
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    setValue("tags", tags.filter((t) => t !== tag));
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/questions">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Nueva Pregunta</h1>
          <p className="text-muted-foreground">Crea una nueva pregunta para el banco</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Clasificación</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="skill_id">Skill</Label>
              <Select onValueChange={(v) => setValue("skill_id", v)}>
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
                defaultValue="medium"
                onValueChange={(v) => setValue("difficulty", v as "easy" | "medium" | "hard")}
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

        <div className="flex justify-end gap-3">
          <Button variant="outline" type="button" asChild>
            <Link href="/questions">Cancelar</Link>
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending ? "Guardando..." : "Guardar pregunta"}
          </Button>
        </div>
      </form>
    </div>
  );
}
