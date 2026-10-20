import { apiFetch } from "../api";

export interface AdminUser {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  telefono?: string | null;  // puede venir null o no venir
  enabled: boolean;
}

export interface CreateAdminUserDto {
  nombre: string;
  apellido: string;
  email: string;
  telefono?: string;         // opcional también al crear
  password: string;
}

export interface UpdateAdminUserDto {
  nombre: string;
  apellido: string;
  email: string;
  telefono?: string;
  enabled: boolean;
  password?: string; // opcional, solo si quieres cambiarla
}

export async function getAdminUsers(): Promise<AdminUser[]> {
  return apiFetch("/api/admin/users");
}

export async function createAdminUser(
  data: CreateAdminUserDto
): Promise<AdminUser> {
  return apiFetch("/api/admin/users", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateAdminUser(
  id: number,
  data: UpdateAdminUserDto
): Promise<AdminUser> {
  return apiFetch(`/api/admin/users/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function deleteAdminUser(id: number): Promise<void> {
  await apiFetch(`/api/admin/users/${id}`, {
    method: "DELETE",
  });
}



