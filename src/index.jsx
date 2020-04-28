import React from "react";
import { render } from "react-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import { App } from "@/App";

import "./index.css";
// запускаем фейковый бэкенд для аутентификации
import { configureFakeBackend } from "@/_helpers";

configureFakeBackend();

render(<App />, document.getElementById("app"));
