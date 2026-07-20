"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { getProperty, Property } from "@/lib/api";
import {
  updateProperty,
  addPropertyImage,
  deletePropertyImage,
  updatePropertyImage,
} from "@/lib/admin";
import { normalizeImageUrl } from "@/lib/properties-ui";
import { ProtectedAdminRoute } from "@/components/protected-route";
import { FiArrowLeft, FiTrash2, FiSave, FiPlus } from "react-icons/fi";

export default function AdminEditPropertyPage() {
  const params = useParams();
  const propertyId = params.id as string;
  const router = useRouter();

  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: 0,
    bedrooms: 0,
    bathrooms: 0,
    city: "",
    district: "",
    address: "",
    status: "DRAFT",
  });

  // Image form state
  const [imageUrl, setImageUrl] = useState("");
  const [imageAltText, setImageAltText] = useState("");
  const [isCover, setIsCover] = useState(false);
  const [addingImage, setAddingImage] = useState(false);

  useEffect(() => {
    fetchProperty();
  }, [propertyId]);

  const fetchProperty = async () => {
    try {
      setLoading(true);
      const data = await getProperty(propertyId);
      setProperty(data);
      setFormData({
        title: data.title,
        description: data.description,
        price: data.price,
        bedrooms: data.bedrooms || 0,
        bathrooms: data.bathrooms || 0,
        city: data.city,
        district: data.district || "",
        address: data.address,
        status: data.status,
      });
      setError("");
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao carregar propriedade");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name.includes("price") || name.includes("bedrooms") || name.includes("bathrooms")
        ? Number(value)
        : value,
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      await updateProperty(propertyId, formData);
      setSuccess("Propriedade atualizada com sucesso!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao salvar propriedade");
    } finally {
      setSaving(false);
    }
  };

  const handleAddImage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUrl) {
      setError("URL da imagem é obrigatória");
      return;
    }

    try {
      setAddingImage(true);
      const newImage = await addPropertyImage(propertyId, {
        url: imageUrl,
        altText: imageAltText,
        isCover,
        sortOrder: (property?.images?.length || 0) + 1,
      });
      setProperty((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          images: isCover
            ? [...prev.images.map((img) => ({ ...img, isCover: false })), newImage]
            : [...prev.images, newImage],
        };
      });
      setImageUrl("");
      setImageAltText("");
      setIsCover(false);
      setSuccess("Imagem adicionada com sucesso!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao adicionar imagem");
    } finally {
      setAddingImage(false);
    }
  };

  const handleDeleteImage = async (imageId: string) => {
    if (confirm("Tem certeza que deseja deletar esta imagem?")) {
      try {
        await deletePropertyImage(propertyId, imageId);
        setProperty((prev) => {
          if (!prev) return null;
          return {
            ...prev,
            images: prev.images.filter((img) => img.id !== imageId),
          };
        });
        setSuccess("Imagem deletada com sucesso!");
        setTimeout(() => setSuccess(""), 3000);
      } catch (err: any) {
        setError(err.response?.data?.message || "Erro ao deletar imagem");
      }
    }
  };

  const handleSetCover = async (imageId: string) => {
    try {
      // Remove cover de todas as imagens
      for (const img of property?.images || []) {
        if (img.isCover) {
          await updatePropertyImage(propertyId, img.id, { isCover: false });
        }
      }
      // Define como cover
      await updatePropertyImage(propertyId, imageId, { isCover: true });
      
      // Atualizar state
      setProperty((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          images: prev.images.map((img) => ({
            ...img,
            isCover: img.id === imageId,
          })),
        };
      });
      setSuccess("Imagem de capa atualizada!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao atualizar imagem de capa");
    }
  };

  if (loading) {
    return (
      <ProtectedAdminRoute>
        <main className="min-h-screen bg-gray-50 flex items-center justify-center">
          <p className="text-lg font-medium">Carregando propriedade...</p>
        </main>
      </ProtectedAdminRoute>
    );
  }

  if (!property) {
    return (
      <ProtectedAdminRoute>
        <main className="min-h-screen bg-gray-50">
          <div className="mx-auto max-w-[1380px] px-10 py-8">
            <Link href="/admin/properties" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4">
              <FiArrowLeft /> Voltar
            </Link>
            <p className="text-lg text-red-600">Propriedade não encontrada</p>
          </div>
        </main>
      </ProtectedAdminRoute>
    );
  }

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
              <h1 className="text-3xl font-black text-black">{property.title}</h1>
            </div>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-black transition-colors disabled:opacity-50"
            >
              <FiSave /> {saving ? "Salvando..." : "Salvar"}
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

          {success && (
            <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded text-green-700">
              {success}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSave} className="bg-white rounded-lg shadow p-8 mb-8">
            <h2 className="text-2xl font-black mb-6">Informações da Propriedade</h2>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="block text-sm font-black text-black mb-2">Título</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#f0442b]"
                />
              </div>

              <div>
                <label className="block text-sm font-black text-black mb-2">Preço</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#f0442b]"
                />
              </div>

              <div>
                <label className="block text-sm font-black text-black mb-2">Cidade</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#f0442b]"
                />
              </div>

              <div>
                <label className="block text-sm font-black text-black mb-2">Bairro</label>
                <input
                  type="text"
                  name="district"
                  value={formData.district}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#f0442b]"
                />
              </div>

              <div>
                <label className="block text-sm font-black text-black mb-2">Quartos</label>
                <input
                  type="number"
                  name="bedrooms"
                  value={formData.bedrooms}
                  onChange={handleInputChange}
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#f0442b]"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-black text-black mb-2">Endereço</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#f0442b]"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-black text-black mb-2">Descrição</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#f0442b]"
                  placeholder="Descrição detalhada da propriedade..."
                />
                <p className="text-xs text-gray-500 mt-1">Use quebras de linha (\n) para parágrafos</p>
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
                  <option value="ARCHIVED">Arquivado</option>
                </select>
              </div>
            </div>
          </form>

          {/* Images Section */}
          <div className="bg-white rounded-lg shadow p-8">
            <h2 className="text-2xl font-black mb-6">Gerenciar Imagens</h2>

            {/* Add Image Form */}
            <form onSubmit={handleAddImage} className="mb-8 p-6 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
              <h3 className="text-lg font-black mb-4">Adicionar Nova Imagem</h3>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-black text-black mb-2">URL da Imagem</label>
                  <input
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="/assets/pasta/foto.jpg ou https://exemplo.com/imagem.jpg"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#f0442b]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-black text-black mb-2">Descrição da Imagem</label>
                  <input
                    type="text"
                    value={imageAltText}
                    onChange={(e) => setImageAltText(e.target.value)}
                    placeholder="Ex: Sala de estar"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#f0442b]"
                  />
                </div>
              </div>

              <div className="mt-4 flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={isCover}
                    onChange={(e) => setIsCover(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300"
                  />
                  <span className="text-sm font-black">Usar como imagem de capa</span>
                </label>

                <button
                  type="submit"
                  disabled={addingImage}
                  className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-black transition-colors disabled:opacity-50 ml-auto"
                >
                  <FiPlus /> {addingImage ? "Adicionando..." : "Adicionar"}
                </button>
              </div>
            </form>

            {/* Images List */}
            <h3 className="text-lg font-black mb-4">Imagens Atuais ({property.images.length})</h3>

            {property.images.length === 0 ? (
              <p className="text-gray-600">Nenhuma imagem adicionada ainda</p>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {property.images.map((image, index) => (
                  <div
                    key={image.id}
                    className={`border-2 rounded-lg overflow-hidden ${
                      image.isCover ? "border-[#f0442b]" : "border-gray-200"
                    }`}
                  >
                    <div className="relative w-full h-40 bg-gray-100">
                      <img
                        src={normalizeImageUrl(image.url)}
                        alt={image.altText || `Imagem ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      {image.isCover && (
                        <div className="absolute top-2 right-2 bg-[#f0442b] text-white px-3 py-1 rounded text-xs font-black">
                          Capa
                        </div>
                      )}
                    </div>

                    <div className="p-4">
                      <p className="text-sm text-gray-600 mb-3">
                        {image.altText || "Sem descrição"}
                      </p>

                      <div className="flex gap-2">
                        {!image.isCover && (
                          <button
                            type="button"
                            onClick={() => handleSetCover(image.id)}
                            className="flex-1 px-2 py-1 bg-amber-500 hover:bg-amber-600 text-white rounded text-xs font-black transition-colors"
                          >
                            Usar como Capa
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() => handleDeleteImage(image.id)}
                          className="flex-1 px-2 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-xs font-black transition-colors flex items-center justify-center gap-1"
                        >
                          <FiTrash2 /> Deletar
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </ProtectedAdminRoute>
  );
}
