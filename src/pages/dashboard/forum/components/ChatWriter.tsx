import { addChat } from "@/firebase/firestore/chat";
import { grayColor, lightColor, primaryColor } from "@/helpers/color";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { IoIosSend } from "react-icons/io";

export default function ChatWriter() {
  const [chatVal, setChatVal] = useState("");
  const [isLoad, setLoad] = useState(false);
  const userData: any = useSession();

  const submitChatHandler = async () => {
    try {
      setLoad(true);
      if (chatVal === "") return;
      const payloadData = {
        text: chatVal,
        created_by: userData?.data?.user?.name?.id,
        user_payload: userData?.data?.user?.name,
      };
      await addChat(payloadData);
      setLoad(false);
      setChatVal("");
      return;
    } catch (error) {
      console.log(error);
      setLoad(false);
    }
  };
  return (
    <section className="w-full h-[65px]  flex px-3  items-center mb-3">
      <section
        className="flex-1 border shadow-sm md:mr-5 mr-3 m-[7.5px] h-[55px] rounded-full flex items-center px-5 text-[14px] font-medium"
        style={{ background: lightColor }}
      >
        <input
          value={chatVal}
          onChange={(e) => setChatVal(e.target.value)}
          style={{ background: lightColor }}
          className=" outline-none flex-1 md:text-[14px] text-[12px]"
          type="text"
          name=""
          id=""
          placeholder="Masukan Pesan disini . . ."
        />
      </section>
      <button
        onClick={() => submitChatHandler()}
        disabled={isLoad}
        className="h-[55px] w-[55px] text-white rounded-full shadow flex items-center justify-center text-[35px]"
        style={{ background: primaryColor }}
      >
        {isLoad ? (
          <img
            className="w-[30px] h-[30px]"
            src="/img/load.gif"
            alt="loadings"
          />
        ) : (
          <IoIosSend />
        )}
      </button>
    </section>
  );
}
