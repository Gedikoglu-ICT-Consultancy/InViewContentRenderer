import { ReactElement, createElement } from "react";
import { InViewContentRenderer as DisplayInViewContentRenderer } from "./components/InViewContentRenderer";

import { InViewContentRendererContainerProps } from "../typings/InViewContentRendererProps";

import "./ui/InViewContentRenderer.css";

export function InViewContentRenderer({ content }: InViewContentRendererContainerProps): ReactElement {
    return <DisplayInViewContentRenderer content={content} />;
}
