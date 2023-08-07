import { User } from "next-auth";
import Image from "next/image";
import UserIcon  from "./icons/User"
type Props = {
  user: User;
  size?: number;
};

export default function Avatar({ user, size }: Props) {
  return (
    <div className="tooltip" data-tip={user.name || user.email}>
      {user.image ?   <Image
        src={user.image }
        alt="avatar"
        width={size || 32}
        height={size || 32}
        className="rounded-full"
      />:< UserIcon></UserIcon>}
    
    </div>
  );
}
