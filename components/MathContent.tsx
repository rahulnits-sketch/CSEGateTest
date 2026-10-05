"use client";

import React, { useEffect, useRef } from "react";

interface MathContentProps {
  content: string;
  className?: string;
  inline?: boolean;
}

/**
 * Renders HTML question stems with LaTeX math formatting and image path resolution.
 */
export default function MathContent({ content, className = "", inline = false }: MathContentProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Format content: fix image src paths and replace basic LaTeX symbols if needed
  const formattedHtml = React.useMemo(() => {
    if (!content) return "";
    let html = String(content);

    // Fix relative image paths from GateQA (e.g. question-images/xxx.png -> /question-images/xxx.png)
    html = html.replace(/src=["'](?:\.\/)?question-images\//gi, 'src="/question-images/');
    html = html.replace(/src=["'](?:\.\/)?images\//gi, 'src="/images/');

    // Basic LaTeX cleanup if raw LaTeX is displayed
    // E.g. \_ -> _
    html = html.replace(/\\_/g, "_");

    return html;
  }, [content]);

  useEffect(() => {
    if (!containerRef.current) return;
    
    // If window.MathJax is available, typeset this container
    if (typeof window !== "undefined" && (window as any).MathJax && (window as any).MathJax.typesetPromise) {
      (window as any).MathJax.typesetPromise([containerRef.current]).catch(() => {});
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
