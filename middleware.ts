import { auth } from "@/app/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  // Проверяем авторизацию и исключаем только главную страницу и маршруты авторизации
  const isAuthRoute = req.nextUrl.pathname.startsWith("/api/auth");
  const isHomePage = req.nextUrl.pathname === "/";

  if (!req.auth && !isAuthRoute && !isHomePage) {
    return NextResponse.redirect(new URL("/api/auth/signin", req.nextUrl.origin));
  }
});

export const config = {
  // Защищаем все маршруты, кроме статических ресурсов и изображений
  matcher: [
    // Исключаем статические файлы и ресурсы
    "/((?!_next/static|_next/image|favicon.ico).*)",
    // Включаем все API маршруты кроме auth
    "/api/(?!auth).*",
  ],
};


