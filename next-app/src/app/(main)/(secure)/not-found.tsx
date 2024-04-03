import { Typography } from "@/components/ui";
import React from "react";

const WebNotFound = () => {
  return (
    <section>
      <Typography variant="h3" className=" font-bold">
        We are sorry, but this page does not exist.
      </Typography>
      <ul className="ms-5 mt-2 space-y-1 list-disc">
        <li>
          <Typography variant="lead" className="  ">
            Are you sure the page url is correct?
          </Typography>
        </li>
        <li>
          <Typography variant="lead" className="  ">
            Try again from the main page
          </Typography>
        </li>
        <li>
          <Typography variant="lead" className="  ">
            Try going back to the previous page
          </Typography>
        </li>
      </ul>
    </section>
  );
};

export default WebNotFound;
