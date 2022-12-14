"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserUseCase = void 0;
const prismaClient_1 = require("../../prisma/prismaClient");
const bcryptjs_1 = require("bcryptjs");
class CreateUserUseCase {
    execute({ name, username, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            const userAlreadyExists = yield prismaClient_1.prismaClient.user.findFirst({
                where: {
                    username
                }
            });
            if (userAlreadyExists)
                throw new Error("User already exists!");
            const passwordHash = yield (0, bcryptjs_1.hash)(password, 8);
            const user = yield prismaClient_1.prismaClient.user.create({
                data: {
                    name,
                    username,
                    password: passwordHash
                }
            });
            return user;
        });
    }
    prueba() {
        return __awaiter(this, void 0, void 0, function* () {
            return ("cago en baca");
        });
    }
    listado() {
        return __awaiter(this, void 0, void 0, function* () {
            const milistado = yield prismaClient_1.prismaClient.user.findMany();
            return milistado;
        });
    }
    profile(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const milistado = yield prismaClient_1.prismaClient.user.findFirst({
                where: {
                    id
                }
            });
            return milistado;
        });
    }
}
exports.CreateUserUseCase = CreateUserUseCase;
