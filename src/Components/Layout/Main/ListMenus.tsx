import { useState, useEffect, useCallback } from "react";
import { StyleCardItem } from "../../Styled/Style-component";
import CheckOut from "./CheckOut-menu";
import { getDataProduct, getDataQueue } from "../../Context-API/Actions";
import { ItemType,useStoreContext } from "../../Context-API/Store-reducer";
import "./styled.css";
import { numberwithCommas } from "../../Context-API/Actions";
import Dropdown from "./DropdownMenus";
import '../../Styled/loading.css'

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


  // Get all menu
  useEffect(() => {
    setResponse({ isLoading: true, isError: false });
    getDataProduct(dispatch, '')
      .then((_) => {
        setResponse({ isLoading: false, isError: false });
      })
      .catch((err) => {
        setResponse({ isLoading: false, isError: true });
      });
  }, [dispatch]);


  // This method overidding 
  const chooseCategory = useCallback( async (data:string) => {
    setResponse({ isLoading: true, isError: false });

      try {
        await getDataProduct(dispatch, data)
         setResponse({ isLoading: false, isError: false });

      } catch (error) {
        if(error instanceof Error){
          console.log(error.message);   
        }
        setResponse({ isLoading: false, isError: true });
      }
      
  },[dispatch])

  // Update queue API
  useEffect(()=> {

    (async ()=> {
        await getDataQueue(dispatch)
    })();
       
  },[dispatch])



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
  return (
    <div style={{ height: "470px" }} className='loading'></div>
  );

  if (response.isError)
    return (
      <div 
      style={{ height: "470px" }} 
      className='flex justify-center items-center font-light text-xl'
      >
        Something went wrong !
      </div>
    );

  return (
      <div style={{ height: "470px" }} className="flex relative" >
        <div id="wrapper-list-menu" className="overflow-y-auto w-4/6">
          <Dropdown chooseCategory={chooseCategory} />
          <div id="all-menus" className="flex flex-wrap gap-1 h-max mx-1 mt-1">
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
