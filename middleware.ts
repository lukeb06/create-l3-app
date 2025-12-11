import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { AccessToken, createAccessRefreshPair, RefreshToken } from 'simple-web-tokens';

const PKEY = process.env.SECRET || 'key';

export async function middleware(req: NextRequest) {
    const access = req.cookies.get('token')?.value;
    const refresh = req.cookies.get('refresh')?.value;
    if (!access) return NextResponse.next();
    const at = AccessToken.parse(access, PKEY);

    if (at.expired) {
        if (!refresh) return NextResponse.next();
        const rt = RefreshToken.parse(refresh, at, PKEY);
        if (rt.expired) return NextResponse.next();

        const [newAccessToken, newRefreshToken] = createAccessRefreshPair(at.userId, PKEY);
        const res = NextResponse.next();
        res.cookies.set('token', newAccessToken);
        res.cookies.set('refresh', newRefreshToken);
        return res;
    }

    return NextResponse.next();
}
