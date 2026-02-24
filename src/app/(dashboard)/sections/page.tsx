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

const SECTION_TYPES: Record<
  string,
  { label: string; variant: "default" | "secondary" | "outline" }
> = {
  transversal: { label: "Transversal", variant: "default" },
  module: { label: "Módulo", variant: "secondary" },
  diagnostic: { label: "Diagnóstico", variant: "outline" },
};

export default function SectionsPage() {
  const [search, setSearch] = useState("");
  const [examFilter, setExamFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const filters = [];
  if (examFilter !== "all") {
    filters.push({
      field: "exam_id",
      operator: "eq" as const,
      value: parseInt(examFilter),
    });
  }
  if (typeFilter !== "all") {
    filters.push({ field: "type", operator: "eq" as const, value: typeFilter });
  }
  if (search) {
    filters.push({
      field: "name",
      operator: "contains" as const,
      value: search,
    });
  }

  const { result: sectionsResult, query: sectionsQuery } = useList({
    resource: "sections",
    filters,
    sorters: [{ field: "sort_order", order: "asc" }],
    meta: {
      select:
        "id, code, name, type, num_questions, sort_order, is_active, exam_id",
    },
  });

  const { result: examsResult } = useList({
    resource: "exams",
    pagination: { pageSize: 100 },
    meta: { select: "id, name, code" },
  });

  const { mutate: deleteSection, mutation: deleteMutation } = useDelete();

  const sections = sectionsResult.data ?? [];
  const exams = examsResult.data ?? [];
  const total = sectionsResult.total ?? 0;
  const isLoading = sectionsQuery.isLoading;

  type Exam = { id: number; name: string; code: string };
  type Section = {
    id: number;
    code: string;
    name: string;
    type: string;
    num_questions: number;
    sort_order: number;
    is_active: boolean;
    exam_id: number;
  };

  const handleDelete = () => {
    if (deleteId) {
      deleteSection(
        {
          resource: "sections",
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
          <h1 className="text-2xl font-bold">Secciones</h1>
          <p className="text-muted-foreground">{total} secciones en total</p>
        </div>
        <Button asChild>
          <Link href="/sections/create">
            <Plus className="h-4 w-4 mr-2" />
            Nueva sección
          </Link>
        </Button>
      </div>

      <div className="flex gap-2 flex-wrap">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar secciones..."
            className="pl-8"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Select value={examFilter} onValueChange={setExamFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Examen" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los exámenes</SelectItem>
            {(exams as Exam[]).map((exam) => (
              <SelectItem key={exam.id} value={exam.id.toString()}>
                {exam.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los tipos</SelectItem>
            <SelectItem value="transversal">Transversal</SelectItem>
            <SelectItem value="module">Módulo</SelectItem>
            <SelectItem value="diagnostic">Diagnóstico</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {isLoading ? (
        <div className="text-center py-8">Cargando...</div>
      ) : sections.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          No se encontraron secciones
        </div>
      ) : (
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Código</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Preguntas</TableHead>
                <TableHead>Orden</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(sections as Section[]).map((section) => {
                const typeInfo =
                  SECTION_TYPES[section.type] || SECTION_TYPES.transversal;
                return (
                  <TableRow key={section.id}>
                    <TableCell className="font-mono text-xs">
                      {section.code}
                    </TableCell>
                    <TableCell className="font-medium">
                      {section.name}
                    </TableCell>
                    <TableCell>
                      <Badge variant={typeInfo.variant}>{typeInfo.label}</Badge>
                    </TableCell>
                    <TableCell>{section.num_questions}</TableCell>
                    <TableCell>{section.sort_order}</TableCell>
                    <TableCell>
                      <Badge
                        variant={section.is_active ? "default" : "secondary"}
                      >
                        {section.is_active ? "Activa" : "Inactiva"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-2 justify-end">
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/sections/${section.id}/edit`}>
                            <Pencil className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setDeleteId(section.id)}
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
            <DialogTitle>¿Eliminar sección?</DialogTitle>
            <DialogDescription>
              Esta acción no se puede deshacer. Se eliminarán todas las áreas y
              skills asociadas a esta sección.
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
