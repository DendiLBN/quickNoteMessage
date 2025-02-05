import { MessageTable } from "@/components/MessageTable";
import { CreateMessage } from "@/components/CreateMessage";

export const Container = () => {
  return (
    <div className="flex flex-col justify-center items-center p-4 sm:p-6 gap-6 sm:gap-8 min-h-screen ">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-6xl">
        <CreateMessage />
      </div>
      <div className="w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-6xl">
        <MessageTable />
      </div>
    </div>
  );
};
