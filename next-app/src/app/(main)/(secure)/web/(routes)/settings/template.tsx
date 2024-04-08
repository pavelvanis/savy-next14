import React from "react";
import { Settings2Icon } from "lucide-react";
import {
  Page,
  PageNavbar,
  PageNavbarProps,
} from "@/components/layout/page-components";
import { cn } from "@/lib/utils";
import CustomLink from "@/components/link";
import { settingsLinks } from "@/config/routes";
import { Card, List, ListDivider, ListItem } from "@/components/ui";
import { SettingsMenu } from "@/components/layout/menu/menu-settings";

interface TemplateSettingsProps extends React.PropsWithChildren {}

const TemplateSettings: React.FC<TemplateSettingsProps> = ({ children }) => {
  const settingsNavbarProps: PageNavbarProps = {
    title: {
      children: "Settings",
      icon: Settings2Icon,
    },
    button: false,
  };
  return (
    <Page>
      <PageNavbar {...settingsNavbarProps}>
        <SettingsMenu className="md:hidden" />
      </PageNavbar>
      <div className="flex flex-1 w-full h-full gap-x-10">
        <SettingsNavbar className="hidden md:block" />
        <section className="mt-3 md:mt-0 flex-1">{children}</section>
      </div>
    </Page>
  );
};

export default TemplateSettings;

const SettingsNavbar = ({ className }: PropsWithClassName) => (
  <div className={cn(className)}>
    <Card className="p-0 w-52">
      <List>
        {settingsLinks.map((list, i) => (
          <>
            {list.map(({ ...props }, j) => (
              <CustomLink
                key={j}
                onActive="bg-blue-gray-50 bg-opacity-40 rounded-lg"
                href={props.href}
              >
                <ListItem key={props.href}>{props.title}</ListItem>
              </CustomLink>
            ))}
            {settingsLinks.length - 1 !== i && <ListDivider key={i} />}
          </>
        ))}
      </List>
    </Card>
  </div>
);
