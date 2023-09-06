import { NotFoundError } from "../../errors/errors.js";
import userModel from "../models/user.model.js";

import { createHash, isValidPassword } from "../../utils/passwordHash.js";

export class UserManager {
  // Crear un nuevo usuario
  userCreate = async (newUserData) => {
    try {
      newUserData.password = createHash(newUserData.password);

      const result = await userModel.create(newUserData);

      if (!result) {
        throw new Error("FAILED TO ADD TO DATABASE");
      }

      return result;
    } catch (error) {
      console.log(error);
    }
  };

  // Loguear usuario
  userLogin = async (email, password) => {
    try {
      const findUser = await userModel.findOne({ email }).lean();

      if (!findUser) throw new NotFoundError("USER NOT FOUND");

      const passwordCompare = isValidPassword(password, findUser.password);

      if (!passwordCompare) throw new NotFoundError("Invalid Password");

      return findUser;
    } catch (error) {
      console.log(error);
    }
  };

  //Obtener todos los usuarios
  getAllUser = async () => {
    try {
      const result = await userModel.find().lean();

      if (!result) {
        throw new NotFoundError("USERS NOT FOUND");
      }

      return result;
    } catch (error) {
      console.log(error);
    }
  };

  //Buscar usuario por mail
  getUserByEmail = async (email) => {
    try {
      const findUser = await userModel.findOne(email);

      return findUser;
    } catch (error) {
      console.log(error);
    }
  };

  //Buscar usuario por id
  getUserById = async (id) => {
    try {
      const findUser = await userModel.findById(id);

      return findUser;
    } catch (error) {
      console.log(error);
    }
  };
}
