import api from "@/plugins/axios";

export default async function authMiddleware({ to, next }) {
    const token = sessionStorage.getItem("auth_token");

    const user = null;

    try {
      const response = await api.get("/api/user");
      user = response.data;

      if (!user.is_admin){
        return next({ name: "login" });
      }
    } catch (error) {
        return next({ name: "login" });
    }

    next();
}