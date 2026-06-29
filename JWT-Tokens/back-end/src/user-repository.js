import crypto from "crypto";

import DBLocal from "db-local";
import bcrypt from "bcrypt";
const { Schema } = new DBLocal({ path: "./db" });

const User = Schema("User", {
  _id: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
});

export class UserRepository {
  static create({ username, password }) {
    Validation.username(username);
    Validation.password(password);

    const userExists = User.findOne({ username });

    if (userExists) {
      throw new Error("Username already exists");
    }

    const id = crypto.randomUUID();
    const hashedPassword = bcrypt.hashSync(password, 10);

    User.create({
      _id: id,
      username,
      password: hashedPassword,
    }).save();

    return id;
  }

  static login({ username, password }) {
    Validation.username(username);
    Validation.password(password);

    const user = User.findOne({ username });

    if (!user) {
      throw new Error("Username does not exist");
    }

    const isValid = bcrypt.compareSync(password, user.password);

    if (!isValid) {
      throw new Error("Password is invalid");
    }

    return {
      id: user._id,
      username: user.username,
    };
  }
}

class Validation {
  static username(username) {
    if (typeof username !== "string") {
      throw new Error("Username must be a string");
    }

    if (username.length < 3) {
      throw new Error("Username must be at least 3 characters long");
    }
  }

  static password(password) {
    if (typeof password !== "string") {
      throw new Error("Password must be a string");
    }
  }
}
