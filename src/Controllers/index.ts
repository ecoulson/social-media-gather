import { Container } from "inversify";
import AuthenticationControllerFactory from "./AuthenticationController";

export default function ControllerFactory(container: Container): void {
    AuthenticationControllerFactory(container);
}
