"use client";

import React, { useEffect, useState } from "react";
import cookie from "js-cookie";
import OrderDetailSummary from "app/components/OrderDetailSummary";
import PaymentProcessBreadcrumb from "app/components/PaymentProcessBreadcrumb";
import { useAppDispatch, useAppSelector } from "lib/hooks";
import { useRouter, useSearchParams } from "next/navigation";
import userService from "lib/utils/userService";
import cartService from "lib/utils/cartService";
import paymentService from "lib/utils/paymentService";
import { Spinner } from "flowbite-react";
import useAuth from "lib/hooks/useAuth";

const CheckoutPage = () => {
  const token = cookie.get("token");
  const [newAddress, setNewAddress] = useState({
    full_name: "",
    contact_number: "",
    address_line1: "",
    address_line2: "",
    town_city: "",
    postcode: "",
    county: "",
  });

  const [isLoading, setIsLoading] = useState(true);
  const [addresses, setAddresses] = useState([]);
  const [hideAddNew, setHideAddNew] = useState(true);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [formError, setFormError] = useState("");
  const [isDisable, setIsDisable] = useState(false);
  const router = useRouter();

  const searchParams = useSearchParams();
  const cartSubtotal = parseFloat(searchParams.get("cartSubtotal"));
  const shipping = parseFloat(searchParams.get("shipping"));

  const isAuthenticated = useAuth();

  useEffect(() => {
    async function fetchUserShippingAddressData() {
      const data = await userService.getMyShippingAddress(token);
      setAddresses(data);
      if (data.length > 0) {
        setSelectedAddressId(data[0].id);
      }
      setIsLoading(false);
    }
    if (isAuthenticated) {
      fetchUserShippingAddressData();
    }
  }, [isAuthenticated, token]);

  useEffect(() => {
    if (!cartSubtotal) {
      router.push("/cart");
    }
  }, [cartSubtotal]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setNewAddress(() => ({
      ...newAddress,
      [name]: value,
    }));
  };

  const handleShowNewAddressForm = () => {
    setHideAddNew(false);
    setSelectedAddressId(null);
  };

  const handleAddressSelection = (id) => {
    setSelectedAddressId(id);
    setHideAddNew(true);
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    let finalAddressId = selectedAddressId;

    if (!selectedAddressId) {
      if (
        newAddress.full_name &&
        newAddress.contact_number &&
        newAddress.address_line1 &&
        newAddress.town_city &&
        newAddress.postcode
      ) {
        const data = {
          full_name: newAddress.full_name,
          contact_number: newAddress.contact_number,
          address_line1: newAddress.address_line1,
          address_line2: newAddress.address_line2,
          town_city: newAddress.town_city,
          postcode: newAddress.postcode,
          county: newAddress.county,
        };
        try {
          const res = await userService.createUserShippingAddress(data, token);
          finalAddressId = res.id;
        } catch (err) {
          console.error("Error creating new address:", err);
          setFormError(err);
          setIsDisable(true);
        }
      } else {
        setFormError("Please fill all required fields.");
        setIsDisable(true);
      }
    }

    if (!finalAddressId) {
      setFormError("Please select a shipping address.");
      setIsDisable(true);
    }

    try {
      const cartData = await cartService.getMyCart(token);
      const data = {
        userId: cartData.user_id,
        cartItems: cartData.CartItems,
        cartSubtotal: cartSubtotal,
        shipping: shipping,
        shipping_address_id: finalAddressId,
      };
      const response = await paymentService.createPaymentSession(data);
      router.push(response.url);
    } catch (err) {
      setFormError(err);
      setIsDisable(true);
    }
  };

  const handleDeleteAddress = async (id) => {
    try {
      const res = await userService.deleteUserShippingAddress(id, token);
      console.log(res.message);
      setAddresses((prevAddresses) => {
        const updatedAddresses = prevAddresses.filter(
          (address) => address.id !== id
        );
        if (selectedAddressId === id && updatedAddresses.length > 0) {
          setSelectedAddressId(updatedAddresses[0].id);
        } else if (updatedAddresses.length === 0) {
          selectedAddressId(null);
        }
        return updatedAddresses;
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        {/* breadcrumb */}
        <PaymentProcessBreadcrumb />

        <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12 xl:gap-16">
          {/* shipping address area */}
          <form className="min-w-0 flex-1 space-y-8">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Delivery Details
              </h2>
              {formError && <p className="text-red-800">{formError}</p>}
              {/* addresses options */}
              {isLoading ? (
                <Spinner />
              ) : (
                addresses.map((address) => (
                  <div
                    key={address.id}
                    className="flex flex-row justify-between rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800"
                  >
                    <div className="flex items-start">
                      <div className="flex h-5 items-center">
                        <input
                          type="radio"
                          name="shipping-address"
                          value={address.id}
                          checked={selectedAddressId === address.id}
                          onChange={() => handleAddressSelection(address.id)}
                          className="h-4 w-4 border-gray-300 bg-white text-blue-600 focus:ring-2 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                        />
                      </div>

                      <div className="ms-4 text-sm">
                        <label
                          htmlFor="shipping-address"
                          className="font-medium leading-none text-gray-900 dark:text-white"
                        >
                          <span>{address.full_name}</span>
                          <span className="ms-4">{address.contact_number}</span>
                        </label>
                        <p className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400">
                          <span>{address.address_line1},</span>
                          {address.address_line2 && (
                            <span>{address.address_line2}, </span>
                          )}
                          <span> {address.town_city},</span>
                          {address.county && <span>{address.county}, </span>}
                          <span> {address.postcode}</span>
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDeleteAddress(address.id)}
                      className="text-sm text-gray-500 px-2 border border-gray-200 rounded hover:text-gray-800 hover:border-gray-400"
                    >
                      delete
                    </button>
                  </div>
                ))
              )}

              {/* add new address button */}
              <div className="sm:col-span-2">
                <button
                  onClick={handleShowNewAddressForm}
                  type="button"
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
                >
                  <svg
                    className="h-5 w-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 12h14m-7 7V5"
                    />
                  </svg>
                  Add new address
                </button>
              </div>

              {/* new address form */}
              <div
                className={`${
                  hideAddNew ? "hidden" : ""
                } rounded-lg border-2 border-gray-400`}
              >
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 p-4">
                  <div>
                    <label
                      htmlFor="full_name"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      {" "}
                      Full name*{" "}
                    </label>
                    <input
                      onChange={handleFormChange}
                      type="text"
                      name="full_name"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact_number"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      {" "}
                      Contact Number*{" "}
                    </label>
                    <input
                      onChange={handleFormChange}
                      type="text"
                      name="contact_number"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <div className="mb-2 flex items-center gap-2">
                      <label
                        htmlFor="address_line1"
                        className="block text-sm font-medium text-gray-900 dark:text-white"
                      >
                        {" "}
                        Address 1*{" "}
                      </label>
                    </div>
                    <input
                      onChange={handleFormChange}
                      type="text"
                      name="address_line1"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <div className="mb-2 flex items-center gap-2">
                      <label
                        htmlFor="address_line2"
                        className="block text-sm font-medium text-gray-900 dark:text-white"
                      >
                        {" "}
                        Address 2{" "}
                      </label>
                    </div>
                    <input
                      onChange={handleFormChange}
                      type="text"
                      name="address_line2"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="town_city"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      {" "}
                      Town/City*{" "}
                    </label>
                    <input
                      onChange={handleFormChange}
                      type="text"
                      name="town_city"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="postcode"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      {" "}
                      Postcode*{" "}
                    </label>
                    <input
                      onChange={handleFormChange}
                      type="text"
                      name="postcode"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="county"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      {" "}
                      County{" "}
                    </label>
                    <input
                      onChange={handleFormChange}
                      type="text"
                      name="county"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="country"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      {" "}
                      Country{" "}
                    </label>
                    <input
                      type="text"
                      name="country"
                      defaultValue="United Kingdom"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400"
                      readOnly
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* submit order button */}
            <button
              onClick={handleSubmitOrder}
              type="submit"
              disabled={isDisable}
              className={`w-full flex flex-row justify-center items-center text-white bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 ${
                isDisable
                  ? "cursor-not-allowed"
                  : "hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              }`}
            >
              <svg
                className="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="white"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 14v3m-3-6V7a3 3 0 1 1 6 0v4m-8 0h10a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1Z"
                />
              </svg>
              <span className="px-2">Submit My Order</span>
            </button>
          </form>

          {/* order summary */}
          <div className="mt-6 w-full space-y-6 sm:mt-8 lg:mt-0 lg:max-w-xs xl:max-w-md">
            <OrderDetailSummary
              token={token}
              cartSubtotal={cartSubtotal}
              shipping={shipping}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckoutPage;
