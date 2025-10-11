import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink, UrlTree } from '@angular/router';

@Component({
  selector: 'gs-buttons',
  imports: [NgClass, RouterLink],
  templateUrl: './gs-buttons.component.html',
  styleUrl: './gs-buttons.component.scss',
})
export class GsButtons {
  @Input({ required: true }) public buttonType!: gsButtonTypeEnum;
  @Input({ required: true }) public text!: string;

  @Input() public bootstrapIcon!: string;
  @Input() public link?: string | string[] | UrlTree;
  @Input() public target?: gsTabTargetEnum;
  @Input() public variant?: gsVariant;
  @Input() public buttonId?: string;
  @Input() public disabled: boolean = false;

  private readonly activatedEmitter: EventEmitter<void> = new EventEmitter<void>();

  @Output() public activated: EventEmitter<void> = this.activatedEmitter;

  // Mantido para evitar quebra de contratos existentes =)
  @Output() public modalState: EventEmitter<void> = this.activatedEmitter;

  public tabTarget = gsTabTargetEnum;
  public buttonTypes = gsButtonTypeEnum;
  public variantTypes = gsVariant;

  public get isExternalLink(): boolean {
    if (Array.isArray(this.link)) return false;
    if (typeof this.link !== 'string') return false;
    const normalized = this.link.trim().toLowerCase();
    return (
      normalized.startsWith('http://') ||
      normalized.startsWith('https://') ||
      normalized.startsWith('mailto:') ||
      normalized.startsWith('tel:') ||
      normalized.startsWith('//')
    );
  }

  public get isOutline(): boolean {
    return this.variant === gsVariant.Outline;
  }

  public get relAttr(): string | null {
    return this.target === this.tabTarget.NewTab ? 'noopener noreferrer' : null;
  }

  public get ariaDisabledValue(): 'true' | null {
    return this.disabled ? 'true' : null;
  }

  public get tabIndexValue(): number | null {
    return this.disabled ? -1 : null;
  }

  public onActivated(): void {
    if (this.disabled) {
      return;
    }
    this.activatedEmitter.emit();
  }

  public onLinkClick(event: MouseEvent): void {
    if (this.disabled) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }
}

export enum gsButtonTypeEnum {
  Default = 'button',
  Link = 'link',
}

export enum gsTabTargetEnum {
  NewTab = '_blank',
  SameTab = '_self',
}

export enum gsVariant {
  Solid = 'solid',
  Outline = 'outline',
}
