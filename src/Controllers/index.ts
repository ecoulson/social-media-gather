/* eslint-disable @typescript-eslint/no-unused-vars */
import { Container } from "inversify";
import AuthenticationController from "./AuthenticationController";

export default function ControllerFactory(container: Container): unknown[] {
    return [AuthenticationController];
}
