import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'gs-buttons',
  imports: [NgClass, RouterLink],
  templateUrl: './gs-buttons.component.html',
  styleUrl: './gs-buttons.component.scss',
})
export class GsButtons {
  @Input({ required: true }) public tipo!: gsTiposBotaoEnum;
  @Input({ required: true }) public texto!: string;

  @Input() public iconeBootstrap!: string;
  @Input() public link?: string;
  @Input() public target?: gsTiposGuiaEnum;
  @Input() public variant?: gsVariant;

  @Output() public modalState: EventEmitter<void> = new EventEmitter<void>();

  public tipoGuia = gsTiposGuiaEnum;
  public tipoBotao = gsTiposBotaoEnum;

  public get ehLinkExterno(): boolean {
    const linkNormalizado: string = (this.link ?? '').trim().toLowerCase();
    return (
      linkNormalizado.startsWith('http://') ||
      linkNormalizado.startsWith('https://') ||
      linkNormalizado.startsWith('mailto:') ||
      linkNormalizado.startsWith('tel:')
    );
  }

  public onActivated(): void {
    this.modalState.emit();
  }
}

export enum gsTiposBotaoEnum {
  Default = 'button',
  Link = 'link',
}

export enum gsTiposGuiaEnum {
  NovaGuia = '_blank',
  MesmaGuia = '_self',
}

export enum gsVariant {
  Solid = 'solid',
  Outline = 'outline',
}
