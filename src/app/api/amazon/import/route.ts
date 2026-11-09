import { NextRequest, NextResponse } from "next/server";
import { importProductFromAmazon, importBulkFromAmazon, extractAsin } from "@/lib/amazon-api";
import { Region } from "@/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { asinOrUrl, items, region = "IN", customAffiliateTag } = body;

    // Bulk import mode
    if (items && Array.isArray(items) && items.length > 0) {
      const results = await importBulkFromAmazon(items, region as Region, customAffiliateTag);
      return NextResponse.json({
        success: true,
        count: results.length,
        data: results
      });
    }

    // Single import mode
    if (!asinOrUrl) {
      return NextResponse.json(
        { error: "Missing required parameter: asinOrUrl or items array" },
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

    const importedProduct = await importProductFromAmazon(asinOrUrl, region as Region, customAffiliateTag);

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
