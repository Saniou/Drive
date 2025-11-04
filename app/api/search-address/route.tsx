import { NextResponse } from "next/server";

const BASE_URL = "https://api.mapbox.com/search/searchbox/v1/suggest";
const ACCESS_TOKEN = process.env.MAPBOX_ACCESS_TOKEN!;
const FALLBACK_SESSION = "06675552-1b97-4391-88ba-e20ff3c0942c";

export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const sp = url.searchParams;

        const q = (sp.get("q") || "").trim();
        const sessionToken = sp.get("session_token") || FALLBACK_SESSION;

        // мʼякі валідації, щоб уникати 422
        if (!ACCESS_TOKEN || q.length < 2) {
            return NextResponse.json({ suggestions: [] }, { status: 200 });
        }
        if (/^\d+$/.test(q) && q.length < 3) {
            return NextResponse.json({ suggestions: [] }, { status: 200 });
        }

        // базові параметри
        const params = new URLSearchParams();
        params.set("q", q);
        params.set("language", "uk,en");
        params.set("limit", "10");
        params.set("session_token", sessionToken);
        params.set("types", "address,place,street,poi");

        // Дозволені проброси з клієнта (без Set/for...of)
        const passKeys = ["country", "proximity", "bbox"];
        for (let i = 0; i < passKeys.length; i++) {
            const k = passKeys[i];
            const vals = sp.getAll(k);
            for (let j = 0; j < vals.length; j++) {
                params.append(k, vals[j]);
            }
        }

        const reqUrl = `${BASE_URL}?${params.toString()}&access_token=${ACCESS_TOKEN}`;
        const res = await fetch(reqUrl, {
            headers: { "Content-Type": "application/json" },
            cache: "no-store",
        });

        if (!res.ok) {
            // 4xx (в т.ч. 422) — тихо повертаємо порожній список
            return NextResponse.json({ suggestions: [] }, { status: 200 });
        }

        const data = await res.json();
        const raw: any[] = Array.isArray(data?.suggestions) ? data.suggestions : [];

        // нормалізація під фронт
        const suggestions = raw.map((s: any) => {
            const label =
                s.place_formatted ??
                s.name ??
                s.feature_name ??
                ([s.address, s.street, s.place, s.city, s.region, s.country]
                    .filter(Boolean)
                    .join(", ") || "Unknown");

            return {
                mapbox_id: s.mapbox_id,
                full_address: label,
            };
        });

        return NextResponse.json({ suggestions }, { status: 200 });
    } catch {
        return NextResponse.json({ suggestions: [] }, { status: 200 });
    }
}
