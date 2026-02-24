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
import { Plus, Search, Pencil, Trash2, Eye } from "lucide-react";

const DIFFICULTY_LABELS: Record<string, string> = {
  easy: "Fácil",
  medium: "Media",
  hard: "Difícil",
};

export const dynamic = "force-dynamic";

export default function QuestionsPage() {
  const [search, setSearch] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [page, setPage] = useState(1);

  const filters = [];
  if (difficultyFilter !== "all") {
    filters.push({
      field: "difficulty",
      operator: "eq" as const,
      value: difficultyFilter,
    });
  }

  const { result, query } = useList({
    resource: "questions",
    pagination: { currentPage: page, pageSize: 20 },
    filters,
    sorters: [{ field: "created_at", order: "desc" }],
    meta: { select: "id, stem, difficulty, is_active, created_at" },
  });

  const { mutate: deleteQuestion } = useDelete();

  const questions = result.data ?? [];
  const total = result.total ?? 0;
  const isLoading = query.isLoading;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Preguntas</h1>
          <p className="text-muted-foreground">{total} preguntas en total</p>
        </div>
        <Button asChild>
          <Link href="/questions/create">
            <Plus className="h-4 w-4 mr-2" />
            Nueva pregunta
          </Link>
        </Button>
      </div>

      <div className="flex gap-2 flex-wrap">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar preguntas..."
            className="pl-8"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
          <SelectTrigger className="w-36">
            <SelectValue placeholder="Dificultad" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas</SelectItem>
            <SelectItem value="easy">Fácil</SelectItem>
            <SelectItem value="medium">Media</SelectItem>
            <SelectItem value="hard">Difícil</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">ID</TableHead>
              <TableHead>Pregunta</TableHead>
              <TableHead className="w-28">Dificultad</TableHead>
              <TableHead className="w-32">Fecha</TableHead>
              <TableHead className="w-28 text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center py-8 text-muted-foreground"
                >
                  Cargando...
                </TableCell>
              </TableRow>
            ) : questions.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center py-8 text-muted-foreground"
                >
                  No hay preguntas
                </TableCell>
              </TableRow>
            ) : (
              questions.map((q) => (
                <TableRow key={q.id as string}>
                  <TableCell className="font-mono text-xs">
                    {q.id as string}
                  </TableCell>
                  <TableCell className="max-w-xs">
                    <p className="truncate text-sm">{q.stem as string}</p>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">
                      {DIFFICULTY_LABELS[q.difficulty as string] ??
                        (q.difficulty as string)}
                    </span>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(q.created_at as string).toLocaleDateString(
                      "es-MX",
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" asChild>
                        <Link href={`/questions/show/${q.id}`}>
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="ghost" size="icon" asChild>
                        <Link href={`/questions/edit/${q.id}`}>
                          <Pencil className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          deleteQuestion({
                            resource: "questions",
                            id: q.id as string,
                          })
                        }
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {total > 20 && (
        <div className="flex justify-between items-center text-sm text-muted-foreground">
          <span>
            Mostrando {(page - 1) * 20 + 1}–{Math.min(page * 20, total)} de{" "}
            {total}
          </span>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              Anterior
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => p + 1)}
              disabled={page * 20 >= total}
            >
              Siguiente
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
