import { apiFetch } from "../api";

export interface RegisterClienteDto {
  nombre: string;
  apellido: string;
  email: string;
  telefono?: string | null;     // opcional
  password: string;

  calle: string;
  numeroCasa: string;
  numeroDepto?: string | null;  // opcional
  comuna: string;
  region: string;
}

export async function registerCliente(data: RegisterClienteDto) {
  return apiFetch("/api/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

