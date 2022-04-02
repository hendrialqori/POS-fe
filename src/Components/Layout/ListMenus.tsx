import { useState, useEffect } from "react";
import { StyleCardItem } from "../Styled/Style-component";
import CheckOut from "./CheckOut-menu";
import { getDataProduct } from "../Context-API/Actions";
import { ItemType,useStoreContext } from "../Context-API/Store-reducer";
import "./styled.css";
import { numberwithCommas } from "../Context-API/Actions";

function Menus() {

  const { state, dispatch } = useStoreContext();
  const [Cart, setCart] = useState<ItemType[]>([] as ItemType[])
  const [response, setResponse] = useState<{
    isLoading: boolean;
    isError: boolean;
  }>({
    isLoading: false,
    isError: false,
  });


  useEffect(() => {
    setResponse({ isLoading: true, isError: false });
    getDataProduct(dispatch)
      .then((_) => {
        setResponse({ isLoading: false, isError: false });
      })
      .catch((err) => {
        setResponse({ isLoading: false, isError: true });
      });
  }, [dispatch]);

  const handleAddToCart = (item: ItemType) => {
    setCart(prev => {
      const isMatch = prev.find(i => i.id === item.id )
      if(isMatch){
        return prev.map((items) => 
          items.id === item.id ? { 
              ...items,
              qty : items.qty + 1,
              total_price : (items.qty + 1) * items.price
              } : items
        )
      }
      return [...prev, {...item, total_price : item.price}]
    })
  }

  if (response.isLoading)
    return <span className="font-bold text-sm m-1">Loading . . . </span>;
  if (response.isError)
    return (
      <span className="font-bold text-sm m-1">Something went wrong! </span>
    );

  return (
      <div className="flex relative" style={{ height: "470px" }}>
        <div id="wrapper-list-menu" className="overflow-y-auto w-4/6">
          <div id="all-menus" className="flex flex-wrap gap-1 h-max mx-1 my-1">

            {state.Product &&
              state.Product.map((item, i) => (
                <StyleCardItem key={i} onClick={() => handleAddToCart(item)} >
                    <div className="w-full h-20 overflow-hidden flex justify-center items-center">
                    <img
                      className=""
                      src={`assets/images/${item.images}`}
                      alt=""
                    />
                  </div>
                  <div className="flex flex-col justify-center items-center bg-emerald-900 p-1">
                    <span className="text-white font-bold text-sm">
                      {item.title}
                    </span>
                    <span className="text-amber-400 text-sm font-lights">
                      Rp {numberwithCommas(item.price)},-
                    </span>
                  </div>
                </StyleCardItem>
              ))}

          </div>
        </div>
        <div id="checkout" className="w-2/6 overflow-y-auto p-1 ">
          <CheckOut CartItem={Cart} setCart={setCart} />
        </div>
      </div>
  );
}

export default Menus;
