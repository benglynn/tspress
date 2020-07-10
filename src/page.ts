interface Page {
  name: string;
  path: string;
  md: string;
  mdMeta: { [key: string]: any };
}

export default Page;
