import create from "zustand";
import { persist } from "zustand/middleware";
import { get, post } from "./axiosClient";

const useStore = create(
    persist(
        (set) => ({
            loading: false,
            hasErrors: false,
            usuario: null,
            roles: [],
            empresas: [],
            logout: () => set(() => ({ usuario: null })),
            login: async ({ email, password }) => {
                set(() => ({ loading: true }));
                try {
                    const usuario = await post("/autenticacion/login", { correo: email, password });
                    set(() => ({ usuario, loading: false }));
                    return usuario.access_token;
                } catch (err) {
                    set(() => ({ hasErrors: true, loading: false }));
                    return null;
                }
            },
            getEmpresas: async () => {
                set(() => ({ loading: true }));
                try {
                    const {data} = await get("/empresas");
                    set(() => ({ empresas: data, loading: false }));
                } catch (err) {
                    set(() => ({ hasErrors: true, loading: false }));
                }
            },
            getRoles: async () => {
                set(() => ({ loading: true }));
                try {
                    const roles = await get("/roles");
                    set(() => ({ roles, loading: false }));
                } catch (err) {
                    set(() => ({ hasErrors: true, loading: false }));
                }
            },
        }),
        { name: "store" }
    )
);

export default useStore;
