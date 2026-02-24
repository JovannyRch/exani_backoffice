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

export const dynamic = "force-dynamic";

export default function AreasPage() {
  const [search, setSearch] = useState("");
  const [sectionFilter, setSectionFilter] = useState("all");
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const filters = [];
  if (sectionFilter !== "all") {
    filters.push({
      field: "section_id",
      operator: "eq" as const,
      value: parseInt(sectionFilter),
    });
  }
  if (search) {
    filters.push({
      field: "name",
      operator: "contains" as const,
      value: search,
    });
  }

  const { result: areasResult, query: areasQuery } = useList({
    resource: "areas",
    filters,
    sorters: [{ field: "sort_order", order: "asc" }],
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

  const { mutate: deleteArea, mutation: deleteMutation } = useDelete();

  const areas = areasResult.data ?? [];
  const sections = sectionsResult.data ?? [];
  const total = areasResult.total ?? 0;
  const isLoading = areasQuery.isLoading;

  // Create a map for quick section lookup
  const sectionMap = new Map(sections.map((s: any) => [s.id, s]));

  const handleDelete = () => {
    if (deleteId) {
      deleteArea(
        {
          resource: "areas",
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
          <h1 className="text-2xl font-bold">Áreas</h1>
          <p className="text-muted-foreground">{total} áreas en total</p>
        </div>
        <Button asChild>
          <Link href="/areas/create">
            <Plus className="h-4 w-4 mr-2" />
            Nueva área
          </Link>
        </Button>
      </div>

      <div className="flex gap-2 flex-wrap">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar áreas..."
            className="pl-8"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Select value={sectionFilter} onValueChange={setSectionFilter}>
          <SelectTrigger className="w-52">
            <SelectValue placeholder="Sección" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas las secciones</SelectItem>
            {sections.map((section: any) => (
              <SelectItem key={section.id} value={section.id.toString()}>
                {section.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {isLoading ? (
        <div className="text-center py-8">Cargando...</div>
      ) : areas.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          No se encontraron áreas
        </div>
      ) : (
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Código</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Sección</TableHead>
                <TableHead>Peso</TableHead>
                <TableHead>Orden</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {areas.map((area: any) => {
                const section = sectionMap.get(area.section_id);
                return (
                  <TableRow key={area.id}>
                    <TableCell className="font-mono text-xs">
                      {area.code}
                    </TableCell>
                    <TableCell className="font-medium">
                      <div>
                        {area.name}
                        {area.description && (
                          <p className="text-xs text-muted-foreground max-w-md truncate">
                            {area.description}
                          </p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {section?.name || `ID: ${area.section_id}`}
                      </Badge>
                    </TableCell>
                    <TableCell>{area.weight}</TableCell>
                    <TableCell>{area.sort_order}</TableCell>
                    <TableCell>
                      <Badge variant={area.is_active ? "default" : "secondary"}>
                        {area.is_active ? "Activa" : "Inactiva"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-2 justify-end">
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/areas/${area.id}/edit`}>
                            <Pencil className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setDeleteId(area.id)}
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
            <DialogTitle>¿Eliminar área?</DialogTitle>
            <DialogDescription>
              Esta acción no se puede deshacer. Se eliminarán todos los skills
              asociados a esta área.
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
