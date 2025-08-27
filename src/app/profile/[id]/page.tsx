

"use client";

import React from "react";
import { motion } from "framer-motion";

export default function UserProfile({ params }: { params: { id: string } }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1>Profile Id</h1>
      <hr />
      <p className="text-xl font-bold text-center mt-4">Profile Page {params.id}</p>
    </div>
  );
}