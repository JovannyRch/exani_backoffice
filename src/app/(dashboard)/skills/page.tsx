"use client";

import Link from "next/link";
import { useList, useDelete } from "@refinedev/core";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Search, Pencil, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function SkillsPage() {
  const [search, setSearch] = useState("");
  const [areaFilter, setAreaFilter] = useState("all");
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const filters = [];
  if (areaFilter !== "all") {
    filters.push({
      field: "area_id",
      operator: "eq" as const,
      value: parseInt(areaFilter),
    });
  }
  if (search) {
    filters.push({
      field: "name",
      operator: "contains" as const,
      value: search,
    });
  }

  const { result: skillsResult, query: skillsQuery } = useList({
    resource: "skills",
    filters,
    sorters: [{ field: "sort_order", order: "asc" }],
    meta: {
      select: "id, area_id, code, name, description, sort_order, is_active",
    },
  });

  const { result: areasResult } = useList({
    resource: "areas",
    pagination: { pageSize: 100 },
    meta: { select: "id, name, code" },
  });

  const { mutate: deleteSkill, mutation: deleteMutation } = useDelete();

  const skills = skillsResult.data ?? [];
  const areas = areasResult.data ?? [];
  const total = skillsResult.total ?? 0;
  const isLoading = skillsQuery.isLoading;

  // Create a map for quick area lookup
  const areaMap = new Map(areas.map((a: any) => [a.id, a]));

  const handleDelete = () => {
    if (deleteId) {
      deleteSkill(
        {
          resource: "skills",
          id: deleteId,
        },
        {
          onSuccess: () => setDeleteId(null),
        },
      );
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Skills</h1>
          <p className="text-muted-foreground">{total} skills en total</p>
        </div>
        <Button asChild>
          <Link href="/skills/create">
            <Plus className="h-4 w-4 mr-2" />
            Nuevo skill
          </Link>
        </Button>
      </div>

      <div className="flex gap-2 flex-wrap">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar skills..."
            className="pl-8"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Select value={areaFilter} onValueChange={setAreaFilter}>
          <SelectTrigger className="w-52">
            <SelectValue placeholder="Área" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas las áreas</SelectItem>
            {areas.map((area: any) => (
              <SelectItem key={area.id} value={area.id.toString()}>
                {area.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {isLoading ? (
        <div className="text-center py-8">Cargando...</div>
      ) : skills.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          No se encontraron skills
        </div>
      ) : (
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Código</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Área</TableHead>
                <TableHead>Orden</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {skills.map((skill: any) => {
                const area = areaMap.get(skill.area_id);
                return (
                  <TableRow key={skill.id}>
                    <TableCell className="font-mono text-xs">
                      {skill.code}
                    </TableCell>
                    <TableCell className="font-medium">
                      <div>
                        {skill.name}
                        {skill.description && (
                          <p className="text-xs text-muted-foreground max-w-md truncate">
                            {skill.description}
                          </p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {area?.name || `ID: ${skill.area_id}`}
                      </Badge>
                    </TableCell>
                    <TableCell>{skill.sort_order}</TableCell>
                    <TableCell>
                      <Badge
                        variant={skill.is_active ? "default" : "secondary"}
                      >
                        {skill.is_active ? "Activo" : "Inactivo"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-2 justify-end">
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/skills/${skill.id}/edit`}>
                            <Pencil className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setDeleteId(skill.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}

      <Dialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>¿Eliminar skill?</DialogTitle>
            <DialogDescription>
              Esta acción no se puede deshacer. Todas las preguntas asociadas a
              este skill quedarán sin categorizar.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteId(null)}>
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? "Eliminando..." : "Eliminar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
