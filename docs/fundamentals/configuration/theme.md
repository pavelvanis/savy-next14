# Theme

Configuration of Material Tailwind theme. Which is used as default values for UI components. To initialize the theme created in _**/src/config/theme.ts**_, use the theme provider.

### ThemeProvider

Theme provider is used to initialize the theme created in _**/src/config/theme.ts**_ and is implemeted in Rootlayout where it wraps the entire body.

{% code title="next-app/src/components/providers/theme-provider.tsx" lineNumbers="true" %}
```typescript
"use client";

import React from "react";
import { theme } from "@/config/theme";
import { ThemeProvider as Provider } from "@material-tailwind/react";

const ThemeProvider = ({ children }: { children: any }) => {
  return <Provider value={theme}>{children}</Provider>;
};

export default ThemeProvider;
```
{% endcode %}
