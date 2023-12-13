import prisma from "../db.ts";
import {
  comparePassword,
  createJWTToken,
  hashPassword,
} from "../modules/auth.ts";

export async function createUser(req, res) {
  try {
    const { body } = req;
    const user = await prisma.user.create({
      data: {
        username: body.username,
        password: await hashPassword(body.password),
      },
    });

    const token = createJWTToken(user);
    res.json({ token });
  } catch (error) {
    console.error("Failed to create user. ", error);
  }
}

export async function signin(req, res) {
  try {
    const { body } = req;
    const user = await prisma.user.findUnique({
      where: { username: body.username },
    });

    const isAuthenticated = await comparePassword(body.password, user.password);

    if (isAuthenticated) {
      const token = await createJWTToken(user);
      res.json({ token });
      res.status(200);
    } else {
      res.status(401);
      res.send("wrong credentials.");
    }
  } catch (error) {
    console.error("Failed to signin user: ", error);
  }
}
