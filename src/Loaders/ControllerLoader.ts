import "reflect-metadata";
import { Container } from "inversify";
import ControllerFactory from "../Controllers";

export default (container : Container) => {
    ControllerFactory(container);
}