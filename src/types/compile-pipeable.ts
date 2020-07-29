import Pipeable from "./pipeable";
import Page from "./page";
import CompileContext from "./compile-context";

type CompilePipeable = Pipeable<ReadonlyArray<Page>, CompileContext>;

export default CompilePipeable;
