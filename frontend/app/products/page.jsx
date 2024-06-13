"use client";

import { useRouter } from "next/navigation";
import React from "react";

const page = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/");
  };

  return (
    <div>
      <button onClick={handleClick}>Go to home</button>
    </div>
  );
};

export default page;
