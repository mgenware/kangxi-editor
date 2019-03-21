export class ToolBarItem {
  constructor(public cmd: any, public element: HTMLElement) {}
}

export type ToolBarUIItem = ToolBarItem | HTMLElement;
