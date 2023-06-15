import { AccordionShop } from "../Accordion/Accordion";
import Image from "next/image";
import { useState } from "react";
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

const SelectBox: React.FC<{
  label: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
  options: string[];
}> = ({ label, value, placeholder, onChange, options }) => {
  return (
    <div className="flex flex-col mb-2">
      <label className="mb-1 text-sm font-medium text-gray-700">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 border-gray-300"
      >
        <option value="" disabled hidden>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export const ShopForm = () => {
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

  return (
    <div className="p-4">
      <form className="max-w-sm">
        <SelectBox
          label="Format"
          value={formValues.format}
          placeholder="Sélectionner"
          onChange={(value) =>
            setFormValues((prevState) => ({ ...prevState, format: value }))
          }
          options={["30*45 cm", "60*40 cm", "90*60 cm", "100*70 cm"]}
        />
        <SelectBox
          label="Rendu"
          value={formValues.rendu}
          placeholder="Sélectionner"
          onChange={(value) =>
            setFormValues((prevState) => ({ ...prevState, rendu: value }))
          }
          options={["Mat", "Satiné"]}
        />
        <SelectBox
          label="Impression"
          value={formValues.impression}
          placeholder="Sélectionner"
          onChange={(value) =>
            setFormValues((prevState) => ({ ...prevState, impression: value }))
          }
          options={["Subligraphie", "Fine Art seul", "Alu Dibond"]}
        />
        <div className="mt-2 flex justify-center">
          <button className="uppercase bg-lightBlack text-lg text-white  py-2 px-4 ">
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
      <AccordionShop />
    </div>
  );
};

export default ShopForm;
