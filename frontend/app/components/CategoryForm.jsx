import React, { useState } from "react";
import cookie from "js-cookie";
import jwt from "jwt";
import createCategory from "../utils/categoryService";

const CategoryForm = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = cookie.get("token");
      if (token) {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        return await createCategory(name, token);
      }
    } catch (err) {
      setError(err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {error && <p className="text-red-700">{error}</p>}
        <label htmlFor="name">Category Name:</label>
        <input
          type="text"
          name="name"
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CategoryForm;
