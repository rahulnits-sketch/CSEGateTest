import { NextRequest, NextResponse } from "next/server";
import { getSubjectsManifest } from "@/lib/gate";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const subjectSlug = searchParams.get("subject") || searchParams.get("id");

  if (subjectSlug) {
    try {
      const subjectModule = await import(`@/data/gate/subjects/${subjectSlug}.json`);
      return NextResponse.json(subjectModule.default);
    } catch {
      return NextResponse.json({ error: `Subject ${subjectSlug} not found` }, { status: 404 });
    }
  }

  const manifest = getSubjectsManifest();
  return NextResponse.json({
    totalSubjects: manifest.length,
    subjects: manifest
  });
}
