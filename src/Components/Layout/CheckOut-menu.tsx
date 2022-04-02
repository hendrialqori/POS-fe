import { StyleCardCart } from "../Styled/Style-component";
import { ItemType } from "../Context-API/Store-reducer";
import { ImCross } from "react-icons/im";
import { AiTwotoneEdit } from "react-icons/ai";
import { Fragment, useState } from "react";
import { numberwithCommas } from "../Context-API/Actions";
import ItemModal from "./ItemModal";
import axios from 'axios';

type Props = {
  CartItem: ItemType[];
  setCart: React.Dispatch<React.SetStateAction<ItemType[]>>;
};

const CheckOut = ({ CartItem, setCart }: Props) => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [itemEdit, setItemEdit] = useState<ItemType>({} as ItemType);

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
    if(data.length !== 0){
      try {
        await axios.post('http://localhost:3004/queue',{
          id : Date.now(),
          data : data
        })
        setCart([])
      } catch (error) {
        console.log(error);
      }
    }

    return;
  } 

  return (
    <Fragment>
      <div className="p-2 h-14 bg-emerald-900 rounded-md mb-4">
        <h1 onClick={()=> addCartToAPI(CartItem)} className="text-center text-white font-light mt-2">
          Bayar Rp {numberwithCommas(total_price(CartItem))},-
        </h1>
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

              <div className="flex flex-row justify-between  p-5">
                <div className="flex flex-col font-semibold gap-y-1 ">
                  <span className="text-sm">{item.title} </span>
                  <span className="text-xs text-gray-600 font-light">
                    {item.qty} x Rp {numberwithCommas(item.price)},-
                  </span>
                  <span className="text-sm">disc 10%</span>
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
                    className="absolute -bottom-4 right-1 text-lg border-2 rounded-md bg-emerald-900 p-1 text-white"
                  >
                    <ImCross />
                  </span>
                  <span
                    onClick={() => handleOpenModal(item.id, item)}
                    className="absolute -bottom-4 right-9 text-lg border-2 rounded-md bg-emerald-900 p-1 text-white"
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
