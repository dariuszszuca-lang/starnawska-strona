import Image from "next/image";
import type { TeamMember } from "@/lib/team";
import { cn } from "@/lib/utils";

type MemberPhotoProps = {
  member: TeamMember;
  sizes: string;
  priority?: boolean;
  className?: string;
  imageClassName?: string;
};

export function MemberPhoto({
  member,
  sizes,
  priority = false,
  className,
  imageClassName,
}: MemberPhotoProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-gradient-to-br from-brand-lime/25 via-brand-olive/25 to-brand-forest/30 flex items-center justify-center",
        className
      )}
    >
      {member.photo ? (
        <Image
          src={member.photo}
          alt={member.fullName}
          fill
          sizes={sizes}
          priority={priority}
          className={cn("object-cover object-top", imageClassName)}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(163,199,51,0.42),transparent_48%),radial-gradient(circle_at_80%_80%,rgba(45,74,31,0.35),transparent_55%)]" />
          <span className="relative text-4xl lg:text-5xl font-bold tracking-tight text-brand-forest-deep">
            {member.firstName[0]}
            {member.lastName[0]}
          </span>
        </div>
      )}
    </div>
  );
}
