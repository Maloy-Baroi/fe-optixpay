import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// Example user permissions fetched from backend
async function getUserPermissions() {
  // fetch permission or get permissions from user info in cookies
  const response = await fetch(
    "https://raw.githubusercontent.com/abdarker/qrcode-gen/refs/heads/master/permissions.json"
    // {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // }
  );
  const data = await response.json();
  return data.permissions;
  //   if (response.ok) {
  //     const data = await response.json();
  //     return data.permissions;
  //   } else {
  //     throw new Error("Failed to fetch permissions");
  //   }
}

// Define required permissions for certain routes
const routePermissions: Record<string, string> = {
  "/admin": "canViewAdminDashboard",
  "/transactions": "canViewTransactions",
  "/transactions/pay-in": "canViewPayIn",
  "/transactions/pay-out": "canViewPayOut",
  "/balances": "canViewBalances",
  "/settings": "canManageSettings",
  // Add more routes and their corresponding permissions
};

export async function middleware(req: NextRequest) {
  const tokenCookie = req.cookies.get("accessToken"); // Retrieve token from cookies or session
  const url = req.nextUrl;
  const token = tokenCookie ? tokenCookie.value : null;

  // Allow public access to /login and /registration
  if (url.pathname === "/signin" ||
    url.pathname === "/signup" ||
    url.pathname === "/verify" ||
    url.pathname==="/profile-setup" ||
    url.pathname==="/bkash-pay" || 
    url.pathname==="/call-back") {
    return NextResponse.next();
  }
  // Redirect to login if no token is present
  if (!token) {
    return NextResponse.redirect(new URL("/signin", url));
  }

  try {
    const userPermissions = await getUserPermissions();

    // Get the permission needed for the current route
    const requiredPermission = routePermissions[url.pathname];

    // Check if the user has the required permission
    if (requiredPermission && !userPermissions[requiredPermission]) {
      // If user doesn't have the permission, redirect to 'no access' page
      return NextResponse.redirect(new URL("/no-access", url));
    }

    // If user has permission, continue to the requested page
    return NextResponse.next();
  } catch (error) {
    console.error("Error fetching user permissions:", error);

    // Redirect to error or login page on failure
    return NextResponse.redirect(new URL("/signin", url));
  }
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
