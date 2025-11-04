import { NextResponse } from "next/server";

const BASE_URL = "https://api.mapbox.com/search/searchbox/v1/suggest";
const FALLBACK_SESSION_TOKEN = "06675552-1b97-4391-88ba-e20ff3c0942c";
const DEFAULT_LANGUAGE = process.env.NEXT_PUBLIC_MAPBOX_LANGUAGE ?? "en";
const DEFAULT_LIMIT = process.env.NEXT_PUBLIC_MAPBOX_SUGGEST_LIMIT ?? "10";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const searchText = searchParams.get("q")?.trim();

        if (!searchText) {
            return NextResponse.json({ suggestions: [] });
        }

        const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
        if (!mapboxToken) {
            console.error("Missing Mapbox access token");
            return NextResponse.json({ suggestions: [] }, { status: 500 });
        }

        const params = new URLSearchParams();
        params.set("q", searchText);

        const sessionToken =
            searchParams.get("session_token")?.trim() ||
            request.headers.get("x-session-token")?.trim() ||
            FALLBACK_SESSION_TOKEN;

        params.set("session_token", sessionToken);

        const uniqueKeys: string[] = [];
        const seenKeys = new Set<string>();

        for (const key of searchParams.keys()) {
            if (!seenKeys.has(key)) {
                seenKeys.add(key);
                uniqueKeys.push(key);
            }
        }

        for (const key of uniqueKeys) {
            if (key === "q" || key === "session_token") continue;

            const values = searchParams.getAll(key);
            for (const value of values) {
                const trimmed = value.trim();
                if (trimmed) {
                    params.append(key, trimmed);
                }
            }
        }

        if (!params.has("language") && DEFAULT_LANGUAGE) {
            params.set("language", DEFAULT_LANGUAGE);
        }

        if (!params.has("limit") && DEFAULT_LIMIT) {
            params.set("limit", DEFAULT_LIMIT);
        }

        params.set("access_token", mapboxToken);

        const res = await fetch(`${BASE_URL}?${params.toString()}`, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!res.ok) {
            const error = await res.text();
            console.error("Mapbox suggest error", res.status, error);
            return NextResponse.json({ suggestions: [] }, { status: res.status });
        }

        const searchResult = await res.json();
        return NextResponse.json(searchResult);
    } catch (error) {
        console.error("Search address error", error);
        return NextResponse.json({ suggestions: [] }, { status: 500 });
    }
}