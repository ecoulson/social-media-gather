import { Container } from "inversify";
import AuthenticationControllerFactory from "./AuthenticationController";

export default function ControllerFactory(container : Container) {
    AuthenticationControllerFactory(container)
}