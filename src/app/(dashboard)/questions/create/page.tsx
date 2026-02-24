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
import { Plus, ArrowLeft, Eye, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const questionSchema = z.object({
  stem: z.string().min(10, "El enunciado debe tener al menos 10 caracteres"),
  explanation: z
    .string()
    .min(20, "La explicación debe tener al menos 20 caracteres"),
  difficulty: z.enum(["easy", "medium", "hard"]),
  skill_id: z.string().min(1, "Selecciona un skill"),
  set_id: z.string().min(1, "Selecciona un set de preguntas"),
  source: z.string().optional(),
  tags: z.array(z.string()),
});

type QuestionForm = z.infer<typeof questionSchema>;

type Option = {
  key: string;
  text: string;
};

export const dynamic = "force-dynamic";

export default function CreateQuestionPage() {
  const router = useRouter();
  const { mutate: createQuestion, mutation } = useCreate();
  const isPending = mutation.isPending;

  const [examId, setExamId] = useState<string>("");
  const [sectionId, setSectionId] = useState<string>("");
  const [areaId, setAreaId] = useState<string>("");

  const [options, setOptions] = useState<Option[]>([
    { key: "A", text: "" },
    { key: "B", text: "" },
    { key: "C", text: "" },
    { key: "D", text: "" },
  ]);
  const [correctKey, setCorrectKey] = useState<string>("");
  const [tagInput, setTagInput] = useState("");

  // Fetch data for hierarchical selection
  const { result: examsResult } = useList({
    resource: "exams",
    pagination: { pageSize: 100 },
    meta: { select: "id, name, code" },
  });

  const { result: sectionsResult } = useList({
    resource: "sections",
    filters: examId
      ? [{ field: "exam_id", operator: "eq", value: parseInt(examId) }]
      : [],
    pagination: { pageSize: 100 },
    meta: { select: "id, name, code" },
    queryOptions: { enabled: !!examId },
  });

  const { result: areasResult } = useList({
    resource: "areas",
    filters: sectionId
      ? [{ field: "section_id", operator: "eq", value: parseInt(sectionId) }]
      : [],
    pagination: { pageSize: 100 },
    meta: { select: "id, name, code" },
    queryOptions: { enabled: !!sectionId },
  });

  const { result: skillsResult } = useList({
    resource: "skills",
    filters: areaId
      ? [{ field: "area_id", operator: "eq", value: parseInt(areaId) }]
      : [],
    pagination: { pageSize: 100 },
    meta: { select: "id, name, code" },
    queryOptions: { enabled: !!areaId },
  });

  const { result: setsResult } = useList({
    resource: "question_sets",
    filters: examId
      ? [{ field: "exam_id", operator: "eq", value: parseInt(examId) }]
      : [],
    pagination: { pageSize: 100 },
    meta: { select: "id, name" },
    queryOptions: { enabled: !!examId },
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

  const stem = watch("stem");
  const explanation = watch("explanation");
  const difficulty = watch("difficulty");
  const tags = watch("tags");

  // Extract data with fallbacks
  const exams = examsResult?.data ?? [];
  const sections = sectionsResult?.data ?? [];
  const areas = areasResult?.data ?? [];
  const skills = skillsResult?.data ?? [];
  const sets = setsResult?.data ?? [];

  const onSubmit = (values: QuestionForm) => {
    if (!correctKey) {
      alert("Debes seleccionar una respuesta correcta");
      return;
    }
    const emptyOptions = options.filter((o) => !o.text.trim());
    if (emptyOptions.length > 0) {
      alert("Completa todas las opciones");
      return;
    }

    // Format options as JSON for database
    const optionsJson = options.reduce(
      (acc, opt) => {
        acc[opt.key] = opt.text;
        return acc;
      },
      {} as Record<string, string>,
    );

    createQuestion(
      {
        resource: "questions",
        values: {
          stem: values.stem,
          explanation: values.explanation,
          difficulty: values.difficulty,
          skill_id: parseInt(values.skill_id),
          set_id: parseInt(values.set_id),
          source: values.source || null,
          options_json: optionsJson,
          correct_key: correctKey,
          tags_json: values.tags,
          is_active: true,
        },
      },
      {
        onSuccess: () => router.push("/questions"),
      },
    );
  };

  const updateOptionText = (key: string, text: string) => {
    setOptions((prev) => prev.map((o) => (o.key === key ? { ...o, text } : o)));
  };

  const addOption = () => {
    const nextKey = String.fromCharCode(65 + options.length);
    if (options.length < 6) {
      setOptions([...options, { key: nextKey, text: "" }]);
    }
  };

  const removeOption = (key: string) => {
    if (options.length > 2) {
      setOptions((prev) => prev.filter((o) => o.key !== key));
      if (correctKey === key) {
        setCorrectKey("");
      }
    }
  };

  const addTag = () => {
    const tag = tagInput.trim().toLowerCase();
    if (tag && !tags.includes(tag)) {
      setValue("tags", [...tags, tag]);
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    setValue(
      "tags",
      tags.filter((t) => t !== tag),
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/questions">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Nueva Pregunta</h1>
          <p className="text-muted-foreground">
            Crea una nueva pregunta para el banco
          </p>
        </div>
      </div>

      <Tabs defaultValue="form" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="form">Formulario</TabsTrigger>
          <TabsTrigger value="preview">
            <Eye className="h-4 w-4 mr-2" />
            Vista Previa
          </TabsTrigger>
        </TabsList>

        <TabsContent value="form" className="space-y-6">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 max-w-3xl"
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-base">
                  Clasificación Jerárquica
                </CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label>1. Examen *</Label>
                  <Select
                    value={examId}
                    onValueChange={(v) => {
                      setExamId(v);
                      setSectionId("");
                      setAreaId("");
                      setValue("skill_id", "");
                      setValue("set_id", "");
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un examen" />
                    </SelectTrigger>
                    <SelectContent>
                      {exams.map((exam: any) => (
                        <SelectItem key={exam.id} value={exam.id.toString()}>
                          {exam.name} ({exam.code})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label>2. Sección *</Label>
                  <Select
                    value={sectionId}
                    onValueChange={(v) => {
                      setSectionId(v);
                      setAreaId("");
                      setValue("skill_id", "");
                    }}
                    disabled={!examId}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona una sección" />
                    </SelectTrigger>
                    <SelectContent>
                      {sections.map((section: any) => (
                        <SelectItem
                          key={section.id}
                          value={section.id.toString()}
                        >
                          {section.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label>3. Área *</Label>
                  <Select
                    value={areaId}
                    onValueChange={(v) => {
                      setAreaId(v);
                      setValue("skill_id", "");
                    }}
                    disabled={!sectionId}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un área" />
                    </SelectTrigger>
                    <SelectContent>
                      {areas.map((area: any) => (
                        <SelectItem key={area.id} value={area.id.toString()}>
                          {area.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="skill_id">4. Skill *</Label>
                  <Select
                    onValueChange={(v) => setValue("skill_id", v)}
                    disabled={!areaId}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un skill" />
                    </SelectTrigger>
                    <SelectContent>
                      {skills.map((skill: any) => (
                        <SelectItem key={skill.id} value={skill.id.toString()}>
                          {skill.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.skill_id && (
                    <p className="text-xs text-destructive">
                      {errors.skill_id.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="set_id">Set de Preguntas *</Label>
                  <Select
                    onValueChange={(v) => setValue("set_id", v)}
                    disabled={!examId}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un set" />
                    </SelectTrigger>
                    <SelectContent>
                      {sets.map((set: any) => (
                        <SelectItem key={set.id} value={set.id.toString()}>
                          {set.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.set_id && (
                    <p className="text-xs text-destructive">
                      {errors.set_id.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label>Dificultad *</Label>
                  <Select
                    defaultValue="medium"
                    onValueChange={(v) =>
                      setValue("difficulty", v as "easy" | "medium" | "hard")
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="easy">🟢 Fácil</SelectItem>
                      <SelectItem value="medium">🟡 Media</SelectItem>
                      <SelectItem value="hard">🔴 Difícil</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <Label htmlFor="source">Fuente (opcional)</Label>
                  <Input
                    id="source"
                    placeholder="Ej: Ceneval 2024"
                    {...register("source")}
                  />
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
                  <p className="text-xs text-destructive">
                    {errors.stem.message}
                  </p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-base">
                  Opciones de Respuesta
                </CardTitle>
                {options.length < 6 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addOption}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Agregar opción
                  </Button>
                )}
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-xs text-muted-foreground">
                  Haz clic en la letra para marcar la respuesta correcta
                </p>
                {options.map((option) => (
                  <div key={option.key} className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setCorrectKey(option.key)}
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-sm font-bold transition-colors ${
                        correctKey === option.key
                          ? "border-green-500 bg-green-500 text-white"
                          : "border-muted-foreground text-muted-foreground hover:border-green-500"
                      }`}
                    >
                      {option.key}
                    </button>
                    <Input
                      placeholder={`Opción ${option.key}`}
                      value={option.text}
                      onChange={(e) =>
                        updateOptionText(option.key, e.target.value)
                      }
                    />
                    {options.length > 2 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeOption(option.key)}
                      >
                        <X className="h-4 w-4 text-destructive" />
                      </Button>
                    )}
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
                  <p className="text-xs text-destructive">
                    {errors.explanation.message}
                  </p>
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
        </TabsContent>

        <TabsContent value="preview" className="max-w-3xl">
          <Card>
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Vista Previa</CardTitle>
                <Badge
                  variant={
                    difficulty === "easy"
                      ? "default"
                      : difficulty === "hard"
                        ? "destructive"
                        : "secondary"
                  }
                >
                  {difficulty === "easy"
                    ? "Fácil"
                    : difficulty === "hard"
                      ? "Difícil"
                      : "Media"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              {stem ? (
                <div className="space-y-4">
                  <div className="prose prose-sm max-w-none">
                    <p className="text-sm whitespace-pre-wrap">{stem}</p>
                  </div>

                  {options.some((o) => o.text) && (
                    <div className="space-y-2">
                      {options.map((option) => (
                        <div
                          key={option.key}
                          className={`flex items-start gap-3 p-3 rounded-lg border-2 transition-colors ${
                            correctKey === option.key
                              ? "border-green-500 bg-green-50"
                              : "border-border"
                          }`}
                        >
                          <div
                            className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                              correctKey === option.key
                                ? "bg-green-500 text-white"
                                : "bg-muted text-muted-foreground"
                            }`}
                          >
                            {option.key}
                          </div>
                          <p className="text-sm flex-1">
                            {option.text || (
                              <span className="text-muted-foreground italic">
                                Sin texto
                              </span>
                            )}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {explanation && (
                    <div className="border-t pt-4">
                      <h4 className="text-sm font-semibold mb-2">
                        Explicación:
                      </h4>
                      <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                        {explanation}
                      </p>
                    </div>
                  )}

                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {tags.map((tag) => (
                        <Badge key={tag} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <p>Escribe el enunciado para ver la vista previa</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
