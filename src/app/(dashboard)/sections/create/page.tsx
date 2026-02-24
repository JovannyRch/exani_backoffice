"use client";

import { useCreate, useList } from "@refinedev/core";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const sectionSchema = z.object({
  exam_id: z.string().min(1, "Selecciona un examen"),
  code: z.string().min(1, "El código es requerido"),
  name: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  type: z.enum(["transversal", "module", "diagnostic"]),
  num_questions: z.number().min(1, "Debe haber al menos 1 pregunta"),
  sort_order: z.number().min(0),
  is_active: z.boolean(),
});

type SectionForm = z.infer<typeof sectionSchema>;

export default function CreateSectionPage() {
  const router = useRouter();
  const { mutate: createSection, mutation } = useCreate();
  const isPending = mutation.isPending;

  const { result: examsResult } = useList({
    resource: "exams",
    pagination: { pageSize: 100 },
    meta: { select: "id, name, code" },
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<SectionForm>({
    resolver: zodResolver(sectionSchema),
    defaultValues: {
      type: "transversal",
      num_questions: 30,
      sort_order: 0,
      is_active: true,
    },
  });

  const exams = examsResult.data ?? [];
  const examId = watch("exam_id");
  const type = watch("type");
  const isActive = watch("is_active");

  const onSubmit = (values: SectionForm) => {
    createSection(
      {
        resource: "sections",
        values: {
          ...values,
          exam_id: parseInt(values.exam_id),
        },
      },
      {
        onSuccess: () => router.push("/sections"),
      },
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/sections">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Nueva Sección</h1>
          <p className="text-muted-foreground">
            Crea una nueva sección del examen
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Información Básica</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="exam_id">Examen *</Label>
              <Select
                value={examId}
                onValueChange={(v) => setValue("exam_id", v)}
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
              {errors.exam_id && (
                <p className="text-sm text-destructive">
                  {errors.exam_id.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="code">Código *</Label>
                <Input
                  id="code"
                  {...register("code")}
                  placeholder="e.g., COMP_LECT"
                />
                {errors.code && (
                  <p className="text-sm text-destructive">
                    {errors.code.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Tipo *</Label>
                <Select
                  value={type}
                  onValueChange={(v) => setValue("type", v as any)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="transversal">Transversal</SelectItem>
                    <SelectItem value="module">Módulo</SelectItem>
                    <SelectItem value="diagnostic">Diagnóstico</SelectItem>
                  </SelectContent>
                </Select>
                {errors.type && (
                  <p className="text-sm text-destructive">
                    {errors.type.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Nombre *</Label>
              <Input
                id="name"
                {...register("name")}
                placeholder="e.g., Comprensión Lectora"
              />
              {errors.name && (
                <p className="text-sm text-destructive">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="num_questions">Número de Preguntas *</Label>
                <Input
                  id="num_questions"
                  type="number"
                  {...register("num_questions", { valueAsNumber: true })}
                />
                {errors.num_questions && (
                  <p className="text-sm text-destructive">
                    {errors.num_questions.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="sort_order">Orden</Label>
                <Input
                  id="sort_order"
                  type="number"
                  {...register("sort_order", { valueAsNumber: true })}
                />
                {errors.sort_order && (
                  <p className="text-sm text-destructive">
                    {errors.sort_order.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="is_active"
                checked={isActive}
                onChange={(e) => setValue("is_active", e.target.checked)}
                className="h-4 w-4 rounded border-gray-300"
              />
              <Label htmlFor="is_active">Sección activa</Label>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-2">
          <Button type="submit" disabled={isPending}>
            {isPending ? "Creando..." : "Crear Sección"}
          </Button>
          <Button type="button" variant="outline" asChild>
            <Link href="/sections">Cancelar</Link>
          </Button>
        </div>
      </form>
    </div>
  );
}
