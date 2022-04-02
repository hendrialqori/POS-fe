import React, { useState } from "react";
import { ItemType } from "../Context-API/Store-reducer";
import { IoMdAdd } from "react-icons/io";
import { BiMinus } from "react-icons/bi";
import "./styled.css";

type Props = {
  item: ItemType;
  isOpen: boolean;
  setCart: React.Dispatch<React.SetStateAction<ItemType[]>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ItemModal({ item, isOpen, setCart, setOpen }: Props) {
  const [text, setText] = useState<{
    notes: string;
    count: string;
  }>({ notes: "", count: "1" });

  const handleChangeText = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setText((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSave = (item: ItemType) => {
    setCart((prev) => {
      const isMatch = prev.find((i) => i.id === item.id);
      if (isMatch) {
        return prev.map((items) =>
          items.id === item.id
            ? {
                ...items,
                qty: text.count.charAt(0) === "-" || text.count === "0" ? 1 : parseInt(text.count),
                description: text.notes,
                total_price: text.count.charAt(0) === "-" ? items.qty * items.price : parseInt(text.count) * items.price,
              }
            : items
        );
      }
      return [...prev, item];
    });
    setText({ notes: "", count: "1" });
    setOpen(false);
  };

  const handleAddToCart = (item: ItemType) => {
    setCart((prev) => {
      const isMatch = prev.find((i) => i.id === item.id);
      if (isMatch) {
        return prev.map((items) =>
          items.id === item.id
            ? {
                ...items,
                qty: items.qty + 1,
                total_price: (items.qty + 1) * items.price,
              }
            : items
        );
      }
      return [...prev, { ...item, total_price: item.price }];
    });
  };

  const handleRemoveToCart = (item: ItemType) => {
    setCart((prev) => {
      const isMatch = prev.find((i) => i.id === item.id);
      if (isMatch) {
        return prev.map((items) =>
          items.id === item.id
            ? {
                ...items,
                qty: items.qty - 1,
                total_price: (items.qty - 1) * items.price,
              }
            : items
        );
      }

      return prev;
    });
  };

  return (
    <div
      style={{ transform: isOpen ? "translateY(0%)" : "translateY(-300%)" }}
      id="modal-container"
      className="z-50 w-2/4 top-28 left-28  bg-white absolute border-2 rounded-md transition-all duration-700 ease-linear"
    >
      <main key={item.id} className="flex h-full p-2">
        <div id="images" className="w-1/4 ">
          <img
            className="h-2/4 object-cover rounded-md "
            src={`assets/images/${item.images}`}
            alt=""
          />
        </div>
        <div className="ml-2 w-3/4 flex flex-col gap-2">
          <h1 className="text-lg font-light">{item.title}</h1>
          <section>
            <button
              onClick={() => handleRemoveToCart(item)}
              className="p-3 bg-emerald-900 hover:bg-emerald-600 text-white rounded-md"
            >
              <BiMinus />
            </button>
            <button
              onClick={() => handleAddToCart(item)}
              className="p-3 mx-3 bg-emerald-900 hover:bg-emerald-600 text-white rounded-md"
            >
              <IoMdAdd />
            </button>
            <input
              onChange={(e) => handleChangeText(e)}
              value={text.count}
              id="count"
              type="number"
              className=" rounded-md border-2 border-yellow-600 w-12 h-11 text-center"
            />
          </section>
          <section>
            <textarea
              onChange={(e) => handleChangeText(e)}
              className="p-1 text-sm shadow-md bg-gray-100"
              id=" notes"
              cols={30}
              rows={5}
              placeholder="Notes!"
            />
          </section>
          <section className="text-right">
            <button
              onClick={() => setOpen(false)}
              className="p-2 text-sm bg-emerald-100 text-emerald-900 hover:bg-emerald-200 transition duration-500 rounded-md"
            >
              Batal
            </button>
            <button
              onClick={() => handleSave(item)}
              className="p-2 text-sm ml-2 bg-emerald-100 text-emerald-900 hover:bg-emerald-200 transition duration-500 rounded-md"
            >
              Simpan perubahan
            </button>
          </section>
        </div>
      </main>
    </div>
  );
}
