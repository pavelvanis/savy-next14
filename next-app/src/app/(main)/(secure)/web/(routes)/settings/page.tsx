import React from "react";
import {
  Settings2Icon,
  SlidersHorizontalIcon,
  UserCog2Icon,
  UserCogIcon,
  WrenchIcon,
} from "lucide-react";
import { getAuthSession } from "@/lib/auth";
import { Card, List, ListDivider, ListItem, Typography } from "@/components/ui";

/**
 * This page allows the user to change the settings
 */
const SettingsPage = async () => {
  const { user } = await getAuthSession();
  return (
    <div className="page-container flex flex-col">
      {/* Page header */}
      <div className="page-header">
        <div className="flex items-center gap-x-4">
          <Typography variant="h2" className="font-bold">
            Settings
          </Typography>
          <Settings2Icon className="size-8" />
          {/* <WrenchIcon className="size-8" /> */}
          {/* <UserCogIcon className="size-8" /> */}
          {/* <UserCog2Icon className="size-8" /> */}
        </div>
      </div>
      <div className="flex flex-1 w-full h-full gap-x-4">
        <div className="">
          <Card className="p-0 w-52">
            <List>
              <ListItem>Item 0</ListItem>
              <ListItem>Item 1</ListItem>
              <ListDivider />
              <ListItem>Item 2</ListItem>
              <ListItem>Item 3</ListItem>
              <ListItem>Item 4</ListItem>
            </List>
          </Card>
          <div></div>
        </div>
        <div className="bg-blue-50 flex-1">{/* Page body */}</div>
      </div>
    </div>
  );
};

export default SettingsPage;
