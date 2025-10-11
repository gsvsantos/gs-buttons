import { NgClass } from '@angular/common';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  inject,
  Input,
  Output,
} from '@angular/core';
import { Router, RouterLink, UrlTree } from '@angular/router';

@Component({
  selector: 'gs-buttons',
  imports: [NgClass, RouterLink],
  templateUrl: './gs-buttons.component.html',
  styleUrls: ['./gs-buttons.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GsButtons {
  @Input({ required: true }) public buttonType!: gsButtonTypeEnum;
  @Input({ required: true }) public text!: string;
  @Input() public bootstrapIcon!: string;
  @Input() public link?: string | string[] | UrlTree;
  @Input() public target?: gsTabTargetEnum;
  @Input() public variant?: gsVariant;
  @Input() public buttonId?: string;
  @Input() public buttonHtmlType: GsButtonHtmlType = 'button';
  @Input() public formId?: string;
  @Input() public emitOnClickWhenSubmit = false;
  @Input({ transform: booleanAttribute }) public disabled = false;
  @Input() public color?: string;
  @Input() public textColor?: string;
  @Input() public hoverColor?: string;
  @Input() public activeColor?: string;
  @Input() public focusColor?: string;
  @Input() public transition?: string;
  @Input() public transitionProperties?: string | string[];
  @Input() public transitionDuration?: number | string;
  @Input() public transitionEase?: string;
  @Input() public transitionDelay?: number | string;

  @HostBinding('style.--gs-btn-bg') public get _bg(): string | null {
    return this.color ?? null;
  }
  @HostBinding('style.--gs-btn-fg') public get _fg(): string | null {
    return this.textColor ?? null;
  }
  @HostBinding('style.--gs-btn-hover-bg') public get _hover(): string | null {
    return this.hoverColor ?? null;
  }
  @HostBinding('style.--gs-btn-active-bg') public get _active(): string | null {
    return this.activeColor ?? null;
  }
  @HostBinding('style.--gs-btn-focus') public get _focus(): string | null {
    return this.focusColor ?? null;
  }
  @HostBinding('style.--gs-btn-transition') public get _transition(): string | null {
    return this.transition ?? null;
  }
  @HostBinding('style.--gs-btn-transition-props') public get _trProps(): string | null {
    const value = this.transitionProperties;
    return Array.isArray(value) ? value.join(', ') : (value ?? null);
  }
  @HostBinding('style.--gs-btn-transition-dur') public get _trDur(): string | null {
    return this.formatTime(this.transitionDuration);
  }
  @HostBinding('style.--gs-btn-transition-ease') public get _trEase(): string | null {
    return this.transitionEase ?? null;
  }
  @HostBinding('style.--gs-btn-transition-delay') public get _trDelay(): string | null {
    return this.formatTime(this.transitionDelay);
  }

  public tabTarget = gsTabTargetEnum;
  public buttonTypes = gsButtonTypeEnum;
  public variantTypes = gsVariant;

  private readonly activatedEmitter: EventEmitter<void> = new EventEmitter<void>();
  @Output() public activated: EventEmitter<void> = this.activatedEmitter;

  private router = inject(Router);

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

  public get hrefValue(): string | null {
    if (this.disabled || !this.link) return null;

    if (this.isExternalLink) {
      return typeof this.link === 'string' ? this.link : null;
    }

    const tree =
      this.link instanceof UrlTree
        ? this.link
        : Array.isArray(this.link)
          ? this.router.createUrlTree(this.link)
          : this.router.parseUrl(this.link);

    return this.router.serializeUrl(tree);
  }

  public onActivated(event?: MouseEvent): void {
    if (this.disabled) {
      event?.preventDefault();
      event?.stopImmediatePropagation();
      return;
    }
    if (this.buttonHtmlType === 'submit' && !this.emitOnClickWhenSubmit) return;
    this.activated.emit();
  }

  public onLinkClick(event: MouseEvent): void {
    if (this.disabled) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }

  public onLinkAuxClick(event: MouseEvent): void {
    if (this.disabled) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }

  private formatTime(value?: number | string): string | null {
    if (value === undefined || value === null) return null;
    if (typeof value === 'number') return `${value}ms`;
    return value;
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

export type GsButtonHtmlType = 'button' | 'submit' | 'reset';
