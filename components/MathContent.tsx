"use client";

import React, { useEffect, useRef } from "react";

interface MathContentProps {
  content: string;
  className?: string;
  inline?: boolean;
}

type MathJaxWindow = Window & {
  MathJax?: {
    typesetPromise?: (elements: HTMLElement[]) => Promise<void>;
  };
};

/**
 * Renders HTML question stems with LaTeX math formatting and image path resolution.
 */
export default function MathContent({ content, className = "", inline = false }: MathContentProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Format content: fix image src paths and replace basic LaTeX symbols if needed
  const formattedHtml = React.useMemo(() => {
    if (!content) return "";
    let html = String(content);

    // Fix all relative/absolute image paths from GateQA
    // Handles:
    // - /Gate_QA/question-images/xxx.webp -> /question-images/xxx.webp
    // - Gate_QA/question-images/xxx.webp  -> /question-images/xxx.webp
    // - ./question-images/xxx.webp       -> /question-images/xxx.webp
    // - question-images/xxx.webp         -> /question-images/xxx.webp
    html = html.replace(/src=["'](?:\/|\.\/)?(?:Gate_QA\/)?question-images\//gi, 'src="___Q_IMG___/');
    html = html.replace(/src=["'](?:\/|\.\/)?(?:Gate_QA\/)?images\//gi, 'src="/images/');
    html = html.replace(/src="___Q_IMG___\//g, 'src="/question-images/');

    // Basic LaTeX cleanup if raw LaTeX is displayed
    // E.g. \_ -> _
    html = html.replace(/\\_/g, "_");

    return html;
  }, [content]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const mathJax = (window as MathJaxWindow).MathJax;
    if (mathJax?.typesetPromise) {
      mathJax.typesetPromise([container]).catch((error: unknown) => {
        console.error("MathJax typesetting failed", error);
      });
    }
  }, [formattedHtml]);

  if (inline) {
    return (
      <span
        ref={containerRef}
        className={`inline-math-content ${className}`}
        dangerouslySetInnerHTML={{ __html: formattedHtml }}
      />
    );
  }

  return (
    <div
      ref={containerRef}
      className={`math-content prose prose-invert max-w-none text-zinc-100 ${className}`}
      dangerouslySetInnerHTML={{ __html: formattedHtml }}
    />
  );
}
