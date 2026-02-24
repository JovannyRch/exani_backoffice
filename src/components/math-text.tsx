"use client";

import { useEffect, useRef } from "react";
import katex from "katex";
import "katex/dist/katex.min.css";

interface MathTextProps {
  text: string;
  className?: string;
}

/**
 * Componente para renderizar texto con fórmulas matemáticas en LaTeX
 * Soporta:
 * - Fórmulas inline: $formula$
 * - Fórmulas en bloque: $$formula$$
 */
export function MathText({ text, className = "" }: MathTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !text) return;

    try {
      // Procesar el texto para encontrar y renderizar fórmulas LaTeX
      const processedHTML = processLatex(text);
      containerRef.current.innerHTML = processedHTML;
    } catch (error) {
      console.error("Error rendering LaTeX:", error);
      containerRef.current.textContent = text;
    }
  }, [text]);

  return <div ref={containerRef} className={className} />;
}

/**
 * Procesa un texto para convertir fórmulas LaTeX a HTML usando KaTeX
 */
function processLatex(text: string): string {
  if (!text) return "";

  let processed = text;

  // Primero procesar bloques $$...$$ (fórmulas en bloque)
  processed = processed.replace(/\$\$(.*?)\$\$/g, (match, formula) => {
    try {
      return katex.renderToString(formula.trim(), {
        displayMode: true,
        throwOnError: false,
      });
    } catch (error) {
      console.error("Error rendering block math:", error);
      return match;
    }
  });

  // Luego procesar inline $...$ (fórmulas inline)
  processed = processed.replace(/\$([^\$]+?)\$/g, (match, formula) => {
    try {
      return katex.renderToString(formula.trim(), {
        displayMode: false,
        throwOnError: false,
      });
    } catch (error) {
      console.error("Error rendering inline math:", error);
      return match;
    }
  });

  // Convertir saltos de línea a <br> para preservar formato
  processed = processed.replace(/\n/g, "<br>");

  return processed;
}
