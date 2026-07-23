"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiCheckCircle, FiImage, FiUploadCloud } from "react-icons/fi";
import { RentuFooter, RentuHeader } from "../components/rentu-chrome";
import { createProperty, uploadPropertyImage } from "@/lib/admin";
import { useAuth } from "@/lib/auth-context";
import { ProtectedAgentRoute } from "@/components/protected-route";

const steps = ["Descrição do Imóvel", "Localização", "Contactos"];

const initialForm = {
  title: "",
  type: "HOUSE",
  bedrooms: "1",
  bathrooms: "1",
  description: "",
  price: "",
  city: "",
  district: "",
  address: "",
  imageUrl: "",
  phone: "",
  whatsapp: "",
};

const propertyTypes = [
  { label: "Casa", value: "HOUSE" },
  { label: "Apartamento", value: "APARTMENT" },
  { label: "Escritório", value: "OFFICE" },
  { label: "Loja", value: "STORE" },
  { label: "Outro", value: "OTHER" },
];

function slugify(value: string) {
  const slug = value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  return `${slug || "imovel"}-${Date.now()}`;
}

function getApiErrorMessage(error: unknown, fallback: string) {
  if (
    typeof error === "object" &&
    error !== null &&
    "response" in error &&
    typeof error.response === "object" &&
    error.response !== null &&
    "data" in error.response &&
    typeof error.response.data === "object" &&
    error.response.data !== null &&
    "message" in error.response.data &&
    typeof error.response.data.message === "string"
  ) {
    return error.response.data.message;
  }

  return fallback;
}

export default function AddHomePage() {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [formData, setFormData] = useState(initialForm);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    setError("");
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;

    if (!file) {
      setImageFile(null);
      setImagePreview("");
      return;
    }

    if (!file.type.startsWith("image/")) {
      setError("Escolha um ficheiro de imagem valido.");
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      setError("A imagem deve ter no maximo 8MB.");
      return;
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    setError("");
  };

  const validateStep = (currentStep: number) => {
    if (currentStep === 0) {
      if (!formData.title || !formData.price) {
        return "Preencha o título e o preço do imóvel.";
      }

      const price = Number(formData.price);
      if (Number.isNaN(price) || price < 1000 || price > 120000) {
        return "O preço deve estar entre 1000MZN e 120000MZN.";
      }
    }

    if (currentStep === 1 && (!formData.city || !formData.district || !formData.address)) {
      return "Preencha a cidade, o bairro e o endereço.";
    }

    if (currentStep === 2 && !formData.phone) {
      return "Preencha o número de telefone.";
    }

    return "";
  };

  const goToNextStep = async () => {
    const validationError = validateStep(step);
    if (validationError) {
      setError(validationError);
      return;
    }

    if (step < steps.length - 1) {
      setStep((value) => value + 1);
      return;
    }

    await handleSubmit();
  };

  const handleSubmit = async () => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const property = await createProperty({
        title: formData.title,
        slug: slugify(formData.title),
        description: formData.description || "Sem descrição adicional.",
        type: formData.type,
        purpose: "RENT",
        status: "DRAFT",
        price: Number(formData.price),
        currency: "MZN",
        bedrooms: Number(formData.bedrooms),
        bathrooms: Number(formData.bathrooms),
        address: formData.address,
        city: formData.city,
        district: formData.district,
      });

      if (imageFile) {
        await uploadPropertyImage(property.id, imageFile);
      }

      setDone(true);
      setFormData(initialForm);
      setImageFile(null);
      setImagePreview("");
    } catch (err) {
      setError(
        getApiErrorMessage(
          err,
          "Não foi possível adicionar o imóvel. Verifique os dados e tente novamente.",
        ),
      );
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <main className="min-h-screen bg-white text-black">
        <RentuHeader help />
        <section className="mx-auto grid min-h-[520px] max-w-[1380px] place-items-center px-10 text-center">
          <div>
            <FiCheckCircle className="mx-auto mb-5 text-7xl text-[#f0442b]" />
            <p className="mb-4 text-2xl font-black">Concluído</p>
            <h1 className="text-4xl font-black">Imóvel Adicionado com Sucesso</h1>
            <p className="mt-4 font-semibold text-[#666]">
              O imovel entrou em ProcessingInstruction de aprovacao. Quando o admin aprovar, ele sera publicado e aparecera como aprovado na sua dashboard.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Link
                className="grid h-12 w-52 place-items-center rounded bg-[#f0442b] font-black text-white"
                href="/intermediario"
              >
                Ver dashboard
              </Link>
              <Link
                className="grid h-12 w-44 place-items-center rounded border font-black"
                href="/tipo-casa"
              >
                Ver imoveis
              </Link>
            </div>
          </div>
        </section>
        <RentuFooter />
      </main>
    );
  }

  return (
    <ProtectedAgentRoute>
      <main className="min-h-screen bg-white text-black">
        <RentuHeader help />
        <section className="mx-auto max-w-[1380px] px-10 py-12">
        <h1 className="mb-10 text-3xl font-black">Adicionar Imóvel</h1>
        <div className="grid gap-10 lg:grid-cols-[1fr_280px]">
          <form
            className="rounded border border-[#ddd] bg-white p-8 shadow-sm"
            onSubmit={(event) => event.preventDefault()}
          >
            {!isLoading && !isAuthenticated ? (
              <div className="mb-6 rounded border border-amber-200 bg-amber-50 p-4 font-bold text-amber-800">
                Faça login para poder publicar um imóvel.{" "}
                <Link className="underline" href="/login">
                  Entrar agora
                </Link>
              </div>
            ) : null}
            {error ? (
              <div className="mb-6 rounded border border-red-200 bg-red-50 p-4 font-bold text-red-700">
                {error}
              </div>
            ) : null}
            <div className="mb-10 grid grid-cols-3 gap-4 text-center">
              {steps.map((item, index) => (
                <button
                  className={`border-b-4 pb-3 text-lg font-black ${
                    step === index
                      ? "border-[#f0442b] text-[#f0442b]"
                      : "border-[#ddd]"
                  }`}
                  key={item}
                  onClick={() => setStep(index)}
                  type="button"
                >
                  {item}
                </button>
              ))}
            </div>

            {step === 0 ? (
              <DescriptionStep formData={formData} onChange={handleChange} />
            ) : null}
            {step === 1 ? (
              <LocationStep
                formData={formData}
                imagePreview={imagePreview}
                onChange={handleChange}
                onImageChange={handleImageChange}
              />
            ) : null}
            {step === 2 ? <ContactStep formData={formData} onChange={handleChange} /> : null}

            <div className="mt-10 flex justify-end gap-4">
              {step > 0 ? (
                <button
                  className="h-11 rounded border px-6 font-black"
                  onClick={() => setStep((value) => value - 1)}
                  type="button"
                >
                  Anterior
                </button>
              ) : null}
              <button
                className="h-11 rounded bg-[#f0442b] px-8 font-black text-white disabled:cursor-not-allowed disabled:opacity-60"
                disabled={loading || isLoading}
                onClick={goToNextStep}
                type="button"
              >
                {loading ? "A guardar..." : step === steps.length - 1 ? "Concluir" : "Próximo"}
              </button>
            </div>
          </form>

          <aside className="rounded bg-[#f8f8f8] p-6">
            <h2 className="mb-4 text-xl font-black">Fluxo</h2>
            <ol className="space-y-4">
              {steps.map((item, index) => (
                <li className="flex items-center gap-3 font-bold" key={item}>
                  <span
                    className={`grid size-8 place-items-center rounded-full ${
                      index <= step
                        ? "bg-[#f0442b] text-white"
                        : "bg-white text-[#777]"
                    }`}
                  >
                    {index + 1}
                  </span>
                  {item}
                </li>
              ))}
            </ol>
          </aside>
        </div>
        </section>
        <RentuFooter />
      </main>
    </ProtectedAgentRoute>
  );
}

function DescriptionStep({
  formData,
  onChange,
}: {
  formData: typeof initialForm;
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>;
}) {
  return (
    <div className="grid gap-7 lg:grid-cols-2">
      <Field
        label="*Título (Campo obrigatório)"
        name="title"
        onChange={onChange}
        placeholder="Título"
        value={formData.title}
      />
      <SelectField
        label="*Tipo (Campo obrigatório)"
        name="type"
        onChange={onChange}
        options={propertyTypes}
        value={formData.type}
      />
      <SelectField
        label="*Quartos (Campo obrigatório)"
        name="bedrooms"
        onChange={onChange}
        options={["0", "1", "2", "3", "4"].map((value) => ({ label: value, value }))}
        value={formData.bedrooms}
      />
      <SelectField
        label="*Banheiros (Campo obrigatório)"
        name="bathrooms"
        onChange={onChange}
        options={["0", "1", "2", "3", "4"].map((value) => ({ label: value, value }))}
        value={formData.bathrooms}
      />
      <label className="lg:col-span-2">
        <span className="mb-2 block font-black">Descrição (Opcional)</span>
        <textarea
          className="min-h-32 w-full rounded border px-4 py-3 outline-[#f0442b]"
          name="description"
          onChange={onChange}
          placeholder="Insira alguns detalhes adicionais sobre a casa."
          value={formData.description}
        />
      </label>
      <Field
        label="*Preço (Campo obrigatório)"
        name="price"
        onChange={onChange}
        placeholder="Insira o preço do imóvel, não inferior a 1000MZN e não superior a 120000MZN"
        type="number"
        value={formData.price}
      />
    </div>
  );
}

function LocationStep({
  formData,
  imagePreview,
  onChange,
  onImageChange,
}: {
  formData: typeof initialForm;
  imagePreview: string;
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>;
  onImageChange: React.ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <div className="space-y-7">
      <SelectField
        label="*Cidade(Campo obrigatório)"
        name="city"
        onChange={onChange}
        options={[
          { label: "Seleccionar cidade", value: "" },
          { label: "Maputo", value: "Maputo" },
          { label: "Matola", value: "Matola" },
          { label: "Marracuene", value: "Marracuene" },
        ]}
        value={formData.city}
      />
      <Field
        label="*Bairro(Campo obrigatório)"
        name="district"
        onChange={onChange}
        placeholder="Insira um bairro de acordo com a cidade escolhida acima"
        value={formData.district}
      />
      <Field
        label="*Endereço(Campo obrigatório)"
        name="address"
        onChange={onChange}
        placeholder="Rua, avenida ou ponto de referência"
        value={formData.address}
      />
      <div>
        <p className="mb-2 font-black">Foto do imóvel (upload direto)</p>
        <label className="grid min-h-52 cursor-pointer place-items-center overflow-hidden rounded border-2 border-dashed border-[#bbb] bg-[#fafafa] text-center">
          {imagePreview ? (
            <img
              alt="Pre-visualizacao do imovel"
              className="h-64 w-full object-cover"
              src={imagePreview}
            />
          ) : (
            <div className="px-4">
              <FiUploadCloud className="mx-auto mb-3 text-5xl text-[#f0442b]" />
              <p className="font-black">Clique para carregar uma imagem</p>
              <p className="mt-2 font-bold text-[#666]">JPG, PNG ou WebP ate 8MB</p>
            </div>
          )}
            <input
              accept="image/*"
              className="sr-only"
              name="imageFile"
              onChange={onImageChange}
              type="file"
            />
        </label>
        <p className="mt-3 font-bold text-[#666]">
          A imagem sera enviada diretamente para a Rentu apos concluir o cadastro.
        </p>
      </div>
    </div>
  );
}

function ContactStep({
  formData,
  onChange,
}: {
  formData: typeof initialForm;
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>;
}) {
  return (
    <div className="grid gap-7 lg:grid-cols-2">
      <Field
        label="*Número de Telefone (Campo obrigatório)"
        name="phone"
        onChange={onChange}
        prefix="(+258)"
        placeholder="Insira o seu número de telefone"
        value={formData.phone}
      />
      <Field
        label="Número de Whatsapp (Campo opcional)"
        name="whatsapp"
        onChange={onChange}
        prefix="(+258)"
        placeholder="Insira o seu número do seu whatsapp"
        value={formData.whatsapp}
      />
      <div className="rounded bg-[#f8f8f8] p-5 lg:col-span-2">
        <FiImage className="mb-3 text-3xl text-[#f0442b]" />
        <p className="font-bold text-[#555]">
          Depois de concluir, o imóvel ficará pronto para revisão e publicação.
        </p>
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  onChange,
  placeholder,
  prefix,
  type = "text",
  value,
}: {
  label: string;
  name: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  placeholder: string;
  prefix?: string;
  type?: string;
  value: string;
}) {
  return (
    <label>
      <span className="mb-2 block font-black">{label}</span>
      <div className="flex h-12 overflow-hidden rounded border">
        {prefix ? (
          <span className="grid w-24 place-items-center border-r bg-[#f6f6f6] font-bold">
            {prefix}
          </span>
        ) : null}
        <input
          className="min-w-0 flex-1 px-4 outline-[#f0442b]"
          name={name}
          onChange={onChange}
          placeholder={placeholder}
          type={type}
          value={value}
        />
      </div>
    </label>
  );
}

function SelectField({
  label,
  name,
  onChange,
  options,
  value,
}: {
  label: string;
  name: string;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  options: { label: string; value: string }[];
  value: string;
}) {
  return (
    <label>
      <span className="mb-2 block font-black">{label}</span>
      <select
        className="h-12 w-full rounded border px-4 outline-[#f0442b]"
        name={name}
        onChange={onChange}
        value={value}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
