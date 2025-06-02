export async function GET(request) {
    const lat = request.nextUrl.searchParams.get("lat");
    const lng = request.nextUrl.searchParams.get("lng");
    const language = request.nextUrl.searchParams.get("language");

    const addressRes = await fetch(
        `${process.env.OPENCAGE_URL}?q=${lat}+${lng}&key=${process.env.OPENCAGE_KEY}&language=${language}`
    );

    if (!addressRes.ok)
        return new Response("Failed to fetch address", {
            status: addressRes.status,
        });

    const address = await addressRes.json();
    return Response.json(address);
}
