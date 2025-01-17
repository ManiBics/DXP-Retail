"use client";
import Pagination from "@/components/common/Pagination";
import Table from "@/components/common/Table";
import { useBackDrop } from "@/context/BackDropContext";
import { useUser } from "@/context/UserContext";
import { getLocale, translatePrice } from "@/utils";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const OrdersPage = (props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [orders, setOrders] = useState([]);
  const { user } = useUser();
  const { showBackDrop, hideBackDrop } = useBackDrop();
  const ordersPerPage = 5;
  const params = useParams();
  const { locale = "en-US" } = getLocale(params.slug);
  const filteredOrders = orders.filter((order) =>
    order.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const fetchApi = async () => {
      showBackDrop();
      const res = await fetch(`/api/getOrders?customerId=${user.id}`);
      const data = await res.json();

      const line_items = data.results.map((item) => {
        const { id, orderState, createdAt, lineItems } = item;
        return {
          id,
          quantity: lineItems.reduce((a, b) => a + b.quantity, 0),
          nofitems: lineItems.length,
          totalPrice: translatePrice(
            lineItems.reduce((a, b) => a + b.price.value.centAmount, 0) / 100,
            locale
          ),
          orderState,
          createdAt: new Date(createdAt).toDateString(),
        };
      });

      setOrders(line_items);
      hideBackDrop();
    };
    if (user.id) fetchApi();
  }, [user.id, locale]);

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const columns = props.columntable;

  return (
    <div data-sb-object-id={props.id} className=" bg-white p-4">
      <div className=" mx-auto py-6 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-4">
          <h1
            data-sb-field-path="title"
            className="text-3xl font-bold text-gray-900"
          >
            {props.title}
          </h1>
          <input
            type="text"
            placeholder="Search orders"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border border-gray-300 rounded-md"
          />
        </div>

        <Table rows={currentOrders} columns={columns} />

        <Pagination
          productsPerPage={ordersPerPage}
          totalProducts={filteredOrders.length}
          setPaginate={handlePageChange}
          currentPage={currentPage}
          PreviousText={props.paginationPrevious || "Previous"}
          NextText={props.paginationNext || "Next"}
        />
      </div>
    </div>
  );
};

export default OrdersPage;
