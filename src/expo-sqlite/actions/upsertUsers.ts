import { UserProps } from "@/interfaces";
import { chatDb, users } from "../db";

export const mapApiUserToDbUser = (apiUser: UserProps) => ({
  _id: apiUser.login.uuid,
  name: apiUser.name.first,
  firstName: apiUser.name.first,
  lastName: apiUser.name.last,
  fullName: `${apiUser.name.first} ${apiUser.name.last}`,
  gender: apiUser.gender as "male" | "female",
  location: `${apiUser.location.city}, ${apiUser.location.country}`,
  login: apiUser.login.username,
  email: apiUser.email,
  registered: apiUser.registered.date,
  phone: apiUser.phone,
  cell: apiUser.cell,
  avatar: apiUser.picture.large,
});

export const upsertUser = async (apiUser: UserProps) => {
  const dbUser = mapApiUserToDbUser(apiUser);

  await chatDb
    .insert(users)
    .values(dbUser)
    .onConflictDoUpdate({
      target: users._id,
      set: {
        name: dbUser.name,
        firstName: dbUser.firstName,
        lastName: dbUser.lastName,
        fullName: dbUser.fullName,
        gender: dbUser.gender,
        location: dbUser.location,
        avatar: dbUser.avatar,
        email: dbUser.email,
        phone: dbUser.phone,
        cell: dbUser.cell,
      },
    });

  return dbUser;
};
