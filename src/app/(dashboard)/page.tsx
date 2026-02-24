"use client";

import { useList } from "@refinedev/core";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  FileText,
  CheckCircle,
  BarChart3,
  AlertTriangle,
  TrendingUp,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

type Section = {
  id: number;
  name: string;
  num_questions: number;
};

export default function DashboardPage() {
  // Total de preguntas
  const { result: questionsResult, query: questionsQuery } = useList({
    resource: "questions",
    pagination: { pageSize: 1000 },
    meta: { select: "id, difficulty, is_active, skill_id" },
  });

  // Secciones con su target de preguntas
  const { result: sectionsResult } = useList({
    resource: "sections",
    pagination: { pageSize: 100 },
    meta: { select: "id, name, num_questions" },
  });

  // Skills para contar preguntas por sección
  const { result: skillsResult } = useList({
    resource: "skills",
    pagination: { pageSize: 1000 },
    meta: { select: "id, area_id" },
  });

  const { result: areasResult } = useList({
    resource: "areas",
    pagination: { pageSize: 1000 },
    meta: { select: "id, section_id" },
  });

  const questions = questionsResult?.data ?? [];
  const sections = sectionsResult?.data ?? [];
  const skills = skillsResult?.data ?? [];
  const areas = areasResult?.data ?? [];
  const isLoading = questionsQuery.isLoading;

  // Calcular estadísticas
  const total = questions.length;
  const active = questions.filter((q: any) => q.is_active).length;
  const byDifficulty = {
    easy: questions.filter((q: any) => q.difficulty === "easy").length,
    medium: questions.filter((q: any) => q.difficulty === "medium").length,
    hard: questions.filter((q: any) => q.difficulty === "hard").length,
  };

  // Contar preguntas por sección
  const questionsBySection = sections.map((section: Section) => {
    // Encontrar áreas de esta sección
    const sectionAreas = areas.filter((a: any) => a.section_id === section.id);
    const areaIds = sectionAreas.map((a: any) => a.id);

    // Encontrar skills de estas áreas
    const sectionSkills = skills.filter((s: any) =>
      areaIds.includes(s.area_id),
    );
    const skillIds = sectionSkills.map((s: any) => s.id);

    // Contar preguntas de estos skills
    const count = questions.filter((q: any) =>
      skillIds.includes(q.skill_id),
    ).length;

    return {
      name: section.name,
      current: count,
      target: section.num_questions || 30,
    };
  });

  // Detectar alertas
  const alerts = questionsBySection
    .filter((s) => s.current < s.target)
    .map((s) => ({
      message: `${s.name}: Faltan ${s.target - s.current} preguntas`,
      severity: s.current / s.target < 0.5 ? "high" : "medium",
    }));

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Vista general del banco de preguntas
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardHeader className="pb-2">
                <Skeleton className="h-4 w-24" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-16" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Vista general del banco de preguntas EXANI
        </p>
      </div>

      {/* Estadísticas Generales */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total Preguntas
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{total}</div>
            <p className="text-xs text-muted-foreground">en el banco</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Activas</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{active}</div>
            <p className="text-xs text-muted-foreground">
              {total > 0 ? Math.round((active / total) * 100) : 0}% del total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Dificultad Media
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {byDifficulty.medium}
            </div>
            <p className="text-xs text-muted-foreground">
              {byDifficulty.easy} fácil · {byDifficulty.hard} difícil
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Cobertura Total
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {sections.length > 0
                ? Math.round(
                    (questionsBySection.reduce(
                      (sum, s) => sum + Math.min(s.current, s.target),
                      0,
                    ) /
                      questionsBySection.reduce(
                        (sum, s) => sum + s.target,
                        0,
                      )) *
                      100,
                  )
                : 0}
              %
            </div>
            <p className="text-xs text-muted-foreground">del objetivo total</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Cobertura por Sección */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Cobertura por Sección</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {questionsBySection.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No hay secciones configuradas
              </p>
            ) : (
              questionsBySection.map((section) => {
                const pct =
                  section.target > 0
                    ? Math.round((section.current / section.target) * 100)
                    : 0;
                const color =
                  pct >= 80
                    ? "bg-green-500"
                    : pct >= 50
                      ? "bg-yellow-500"
                      : "bg-red-500";
                return (
                  <div key={section.name} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{section.name}</span>
                      <span className="text-muted-foreground">
                        {section.current}/{section.target} ({pct}%)
                      </span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full ${color} transition-all`}
                        style={{ width: `${Math.min(pct, 100)}%` }}
                      />
                    </div>
                  </div>
                );
              })
            )}
          </CardContent>
        </Card>

        {/* Alertas */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-yellow-500" />
              Alertas y Recomendaciones
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {alerts.length === 0 ? (
              <Alert>
                <AlertDescription className="text-green-600">
                  ✓ Todas las secciones tienen suficiente cobertura
                </AlertDescription>
              </Alert>
            ) : (
              <>
                {alerts.slice(0, 5).map((alert, idx) => (
                  <Alert
                    key={idx}
                    variant={
                      alert.severity === "high" ? "destructive" : "default"
                    }
                  >
                    <AlertDescription>{alert.message}</AlertDescription>
                  </Alert>
                ))}
                {alerts.length > 5 && (
                  <p className="text-xs text-muted-foreground text-center">
                    +{alerts.length - 5} alertas más
                  </p>
                )}
              </>
            )}

            {total === 0 && (
              <Alert>
                <AlertDescription>
                  No hay preguntas en el banco. Comienza creando preguntas desde
                  el menú.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Distribución de Dificultad */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            Distribución de Dificultad
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            {[
              {
                level: "Fácil",
                count: byDifficulty.easy,
                color: "text-green-600",
                icon: "🟢",
              },
              {
                level: "Media",
                count: byDifficulty.medium,
                color: "text-yellow-600",
                icon: "🟡",
              },
              {
                level: "Difícil",
                count: byDifficulty.hard,
                color: "text-red-600",
                icon: "🔴",
              },
            ].map((diff) => (
              <div key={diff.level} className="text-center space-y-1">
                <div className="text-2xl">{diff.icon}</div>
                <div className={`text-2xl font-bold ${diff.color}`}>
                  {diff.count}
                </div>
                <div className="text-sm text-muted-foreground">
                  {diff.level}
                </div>
                <div className="text-xs text-muted-foreground">
                  {total > 0 ? Math.round((diff.count / total) * 100) : 0}%
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
