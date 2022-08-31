type Block = {
  '@name': string;
  '@path': string; 
  '@id': string; 
  '@nodes': string[];
  '@nodeType': string;
}

export type DataType = Block & {
  categories: string[];
  description: string;
  'mgnl:tags': string[];
  promotional: boolean;
  title: string;
  blocks: Block;
};

