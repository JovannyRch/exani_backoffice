"use client";

import { useOne, useUpdate, useList } from "@refinedev/core";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
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
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

const areaSchema = z.object({
  section_id: z.string().min(1, "Selecciona una sección"),
  code: z.string().min(1, "El código es requerido"),
  name: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  description: z.string().optional(),
  weight: z.number().min(0),
  sort_order: z.number().min(0),
  is_active: z.boolean(),
});

type AreaForm = z.infer<typeof areaSchema>;

export const dynamic = "force-dynamic";

export default function EditAreaPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { mutate: updateArea, mutation } = useUpdate();
  const isPending = mutation.isPending;

  const { result: areaResult, query: areaQuery } = useOne({
    resource: "areas",
    id,
    meta: {
      select:
        "id, section_id, code, name, description, weight, sort_order, is_active",
    },
  });

  const { result: sectionsResult } = useList({
    resource: "sections",
    pagination: { pageSize: 100 },
    meta: { select: "id, name, code" },
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<AreaForm>({
    resolver: zodResolver(areaSchema),
    defaultValues: {
      weight: 1,
      sort_order: 0,
      is_active: true,
    },
  });

  const area = areaResult?.data;
  const sections = sectionsResult?.data ?? [];
  const sectionId = watch("section_id");
  const isActive = watch("is_active");
  const isLoading = areaQuery.isLoading;

  useEffect(() => {
    if (area) {
      reset({
        section_id: area.section_id?.toString() || "",
        code: area.code || "",
        name: area.name || "",
        description: area.description || "",
        weight: area.weight || 1,
        sort_order: area.sort_order || 0,
        is_active: area.is_active ?? true,
      });
    }
  }, [area, reset]);

  const onSubmit = (values: AreaForm) => {
    updateArea(
      {
        resource: "areas",
        id,
        values: {
          ...values,
          section_id: parseInt(values.section_id),
        },
      },
      {
        onSuccess: () => router.push("/areas"),
      },
    );
  };

  if (isLoading) {
    return <div className="text-center py-8">Cargando...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/areas">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Editar Área</h1>
          <p className="text-muted-foreground">
            Modifica los detalles del área
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
              <Label htmlFor="section_id">Sección *</Label>
              <Select
                value={sectionId}
                onValueChange={(v) => setValue("section_id", v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona una sección" />
                </SelectTrigger>
                <SelectContent>
                  {sections.map((section: any) => (
                    <SelectItem key={section.id} value={section.id.toString()}>
                      {section.name} ({section.code})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.section_id && (
                <p className="text-sm text-destructive">
                  {errors.section_id.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="code">Código *</Label>
                <Input
                  id="code"
                  {...register("code")}
                  placeholder="e.g., COMP_LECT_GEN"
                />
                {errors.code && (
                  <p className="text-sm text-destructive">
                    {errors.code.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="weight">Peso</Label>
                <Input
                  id="weight"
                  type="number"
                  step="0.01"
                  {...register("weight", { valueAsNumber: true })}
                />
                {errors.weight && (
                  <p className="text-sm text-destructive">
                    {errors.weight.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Nombre *</Label>
              <Input
                id="name"
                {...register("name")}
                placeholder="e.g., Comprensión Lectora General"
              />
              {errors.name && (
                <p className="text-sm text-destructive">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                {...register("description")}
                placeholder="Descripción opcional del área"
                rows={3}
              />
              {errors.description && (
                <p className="text-sm text-destructive">
                  {errors.description.message}
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

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="is_active"
                checked={isActive}
                onChange={(e) => setValue("is_active", e.target.checked)}
                className="h-4 w-4 rounded border-gray-300"
              />
              <Label htmlFor="is_active">Área activa</Label>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-2">
          <Button type="submit" disabled={isPending}>
            {isPending ? "Guardando..." : "Guardar Cambios"}
          </Button>
          <Button type="button" variant="outline" asChild>
            <Link href="/areas">Cancelar</Link>
          </Button>
        </div>
      </form>
    </div>
  );
}
