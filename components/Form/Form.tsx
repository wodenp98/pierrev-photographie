import { useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "../ui/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import { getCookies, getCookie, setCookie, deleteCookie } from "cookies-next";

type FormValues = {
  [key: string]: string;
  format: string;
  rendu: string;
  impression: string;
};

const prices: Record<string, Record<string, number>> = {
  format: {
    "30*45 cm": 150,
    "60*40 cm": 200,
    "90*60 cm": 250,
    "100*70 cm": 300,
  },
  rendu: {
    Mat: 10,
    Satiné: 20,
  },
  impression: {
    Subligraphie: -5,
    "Fine Art seul": -10,
    "Alu Dibond": 5,
  },
};

const SelectInput: React.FC<{
  label: string;
  name: string;
  options: string[];
  required: boolean;
  errors: any;
  register: any;
  onChange: (value: string) => void;
}> = ({ label, name, options, errors, required, register, onChange }) => {
  return (
    <div className="flex flex-col mb-2 w-full">
      <label htmlFor={name} className="mb-1 text-sm font-medium text-gray-700">
        {label}
      </label>
      <select
        id={name}
        name={name}
        {...register(name, { required })}
        onChange={(e) => onChange(e.target.value)}
        className="px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 border-gray-300 w-full"
      >
        <option value="" disabled hidden>
          -- Select an option --
        </option>
        {options.map((option: any) => (
          <option key={option} value={option.value}>
            {option}
          </option>
        ))}
      </select>
      {errors[name] && <p className="text-red-500 mb-2">{label} is required</p>}
    </div>
  );
};

export const ShopForm = ({ product }: any) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      format: "",
      rendu: "",
      impression: "",
    },
    mode: "onChange",
  });
  const [formValues, setFormValues] = useState<FormValues>({
    format: "",
    rendu: "",
    impression: "",
  });
  const addToCart = (product: any) => {
    setCookie("cart", JSON.stringify(product));
  };

  const getPrice = (formValues: FormValues) => {
    let price = 150;
    Object.keys(formValues).forEach((key) => {
      const value = formValues[key];
      if (prices[key] && prices[key][value]) {
        price += prices[key][value];
      }
    });
    return price;
  };

  const price = getPrice(formValues);

  const onSubmit = () => {
    const productToCart = {
      id: product.id,
      nom: product.nom,
      price: price,
      imageUrl: product.imageUrl,
      format: formValues.format,
      rendu: formValues.rendu,
      impression: formValues.impression,
    };

    const getCart = getCookie("cart");
    const existantCart = getCart ? JSON.parse(getCart) : [];

    console.log("existantCart", existantCart);
    const updatedCart = [...existantCart, productToCart];

    console.log("updatedCart", updatedCart);

    addToCart(updatedCart);
    toast({
      className: "bg-green-500 text-white",
      title: `${product.nom} a été ajouté à votre panier`,
      action: (
        <Link href="/panier">
          <ToastAction altText="Voir le panier">Voir le panier</ToastAction>
        </Link>
      ),
      duration: 3000,
    });
  };

  return (
    <div className="mt-6">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <SelectInput
          label="Format"
          name="format"
          options={["30*45 cm", "60*40 cm", "90*60 cm", "100*70 cm"]}
          required={true}
          onChange={(value) =>
            setFormValues((prevState) => ({ ...prevState, format: value }))
          }
          errors={errors}
          register={register}
        />
        <SelectInput
          label="Rendu"
          name="rendu"
          options={["Mat", "Satiné"]}
          required={true}
          errors={errors}
          onChange={(value) => {
            setFormValues((prevState) => ({ ...prevState, rendu: value }));
          }}
          register={register}
        />
        <SelectInput
          label="Impression"
          name="impression"
          options={["Subligraphie", "Fine Art seul", "Alu Dibond"]}
          required={true}
          errors={errors}
          onChange={(value) => {
            setFormValues((prevState) => ({ ...prevState, impression: value }));
          }}
          register={register}
        />
        <div className="mt-8 flex justify-center">
          <button
            type="submit"
            className="uppercase bg-lightBlack text-lg text-white  py-2 px-4 "
          >
            Ajouter au panier {price.toFixed(2)}€
          </button>
        </div>
      </form>

      <div className="flex flex-col items-center mt-6">
        <h2>Impression 100% MADE IN FRANCE</h2>

        <Image
          src="/france.png"
          alt="Drapeau de la France"
          width={50}
          height={50}
        />
      </div>
    </div>
  );
};

export default ShopForm;
