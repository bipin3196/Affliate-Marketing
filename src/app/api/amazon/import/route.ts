import { NextRequest, NextResponse } from "next/server";
import { importProductFromAmazon, extractAsin } from "@/lib/amazon-api";
import { Region } from "@/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { asinOrUrl, region = "IN" } = body;

    if (!asinOrUrl) {
      return NextResponse.json(
        { error: "Missing required parameter: asinOrUrl" },
        { status: 400 }
      );
    }

    const asin = extractAsin(asinOrUrl);
    if (!asin) {
      return NextResponse.json(
        { error: "Could not detect a valid 10-character Amazon ASIN from the provided input." },
        { status: 400 }
      );
    }

    const importedProduct = await importProductFromAmazon(asinOrUrl, region as Region);

    return NextResponse.json({
      success: true,
      asin,
      data: importedProduct
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Failed to import product from Amazon." },
      { status: 500 }
    );
  }
}
