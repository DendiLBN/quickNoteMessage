import { useDeleteMessageMutation } from "@/store/messagesApi";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import toast from "react-hot-toast";

type DeleteButtonProps = {
  id: number;
};

export const DeleteButton = ({ id }: DeleteButtonProps) => {
  const [deleteMessage] = useDeleteMessageMutation();

  const handleDeleteMessage = async () => {
    try {
      await deleteMessage(id).unwrap();
      toast.success(`Message deleted successfully!`);
    } catch (error) {
      toast.error("Failed to delete message. Please try again.");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="bg-red-700 text-white hover:bg-red-600">
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
        <AlertDialogDescription>
          Are you sure you want to delete this message? This action cannot be
          undone.
        </AlertDialogDescription>
        <div className="flex justify-between gap-4 mt-4">
          <AlertDialogAction asChild>
            <Button
              onClick={handleDeleteMessage}
              className="bg-red-700 text-white hover:bg-red-700"
            >
              Confirm
            </Button>
          </AlertDialogAction>
          <AlertDialogCancel asChild>
            <Button className="bg-gray-700 text-white hover:text-white hover:bg-gray-700">
              Cancel
            </Button>
          </AlertDialogCancel>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};
