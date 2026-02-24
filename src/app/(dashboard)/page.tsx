"use client";

import { useList } from "@refinedev/core";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { FileText, CheckCircle, Clock, Archive, AlertTriangle } from "lucide-react";

export default function DashboardPage() {
  const { result } = useList({
    resource: "questions",
    pagination: { pageSize: 1 },
    meta: { select: "id" },
  });

  const total = result.total ?? 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Vista general del banco de preguntas</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total preguntas</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{total}</div>
            <p className="text-xs text-muted-foreground">en el banco</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Publicadas</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">—</div>
            <p className="text-xs text-muted-foreground">activas en la app</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">En revisión</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">—</div>
            <p className="text-xs text-muted-foreground">pendientes de aprobación</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Borradores</CardTitle>
            <Archive className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">—</div>
            <p className="text-xs text-muted-foreground">sin publicar</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Cobertura por Sección</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { name: "Comprensión Lectora", current: 0, target: 30 },
              { name: "Redacción Indirecta", current: 0, target: 30 },
              { name: "Pensamiento Matemático", current: 0, target: 30 },
              { name: "Física", current: 0, target: 24 },
              { name: "Química", current: 0, target: 24 },
              { name: "Inglés", current: 0, target: 30 },
            ].map((section) => {
              const pct = section.target > 0 ? Math.round((section.current / section.target) * 100) : 0;
              return (
                <div key={section.name} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span>{section.name}</span>
                    <span className="text-muted-foreground">
                      {section.current}/{section.target}
                    </span>
                  </div>
                  <Progress value={pct} className="h-2" />
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-yellow-500" />
              Alertas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Alert>
              <AlertDescription>
                Conecta tu base de datos de Supabase para ver alertas en tiempo real.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
