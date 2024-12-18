import React, { useEffect, useState } from "react";
import "./styles.css";

const LoadmoreButton = () => {
  const [loading, setLoading] = useState(false);
  const [products, setproducts] = useState([]);
  const [count, setCount] = useState(0);
  const [errormsg, setErrorMsg] = useState(null);
  const [disabledBtn, setdisableBtn] = useState(false);

  async function fetchProd() {
    try {
      setLoading(true);
      const res = await fetch(
        `https://dummyjson.com/products?limit=10&skip=${
          count === 0 ? 0 : count * 20
        }`
      );
      const result = await res.json();
      console.log(result);

      if (result && result.products && result.products.length) {
        setproducts((prev) => [...prev, ...result.products]);

        setLoading(false);
      }

      if (products.length + result.products.length === 100) {
        setdisableBtn(true);
      }
    } catch (error) {
      setErrorMsg(error.message);

      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProd();
  }, [count]);

  if (loading) {
    return <div>loading data ....</div>;
  }

  if (errormsg !== null) {
    return <div>error occured ! {errormsg}</div>;
  }
  return (
    <div className="loadMoreContainer">
      <div className="products-container">
        {products && products.length
          ? products.map((item) => (
              <div className="products" key={item.id}>
                <img src={item.thumbnail} alt="abcd" />
                <p>{item.title}</p>
              </div>
            ))
          : null}
      </div>
      <div className="button-container">
        <button disabled={disabledBtn} onClick={() => setCount(count + 1)}>
          load more
        </button>
        {disabledBtn ? <p>you have reach 100 products</p> : null}
      </div>
    </div>
  );
};

export default LoadmoreButton;
