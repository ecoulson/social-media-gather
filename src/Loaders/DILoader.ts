import { Container } from "inversify";
import container from "../bootstrap";

function DILoader(): Container {
    return container;
}

export default DILoader;
