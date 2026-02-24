"use client";

import { Refine } from "@refinedev/core";
import { dataProvider, liveProvider } from "@refinedev/supabase";
import routerProvider from "@refinedev/nextjs-router";
import { supabaseClient } from "@/lib/supabase";
import { authProvider } from "@/lib/auth-provider";
import { TooltipProvider } from "@/components/ui/tooltip";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TooltipProvider>
      <Refine
        dataProvider={dataProvider(supabaseClient)}
        liveProvider={liveProvider(supabaseClient)}
        authProvider={authProvider}
        routerProvider={routerProvider}
        resources={[
          {
            name: "questions",
            list: "/questions",
            create: "/questions/create",
            edit: "/questions/edit/:id",
            show: "/questions/show/:id",
            meta: { label: "Preguntas" },
          },
          {
            name: "exams",
            list: "/exams",
            create: "/exams/create",
            edit: "/exams/edit/:id",
            meta: { label: "Exámenes" },
          },
          {
            name: "sections",
            list: "/sections",
            meta: { label: "Estructura", hide: true },
          },
          {
            name: "media",
            list: "/media",
            meta: { label: "Multimedia" },
          },
          {
            name: "analytics",
            list: "/analytics",
            meta: { label: "Analíticas" },
          },
          {
            name: "users",
            list: "/users",
            meta: { label: "Usuarios" },
          },
        ]}
        options={{
          syncWithLocation: true,
          warnWhenUnsavedChanges: true,
          liveMode: "auto",
        }}
      >
        {children}
      </Refine>
    </TooltipProvider>
  );
}
