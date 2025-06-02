export async function GET(request) {
    const from = request.nextUrl.searchParams.get("from");
    const to = request.nextUrl.searchParams.get("to");

    const res = await fetch(
        `${process.env.CURRENCY_CONVERTOR_URL}?access_key=${process.env.CURRENCY_CONVERTOR_KEY}&source=${from}&currencies=${to}`
    );

    if (!res.ok)
        return new Response("Failed to fetch currency rate", {
            status: res.status,
        });

    const currencyRate = await res.json();
    return Response.json(currencyRate);
}
