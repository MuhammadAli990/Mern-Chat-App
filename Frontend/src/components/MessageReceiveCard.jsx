import React, { forwardRef } from "react";
import { formatTime } from "../lib/Utils";
import { useChatStore } from "../store/useChatStore";

const MessageReceiveCard = forwardRef((props,ref) =>{
  const { data } = props;
  const {selectedUser} = useChatStore();

  return (
    <div ref={ref} className="flex items-center gap-2">
      <div className="w-12 h-12 overflow-hidden rounded-full flex justify-center items-center">
        <img src={selectedUser?.profilePic} className="w-full h-full object-cover" />
      </div>
      <div className="space-y-1">
        <p className="text-xs">{formatTime(data?.createdAt)}</p>

        <div className="bg-green-900 px-3 py-3 rounded-xl w-fit">
          {data?.image && (
            <div className="w-full h-30 bg-black rounded-xl overflow-hidden flex justify-center items-center">
              <img
                src={data?.image}
                className="w-full h-full object-cover mb-2"
              />
            </div>
          )}
          <p>{data?.text}</p>
        </div>
      </div>
    </div>
  );
})

export default MessageReceiveCard;
