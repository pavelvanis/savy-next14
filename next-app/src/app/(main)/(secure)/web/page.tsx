import React from "react";
import Link from "next/link";
import { getAuthSession } from "@/lib/auth";
import { Button, Typography } from "@/components/ui";
import { addCredentialsLink } from "@/lib/tink/link";
import { generateAuthorizationCode } from "@/lib/tink/actions";
import { getCredentials } from "@/actions/server/credentials";
import { GetCredentailsButton } from "@/actions/server/get";

const WebPage = async () => {
  const { user } = await getAuthSession();

  const auth_code = await generateAuthorizationCode(user.permanentUserId);

  return (
    <div>
      <Typography variant="h3" className="font-bold text-center">
        <span className="font-medium text-xl ">Welcome</span> {user.firstName}{" "}
        {user.lastName}
      </Typography>
      <Typography variant="lead">{user.permanentUserId} </Typography>
      {auth_code && (
        <Link href={addCredentialsLink(auth_code.code, user.permanentUserId)}>
          Add credentials
        </Link>
      )}
      <GetCredentailsButton userId={user.permanentUserId} />
    </div>
  );
};

export default WebPage;
