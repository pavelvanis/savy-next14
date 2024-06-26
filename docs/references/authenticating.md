# 🔐 Authenticating

For handling of user session is used [NextAuth.js v5](https://next-auth.js.org). The configuration of NextAuth is in next-_**app/src/lib/auth.config.ts**_  file and the handlers are exported from  _**next-app/src/lib/auth.ts.**_

### Session

Customize type of session where IUser has all informations saved in&#x20;

{% code title="next-app/src/types/nextauth.d.ts" overflow="wrap" lineNumbers="true" %}
```typescript
declare module "next-auth" {
  interface Session {
    user: IUser;
  }

  interface User extends IUser {}
}
```
{% endcode %}

### IUser

Type of user which is used in session

{% code title="next-app/src/types/types.ts" lineNumbers="true" %}
```typescript
export interface IUser {
  permanentUserId: string;
  firstName: string;
  lastName: string;
  email: string;
}

```
{% endcode %}
