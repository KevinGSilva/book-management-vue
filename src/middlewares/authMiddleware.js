import api from "@/plugins/axios";

export default async function authMiddleware({ to, next }) {
    const token = sessionStorage.getItem("auth_token");

    if (!token) {
        console.error("authMiddleware", "no token");
        return next({ name: "login" });
    }

    try {
      await api.get("/api/check-token");
    } catch (error) {
        return next({ name: "login" });
    }

    next();
}