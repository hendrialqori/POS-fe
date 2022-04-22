import React, { Fragment, useState, useRef } from "react";
import { StyleCardCart } from "../../Styled/Style-component";
import { ImCross } from "react-icons/im";
import { AiTwotoneEdit } from "react-icons/ai";
import { ItemType ,useStoreContext } from "../../Context-API/Store-reducer";
import { numberwithCommas, endpoint } from "../../Context-API/Actions";
import ItemModal from "./ItemModal";
import axios from "axios";

type Props = {
  CartItem: ItemType[];
  setCart: React.Dispatch<React.SetStateAction<ItemType[]>>;
};

const CheckOut = ({ CartItem, setCart }: Props) => {
  const { state } = useStoreContext();
  const [isOpen, setOpen] = useState<boolean>(false);
  const [itemEdit, setItemEdit] = useState<ItemType>({} as ItemType);
  const [customerName, setName] = useState<string>("");
  const inputRef = useRef<HTMLInputElement | any>(null);
  const [isLoading, setLoading] = useState<boolean>(false)

  const total_price = (items: ItemType[]) => {
    return items.reduce((a, item) => a + item.total_price, 0);
  };

  const handleOpenModal = (id: number, item: ItemType) => {
    if (id === item.id) {
      setItemEdit(item);
      setOpen((prev) => !prev);
    }
    return;
  };

  const addCartToAPI = async (data: ItemType[]) => {
    if (data.length !== 0 && customerName !== "" && state.Queue.length === 0) {
      setLoading(true)
      try {
        await axios({
          method : 'POST',
          url : `${endpoint}/api/queue`,
          headers : {
            'Content-Type' : 'application/json'
          },
          data :  {
            serial_id : Math.floor( Math.random() * ( 100 - 10 + 1 )) + 10 + 4321,
            data      : data,
            total_price : data.reduce((a, b) => a + b.total_price, 0),
            name  : customerName,
          }
        })

        setCart([]);
        setName("");
        setLoading(false)

      } catch (error) {
          if(error instanceof Error){
            console.log(error.message);
            
          }
      }
    }

    inputRef.current.focus();
    return;
  };

  const handleValid = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.setCustomValidity('Masukan nama pelanggan')
}

  return (
    <Fragment>
      <div className="grid gap-2">
        <input
          ref={inputRef}
          type="text"
          className="p-2 h-8 w-full font-light placeholder:text-sm placeholder:text-center bg-[#fdffe3] border-[1px] rounded-md mt-1 focus:outline-none focus:border-emerald-800 focus:ring-1"
          placeholder="customer name"
          value={customerName}
          onChange={(e) => setName(e.target.value)}
          onInvalid={handleValid}
          required
        />
        <button
          onClick={() => addCartToAPI(CartItem)}
          className="p-2 h-12 w-full bg-emerald-900 hover:bg-emerald-800 rounded-md mb-4 text-white"
        >
          {isLoading ? 'Proses . . .' : `Bayar ${numberwithCommas(total_price(CartItem))} ,-`}
        </button>
      </div>
      <div className="flex flex-col gap-1">
        {CartItem.length === 0 ? (
          <span className="text-center font-light text-lg">
            Keranjang Kosong!
          </span>
        ) : (
          CartItem.map((item, i) => (
            <StyleCardCart key={i}>
              <ItemModal
                item={itemEdit}
                setCart={setCart}
                isOpen={isOpen}
                setOpen={setOpen}
              />

              <div className="flex flex-row justify-between p-5">
                <div className="flex flex-col font-semibold gap-y-1 ">
                  <span className="text-sm">{item.title} </span>
                  <span className="text-xs text-gray-600 font-light">
                    {item.qty} x Rp {numberwithCommas(item.price)},-
                  </span>
                </div>
                <div>
                  <span className="font-light">
                    {numberwithCommas(item.total_price)}
                  </span>
                </div>
                <div id="btn-edit" className="relative">
                  <span
                    onClick={() =>
                      setCart((prev) =>
                        prev.filter((i) => i.title !== item.title)
                      )
                    }
                    className="absolute cursor-pointer -bottom-4 right-1 text-lg border-2 rounded-md bg-emerald-900 p-1 text-white"
                  >
                    <ImCross />
                  </span>
                  <span
                    onClick={() => handleOpenModal(item.id, item)}
                    className="absolute cursor-pointer -bottom-4 right-9 text-lg border-2 rounded-md bg-emerald-900 p-1 text-white"
                  >
                    <AiTwotoneEdit />
                  </span>
                </div>
              </div>
            </StyleCardCart>
          ))
        )}
      </div>
    </Fragment>
  );
};

export default CheckOut;
