"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createProperty } from "@/lib/admin";
import { getApiErrorMessage } from "@/lib/api";
import { ProtectedAdminRoute } from "@/components/protected-route";
import { FiArrowLeft, FiSave } from "react-icons/fi";

export default function AdminCreatePropertyPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    type: "HOUSE",
    purpose: "RENT",
    price: 0,
    bedrooms: 0,
    bathrooms: 0,
    suites: 0,
    parkingSpaces: 0,
    area: 0,
    address: "",
    city: "",
    district: "",
    province: "",
    status: "DRAFT",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    let finalValue: string | number = value;

    if (
      [
        "price",
        "bedrooms",
        "bathrooms",
        "suites",
        "parkingSpaces",
        "area",
      ].includes(name)
    ) {
      finalValue = Number(value);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: finalValue,
    }));
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormData((prev) => ({
      ...prev,
      title,
      slug: generateSlug(title),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.slug || !formData.address || !formData.city) {
      setError("Por favor preencha todos os campos obrigatórios");
      return;
    }

    try {
      setSaving(true);
      const newProperty = await createProperty(formData);
      router.push(`/admin/properties/${newProperty.id}`);
    } catch (err: unknown) {
      setError(getApiErrorMessage(err, "Erro ao criar propriedade"));
    } finally {
      setSaving(false);
    }
  };

  return (
    <ProtectedAdminRoute>
      <main className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 shadow-sm">
          <div className="mx-auto max-w-[1380px] px-10 py-6 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Link href="/admin/properties" className="text-gray-600 hover:text-gray-900">
                <FiArrowLeft className="text-2xl" />
              </Link>
              <h1 className="text-3xl font-black text-black">Nova Propriedade</h1>
            </div>
            <button
              onClick={handleSubmit}
              disabled={saving}
              className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-black transition-colors disabled:opacity-50"
            >
              <FiSave /> {saving ? "Criando..." : "Criar"}
            </button>
          </div>
        </header>

        {/* Main Content */}
        <section className="mx-auto max-w-[1380px] px-10 py-8">
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-8">
            {/* Basic Info */}
            <h2 className="text-2xl font-black mb-6">Informações Básicas</h2>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="block text-sm font-black text-black mb-2">
                  Título <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleTitleChange}
                  placeholder="Ex: Casa Espaçosa em Maputo"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#f0442b]"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-black text-black mb-2">
                  Slug <span className="text-gray-500 text-xs">(Gerado automaticamente)</span>
                </label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  readOnly
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100"
                />
              </div>

              <div>
                <label className="block text-sm font-black text-black mb-2">
                  Tipo <span className="text-red-500">*</span>
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#f0442b]"
                >
                  <option value="HOUSE">Casa</option>
                  <option value="APARTMENT">Apartamento</option>
                  <option value="LAND">Terreno</option>
                  <option value="OFFICE">Escritório</option>
                  <option value="STORE">Loja</option>
                  <option value="WAREHOUSE">Armazém</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-black text-black mb-2">
                  Finalidade <span className="text-red-500">*</span>
                </label>
                <select
                  name="purpose"
                  value={formData.purpose}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#f0442b]"
                >
                  <option value="RENT">Aluguel</option>
                  <option value="SALE">Venda</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-black text-black mb-2">
                  Preço <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="2000"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#f0442b]"
                  required
                />
              </div>

              {/* Location */}
              <h2 className="md:col-span-2 text-2xl font-black mt-8 mb-6 pt-8 border-t">
                Localização
              </h2>

              <div className="md:col-span-2">
                <label className="block text-sm font-black text-black mb-2">
                  Endereço <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Ex: Rua Principal, 123"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#f0442b]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-black text-black mb-2">
                  Cidade <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="Ex: Maputo"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#f0442b]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-black text-black mb-2">Bairro</label>
                <input
                  type="text"
                  name="district"
                  value={formData.district}
                  onChange={handleInputChange}
                  placeholder="Ex: Mafalala"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#f0442b]"
                />
              </div>

              <div>
                <label className="block text-sm font-black text-black mb-2">Província</label>
                <input
                  type="text"
                  name="province"
                  value={formData.province}
                  onChange={handleInputChange}
                  placeholder="Ex: Gaza"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#f0442b]"
                />
              </div>

              {/* Details */}
              <h2 className="md:col-span-2 text-2xl font-black mt-8 mb-6 pt-8 border-t">
                Detalhes
              </h2>

              <div>
                <label className="block text-sm font-black text-black mb-2">Quartos</label>
                <input
                  type="number"
                  name="bedrooms"
                  value={formData.bedrooms}
                  onChange={handleInputChange}
                  min="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#f0442b]"
                />
              </div>

              <div>
                <label className="block text-sm font-black text-black mb-2">Banheiros</label>
                <input
                  type="number"
                  name="bathrooms"
                  value={formData.bathrooms}
                  onChange={handleInputChange}
                  min="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#f0442b]"
                />
              </div>

              <div>
                <label className="block text-sm font-black text-black mb-2">Suites</label>
                <input
                  type="number"
                  name="suites"
                  value={formData.suites}
                  onChange={handleInputChange}
                  min="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#f0442b]"
                />
              </div>

              <div>
                <label className="block text-sm font-black text-black mb-2">
                  Lugares de Estacionamento
                </label>
                <input
                  type="number"
                  name="parkingSpaces"
                  value={formData.parkingSpaces}
                  onChange={handleInputChange}
                  min="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#f0442b]"
                />
              </div>

              <div>
                <label className="block text-sm font-black text-black mb-2">Área (m²)</label>
                <input
                  type="number"
                  name="area"
                  value={formData.area}
                  onChange={handleInputChange}
                  min="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#f0442b]"
                />
              </div>

              {/* Description & Status */}
              <h2 className="md:col-span-2 text-2xl font-black mt-8 mb-6 pt-8 border-t">
                Descrição e Status
              </h2>

              <div className="md:col-span-2">
                <label className="block text-sm font-black text-black mb-2">
                  Descrição
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={6}
                  placeholder="Descrição detalhada da propriedade..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#f0442b]"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Dica: Use \n para criar quebras de linha
                </p>
              </div>

              <div>
                <label className="block text-sm font-black text-black mb-2">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#f0442b]"
                >
                  <option value="DRAFT">Rascunho</option>
                  <option value="PUBLISHED">Publicado</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  Propriedades em rascunho não aparecem no site
                </p>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t flex gap-4">
              <Link
                href="/admin/properties"
                className="flex-1 px-6 py-3 border border-gray-300 rounded-lg font-black text-center hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </Link>
              <button
                type="submit"
                disabled={saving}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-black transition-colors disabled:opacity-50"
              >
                {saving ? "Criando..." : "Criar Propriedade"}
              </button>
            </div>
          </form>
        </section>
      </main>
    </ProtectedAdminRoute>
  );
}
