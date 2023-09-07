import { useState } from "react";
import { UserAuth } from "@/lib/context/AuthContext";
import {
  useAddToCartMutation,
  useGetCartQuery,
} from "@/lib/redux/services/cartApi";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { AccordionShop } from "../Accordion/Accordion";
import { useRouter } from "next/navigation";
import { toast } from "../ui/use-toast";
import { get } from "http";
import { ToastAction } from "@radix-ui/react-toast";
import NoUserWishlist from "@/components/NoAccessComponents/NoUser";

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
  const { user } = UserAuth();
  const router = useRouter();
  const getCart = useGetCartQuery(user?.uid);
  const [addToCart] = useAddToCartMutation();
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
    if (!user) {
      return toast({
        className: "bg-lightBlack text-white",
        title:
          "Vous devez créer un compte afin de pouvoir ajouter des éléments dans votre panier",
        action: (
          <ToastAction
            altText="Se connecter"
            onClick={() => router.push("/login")}
          >
            Se connecter
          </ToastAction>
        ),
        duration: 3000,
      });
    }

    const productToCart = {
      id: product.id,
      nom: product.nom,
      price: price,
      imageUrl: product.imageUrl,
      format: formValues.format,
      rendu: formValues.rendu,
      impression: formValues.impression,
    };
    addToCart({ userId: user.uid, cart: productToCart });
    getCart.refetch();
    toast({
      className: "bg-green-500 text-white",
      title: `${product.nom} a été ajouté à votre panier`,
      action: (
        <ToastAction
          altText="Voir le panier"
          onClick={() => router.push("/panier")}
        >
          Voir le panier
        </ToastAction>
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
