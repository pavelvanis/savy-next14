import React from "react";
import { Settings2Icon } from "lucide-react";
import { Card, List, ListDivider, ListItem, Typography } from "@/components/ui";
import CustomLink from "@/components/link";
import { settingsLinks } from "@/config/routes";

const SettingsTemplate = ({ children }: React.PropsWithChildren) => {
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
      <div className="flex flex-1 w-full h-full gap-x-10">
        <div>
          <Card className="p-0 w-52">
            <List>
              {settingsLinks.map((list) => (
                <>
                  {list.map(({ ...props }) => (
                    <CustomLink
                      onActive="bg-blue-gray-50 bg-opacity-40 rounded-lg"
                      href={props.href}
                    >
                      <ListItem key={props.href}>{props.title}</ListItem>
                    </CustomLink>
                  ))}
                  <ListDivider />
                </>
              ))}
            </List>
          </Card>
        </div>
        <section className=" flex-1">{children}</section>
      </div>
    </div>
  );
};

export default SettingsTemplate;
