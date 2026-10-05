import { NextRequest, NextResponse } from "next/server";
import { getMockPresets, getGateQuestionsForTest } from "@/lib/gate";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const testId = searchParams.get("id");

  if (testId) {
    const testData = await getGateQuestionsForTest(testId);
    if (!testData) {
      return NextResponse.json({ error: `Mock test ${testId} not found` }, { status: 404 });
    }
    return NextResponse.json(testData);
  }

  const presets = getMockPresets();
  return NextResponse.json({
    totalMocks: presets.length,
    mocks: presets
  });
}
