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

const skillSchema = z.object({
  area_id: z.string().min(1, "Selecciona un área"),
  code: z.string().min(1, "El código es requerido"),
  name: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  description: z.string().optional(),
  sort_order: z.number().min(0),
  is_active: z.boolean(),
});

type SkillForm = z.infer<typeof skillSchema>;

export const dynamic = "force-dynamic";

export default function EditSkillPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { mutate: updateSkill, mutation } = useUpdate();
  const isPending = mutation.isPending;

  const { result: skillResult, query: skillQuery } = useOne({
    resource: "skills",
    id,
    meta: {
      select: "id, area_id, code, name, description, sort_order, is_active",
    },
  });

  const { result: areasResult } = useList({
    resource: "areas",
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
  } = useForm<SkillForm>({
    resolver: zodResolver(skillSchema),
    defaultValues: {
      sort_order: 0,
      is_active: true,
    },
  });

  const skill = skillResult?.data;
  const areas = areasResult?.data ?? [];
  const areaId = watch("area_id");
  const isActive = watch("is_active");
  const isLoading = skillQuery.isLoading;

  useEffect(() => {
    if (skill) {
      reset({
        area_id: skill.area_id?.toString() || "",
        code: skill.code || "",
        name: skill.name || "",
        description: skill.description || "",
        sort_order: skill.sort_order || 0,
        is_active: skill.is_active ?? true,
      });
    }
  }, [skill, reset]);

  const onSubmit = (values: SkillForm) => {
    updateSkill(
      {
        resource: "skills",
        id,
        values: {
          ...values,
          area_id: parseInt(values.area_id),
        },
      },
      {
        onSuccess: () => router.push("/skills"),
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
          <Link href="/skills">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Editar Skill</h1>
          <p className="text-muted-foreground">
            Modifica los detalles del skill
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
              <Label htmlFor="area_id">Área *</Label>
              <Select
                value={areaId}
                onValueChange={(v) => setValue("area_id", v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un área" />
                </SelectTrigger>
                <SelectContent>
                  {areas.map((area: any) => (
                    <SelectItem key={area.id} value={area.id.toString()}>
                      {area.name} ({area.code})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.area_id && (
                <p className="text-sm text-destructive">
                  {errors.area_id.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="code">Código *</Label>
              <Input
                id="code"
                {...register("code")}
                placeholder="e.g., IDEA_PRINCIPAL"
              />
              {errors.code && (
                <p className="text-sm text-destructive">
                  {errors.code.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Nombre *</Label>
              <Input
                id="name"
                {...register("name")}
                placeholder="e.g., Identificar idea principal"
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
                placeholder="Descripción opcional del skill"
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
              <Label htmlFor="is_active">Skill activo</Label>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-2">
          <Button type="submit" disabled={isPending}>
            {isPending ? "Guardando..." : "Guardar Cambios"}
          </Button>
          <Button type="button" variant="outline" asChild>
            <Link href="/skills">Cancelar</Link>
          </Button>
        </div>
      </form>
    </div>
  );
}
