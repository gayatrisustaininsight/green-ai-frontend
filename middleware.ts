import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(req: NextRequest, res: NextResponse) {
    const token = req.cookies.get("token")?.value;

    if (!token) {
        return NextResponse.redirect(new URL("/login", req.url));
    }
    if (req.url.includes("/login") || req.url.includes("/register") && token) {
        return NextResponse.redirect(new URL("/dashboard", req.url));

    }
    return NextResponse.next();




}

export const config = {

}