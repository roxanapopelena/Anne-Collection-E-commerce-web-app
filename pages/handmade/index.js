import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import Products_list_card from "../../components/Products/Products_list_card";
import _ from "lodash";

const ProductIndex = () => {
  const [products, setProducts] = useState({});

  products ?? <h2>Loading...</h2>;

  useEffect(() => {
    async function fetchAppointments() {
      const response = await axios.get(`/api/handmade`);

      setProducts(response.data.payload);
    }

    fetchAppointments();
  }, []);

  return (
    <div>
      <Products_list_card products={products} />
    </div>
  );
};
export default ProductIndex;
