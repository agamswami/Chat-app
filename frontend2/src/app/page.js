import Image from "next/image";
import Chat from "./chat/page";
import Auth from "./Auth/Auth.jsx";

export default function Home() {
  return (
    <div>
      <Auth></Auth>
      {/* <Chat></Chat> */}
    </div>
  );
}
