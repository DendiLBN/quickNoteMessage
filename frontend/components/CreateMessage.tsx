"use client";

import React from "react";
import * as yup from "yup";
import { useCreateMessageMutation } from "@/store/messagesApi";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormData } from "@/types/types";
import toast from "react-hot-toast";

const schema = yup.object().shape({
  content: yup
    .string()
    .trim()
    .required("Message content can't be empty")
    .min(5, "Message must be at least 5 characters long!")
    .max(50, "Message must be less than 50 characters!"),
});

export const CreateMessage = () => {
  const [createMessage] = useCreateMessageMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      await createMessage({ content: data.content }).unwrap();

      toast.success(`Message created successfully!`);
      reset();
    } catch (error) {
      toast.error("Failed to create message. Please try again.");
    }
  };

  return (
    <div className="mb-4">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <label htmlFor="messageInput" className="sr-only">
          Message:
        </label>
        <input
          id="messageInput"
          type="text"
          {...register("content")}
          placeholder="Write a message..."
          className={`border rounded-md p-2 flex-1 ${
            errors.content ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.content && (
          <p className="text-red-600 text-sm">{errors.content.message}</p>
        )}
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};
