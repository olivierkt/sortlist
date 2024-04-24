export declare interface Lists {
  list: Item[];
}

export declare interface Item {
  id: number;
  userId?: number;
  title: string;
  body: string
}

export declare interface History {
  id: number;
  body: string
  list: Lists;
}
