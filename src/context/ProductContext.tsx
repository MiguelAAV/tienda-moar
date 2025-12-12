// src/context/ProductContext.tsx

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Product, Brand } from "../assets/products";
import { apiFetch } from "../api";

interface ProductContextType {
  products: Product[];
  addProduct: (p: Product) => Promise<void>;
  deleteProduct: (id: number) => Promise<void>;
  updateProduct: (p: Product) => Promise<void>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

// ====== TIPOS DEL BACKEND ======
type ProductApi = {
  id: number;
  nombre: string;
  brand: string;
  descripcion: string;
  precio: number;
  stock: number;
  imageUrl?: string;   // ahora viene del backend
  liberado?: string;   // nuevo
};


// Formatear CLP para mostrar en frontend
const fmtCLP = (n: number) =>
  new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(n);


// De backend -> a tipo Product del frontend
function mapFromApi(p: ProductApi): Product {
  return {
    id: p.id,
    nombre: p.nombre,
    brand: p.brand as Brand,
    descripcion: p.descripcion,
    precioNum: p.precio,
    precio: fmtCLP(p.precio),
    imagen: p.imageUrl || "",   // ocupamos la URL de la BD
    stock: p.stock,
    liberado: (p.liberado as Product["liberado"]) ?? "LIBERADO",
  };
}

// De Product (formulario admin / UI) -> payload para backend
function mapToApi(p: Product): Omit<ProductApi, "id"> {
  let num: number;

  if (typeof p.precioNum === "number") {
    num = p.precioNum;
  } else {
    const raw =
      typeof p.precio === "string" ? p.precio.replace(/\D/g, "") : "0";
    num = Number(raw) || 0;
  }

  return {
    nombre: p.nombre,
    brand: p.brand,
    descripcion: p.descripcion,
    precio: num,
    stock: p.stock ?? 0,                          //  stock desde el form
    imageUrl: p.imagen || "",                     //  se guarda la URL que pone admin
    liberado: p.liberado ?? "LIBERADO",           //  valor elegido en el combo
  };
}



export function ProductProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);

  // Cargar productos desde el backend al montar la app
  useEffect(() => {
    const load = async () => {
      try {
        const apiProducts = await apiFetch("/api/products");
        const mapped = (apiProducts as ProductApi[]).map(mapFromApi);
        setProducts(mapped);
      } catch (err) {
        console.error("Error cargando productos desde API", err);
        setProducts([]); // si falla, al menos no revienta la app
      }
    };

    load();
  }, []);

  // Crear producto (admin)
  const addProduct = async (p: Product) => {
    const body = mapToApi(p);
    const created = (await apiFetch("/api/products", {
      method: "POST",
      body: JSON.stringify(body),
    })) as ProductApi;

    setProducts((prev) => [...prev, mapFromApi(created)]);
  };

  // Eliminar producto (admin)
  const deleteProduct = async (id: number) => {
    await apiFetch(`/api/products/${id}`, {
      method: "DELETE",
    });
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  // Actualizar producto (admin)
  const updateProduct = async (product: Product) => {
    const body = mapToApi(product);
    const updated = (await apiFetch(`/api/products/${product.id}`, {
      method: "PUT",
      body: JSON.stringify(body),
    })) as ProductApi;

    setProducts((prev) =>
      prev.map((p) => (p.id === product.id ? mapFromApi(updated) : p))
    );
  };

  return (
    <ProductContext.Provider
      value={{ products, addProduct, deleteProduct, updateProduct }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const ctx = useContext(ProductContext);
  if (!ctx) throw new Error("useProducts debe usarse dentro de ProductProvider");
  return ctx;
}
