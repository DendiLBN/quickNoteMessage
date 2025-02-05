"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useEditMessageMutation } from "@/store/messagesApi";
import toast from "react-hot-toast";

type EditButtonProps = {
  messageId: number;
  initialContent: string;
};

export const EditButton = ({ messageId, initialContent }: EditButtonProps) => {
  const [editMessage] = useEditMessageMutation();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [content, setContent] = useState<string>(initialContent);

  const handleSaveMessage = async () => {
    try {
      await editMessage({ id: messageId, content }).unwrap();
      toast.success(`Message updated successfully!`);
      setIsOpen(false);
    } catch (error) {
      toast.error("Failed to update message. Please try again.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-green-700 hover:bg-green-600 text-white">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Message</DialogTitle>
          <DialogDescription>
            Update the content of your message.
          </DialogDescription>
        </DialogHeader>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md mb-4"
          rows={3}
          placeholder="Edit your message"
        />
        <DialogFooter className="flex !justify-between w-full">
          <Button
            onClick={handleSaveMessage}
            className="bg-green-700 hover:bg-green-600 text-white"
          >
            Save Changes
          </Button>
          <Button
            onClick={() => setIsOpen(false)}
            className="bg-gray-700 hover:bg-gray-600 text-white"
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
