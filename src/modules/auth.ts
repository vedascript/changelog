import jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";

type User = {
  username: String;
  id: String;
};

export function createJWTToken(user: User) {
  const { username, id } = user;
  jwt.sign({ id, username }, process.env.JWT_SECRET);
}

function throwNotAuthorised(res) {
  res.status(401);
  res.json({ message: "Not authorized" });
  return;
}

export function protect(req, res, next) {
  const bearer = req.headers.authorisation;

  if (!bearer) {
    throwNotAuthorised(res);
  }

  const [, token] = bearer;

  if (!token) {
    throwNotAuthorised(res);
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    console.error(err);
    throwNotAuthorised(res);
  }
}

export function comparePassword(password, hash) {
  return bcrypt.compare(password, hash);
}

export function hashPassword(password) {
  return bcrypt.hash(password, 5);
}
