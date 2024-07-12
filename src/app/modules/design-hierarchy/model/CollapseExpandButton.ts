import * as joint from 'jointjs';

export class CollapseExpandButton extends joint.elementTools.Button {
  public toggleBranchMethod: (root: joint.dia.Element) => void;
  public isCollapsed: boolean = false;

  constructor(toggleBranchMethod: (root: joint.dia.Element) => void, initialState: boolean) {
    super({
      markup: [
        {
          tagName: 'circle',
          selector: 'button',
          attributes: {
            r: 7,
            fill: '#4682b4',
            cursor: 'pointer',
          },
        },
        {
          tagName: 'text',
          selector: 'icon',
          className: 'icon',
          attributes: {
            'text-anchor': 'middle',
            y: '0.3em',
            'font-size': 12,
            cursor: 'pointer',
            'pointer-events': 'none',
          },
          textContent: '-',
        },
      ],
      offset: {
        x: 0,
        y: 0,
      },
      // @ts-ignore
      action: (evt, elementView: joint.dia.ElementView) => {
        this.toggleBranchMethod(elementView.model as unknown as joint.dia.Element);
        this.isCollapsed = !this.isCollapsed;
        this.updateDynamicIconText(elementView);
      }
    });

    this.isCollapsed = initialState;
    this.toggleBranchMethod = toggleBranchMethod;
  }

  public updateIcon(): void {
    const iconElement: Element = this.findIconElement();
    if (iconElement) {
      iconElement.textContent = this.isCollapsed ? '+' : '-';
    }
  }

  public updateButtonState(newState: boolean): void {
    this.isCollapsed = newState;
    this.updateIcon();
  }

  private findIconElement(): Element {
    return this.el.querySelector('text.icon');
  }

  private updateDynamicIconText(elementView: joint.dia.ElementView): void {
    const children: HTMLCollection = elementView.el.parentElement.parentElement.children;

    // Loop through the children to find the 'joint-tools-layer' group
    let parentGroup: Element | null = null;
    // tslint:disable-next-line:prefer-for-of
    for (let i: number = 0; i < children.length; i++) {
      const child: Element = children[i];
      if (child.classList.contains('joint-tools-layer')) {
        parentGroup = child;
        break;
      }
    }
    if (parentGroup) {
      const iconElement: Element = parentGroup.querySelector('.icon');
      if (iconElement) {
        iconElement.textContent = this.isCollapsed ? '+' : '-';
      }
    }
  }
}
