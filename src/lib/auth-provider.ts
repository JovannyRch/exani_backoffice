import { AuthProvider } from "@refinedev/core";
import { supabaseClient } from "./supabase";

export const authProvider: AuthProvider = {
  login: async ({ email, password }) => {
    const { error } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { success: false, error };
    }

    return { success: true, redirectTo: "/" };
  },

  logout: async () => {
    const { error } = await supabaseClient.auth.signOut();

    if (error) {
      return { success: false, error };
    }

    return { success: true, redirectTo: "/login" };
  },

  check: async () => {
    const { data } = await supabaseClient.auth.getSession();

    if (data.session) {
      return { authenticated: true };
    }

    return {
      authenticated: false,
      redirectTo: "/login",
    };
  },

  getPermissions: async () => {
    const { data } = await supabaseClient.auth.getUser();

    if (data.user) {
      const { data: profile } = await supabaseClient
        .from("profiles")
        .select("role")
        .eq("id", data.user.id)
        .single();

      return profile?.role ?? "author";
    }

    return null;
  },

  getIdentity: async () => {
    const { data } = await supabaseClient.auth.getUser();

    if (data.user) {
      const { data: profile } = await supabaseClient
        .from("profiles")
        .select("*")
        .eq("id", data.user.id)
        .single();

      return {
        id: data.user.id,
        email: data.user.email,
        name: profile?.full_name ?? data.user.email,
        avatar: profile?.avatar_url,
      };
    }

    return null;
  },

  onError: async (error) => {
    if (error?.statusCode === 401 || error?.statusCode === 403) {
      return { logout: true, redirectTo: "/login", error };
    }

    return { error };
  },
};
