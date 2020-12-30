/* eslint-disable @typescript-eslint/no-unused-vars */
import { Container } from "inversify";
import AuthenticationController from "./AuthenticationController";
import SearchController from "./SearchController";
import UserController from "./UsersController";

export default function ControllerFactory(container: Container): unknown[] {
    return [AuthenticationController, SearchController, UserController];
}
