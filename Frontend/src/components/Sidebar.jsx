import { Loader2, UserSearch } from "lucide-react";
import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";

function Sidebar() {
  const { getContacts, contacts, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getContacts();
    console.log(onlineUsers);
  }, []);

  if (contacts.length == 0) {
    return (
      <div className="sm:w-[30%] w-[22%] border-r bdr-r-primary flex justify-center items-center">
        <Loader2 className="animate-spin w-12 h-12" />
      </div>
    );
  }

  return (
    <section className="sm:w-[30%] w-[22%] border-r bdr-r-primary">
      <div className="flex items-center justify-center sm:justify-normal font-bold gap-2 px-3 pt-5 pb-3">
        <UserSearch className="w-8 h-8 text-primary " />
        <h2 className="text-xl hidden sm:block">Contacts</h2>
      </div>
      <hr className="text-primary mt-2" />

      <div>
        {contacts.map((ele, ind) => (
          <div
            key={ind}
            className="border-b bdr-b-primary sm:px-3 py-3 flex gap-2 cursor-pointer hover:bg-green-950 duration-200 sm:justify-normal justify-center"
            onClick={() => setSelectedUser(ele)}
          >
            <div className="relative">
              <img
                src={ele?.profilePic}
                className="size-12 object-cover rounded-full"
              />
              {onlineUsers.includes(ele._id) &&<span className="w-3 h-3 bg-green-500 rounded-full absolute bottom-0 right-[-1px]"></span>}
            </div>
            <div className="hidden sm:block">
              <p className="font-semibold text-lg">{ele?.fullname}</p>
              <p className="text-sm text-slate-400">
                {onlineUsers.includes(ele._id) ? "Online" : ele?.email}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Sidebar;
