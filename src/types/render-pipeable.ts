import Pipeable from "./pipeable";
import Page from "./page";
import RenderContext from "./render-context";

type RenderPipeable = Pipeable<Page, RenderContext>;

export default RenderPipeable;
