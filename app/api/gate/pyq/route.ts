import { NextRequest, NextResponse } from "next/server";
import { getPyqManifest } from "@/lib/gate";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const yearParam = searchParams.get("year");
  const setParam = searchParams.get("set");
  const paperKey = searchParams.get("paper");

  // If paperKey or year is specified, return the full questions for that paper
  if (paperKey || yearParam) {
    const key = paperKey || (setParam && Number(setParam) > 1 ? `${yearParam}-s${setParam}` : `${yearParam}-s1`);
    try {
      // Try with -s1 or direct key
      let paperModule;
      try {
        paperModule = await import(`@/data/gate/pyq/${key}.json`);
      } catch {
        paperModule = await import(`@/data/gate/pyq/${yearParam}.json`);
      }
      return NextResponse.json(paperModule.default);
    } catch {
      return NextResponse.json({ error: `Paper ${key} not found` }, { status: 404 });
    }
  }

  // Otherwise return manifest list
  const manifest = getPyqManifest();
  return NextResponse.json({
    totalPapers: manifest.length,
    papers: manifest
  });
}
