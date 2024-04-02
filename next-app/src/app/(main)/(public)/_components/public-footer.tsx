import React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Typography } from "@/components/ui";
import { GITHUB_REPO } from "@/config/general";

const PublicFooter = ({ className }: PropsWithClassName) => {
  return (
    <footer
      className={cn("flex flex-col justify-between pb-4 px-8 mt-5", className)}
    >
      {/* Bottom footer */}
      <div className="flex justify-between mt-3">
        <Typography className=" text-sm" color="gray">
          Copyright © Pavel Vanis {new Date().getFullYear()}
        </Typography>
        <Typography
          className="flex items-center gap-2 hover:text-black text-sm"
          color="gray"
          as={Link}
          href={GITHUB_REPO}
          target="_blank"
        >
          <Image
            src="/github_logo.svg"
            width={32}
            height={32}
            className="h-5 w-5"
            alt="github-logo"
          />
          Github Repository
        </Typography>
      </div>
    </footer>
  );
};

export default PublicFooter;