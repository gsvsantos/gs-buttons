
# gs-buttons · Angular 20

Componente **standalone** de botão para Angular 20 com dois modos (**Default** e **Link**), duas variantes (**Solid** e **Outline**) e theming via **CSS Custom Properties** ou *inputs*. Foco em acessibilidade, DX simples e compatibilidade com `routerLink` e `href`.

---

## ✨ Recursos
- **Standalone** (Angular 20) — importa direto no `imports:` do componente.
- **Dois modos**: `Default` (renderiza `<button>`) e `Link` (renderiza `<a>`/`routerLink`).
- **Duas variantes**: `Solid` e `Outline`.
- **Theming** por CSS vars **ou** inputs (`color`, `textColor`, etc.).
- **Transições**: longhands por padrão + **shorthand opcional** (`transition`) que sobrepõe os longhands.
- **Acessibilidade**: `aria-disabled`, `tabindex`, `:focus-visible` e prevenção de clique quando desabilitado.
- **Links externos**: aplica `rel="noopener noreferrer"` quando `target="_blank"`.

---

## 📦 Instalação
```bash
npm i gs-buttons bootstrap-icons
```

Inclua **Bootstrap Icons** (uma opção):
```css
/* styles.css / styles.scss */
@import 'bootstrap-icons/font/bootstrap-icons.css';
```

---

## 🚀 Começo rápido
```ts
// app.component.ts
import { Component } from '@angular/core';
import { GsButtons, gsButtonTypeEnum, gsTabTargetEnum, gsVariant } from 'gs-buttons';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [GsButtons],
  templateUrl: './app.component.html'
})
export class AppComponent {
  buttonTypes = gsButtonTypeEnum;
  tabTarget = gsTabTargetEnum;
  variants = gsVariant;

  salvar() { /* sua lógica */ }
}
```

```html
<!-- app.component.html -->
<gs-buttons
  [buttonType]="buttonTypes.Default"
  text="Salvar"
  bootstrapIcon="bi-check2"
  (activated)="salvar()">
</gs-buttons>

<gs-buttons
  [buttonType]="buttonTypes.Link"
  text="Clientes"
  [link]="['/clientes']">
</gs-buttons>

<gs-buttons
  [buttonType]="buttonTypes.Link"
  text="Angular Docs"
  link="https://angular.dev/"
  [target]="tabTarget.NewTab">
</gs-buttons>
```

---

## 🧩 API (resumo)

**Selector:** `<gs-buttons>`

### Inputs
| Propriedade | Tipo | Padrão | Descrição |
| --- | --- | --- | --- |
| `buttonType` | `gsButtonTypeEnum` | — | Modo: `Default` (button) ou `Link` (routerLink/href). |
| `text` | `string` | — | Rótulo do botão/link. |
| `bootstrapIcon` | `string` | — | Classe do Bootstrap Icons (ex.: `bi-plus`). |
| `link` | `string \| string[] \| UrlTree` | — | Quando `buttonType=Link`. `string[]/UrlTree` → **interno** (routerLink). `string` com protocolo (`http`, `https`, `mailto`, `tel`, `//`) → **externo** (href). `string` sem protocolo (ex. `/clientes`) → **interno**. |
| `target` | `gsTabTargetEnum` | `_self` | Abertura da navegação (`SameTab`/`NewTab`). |
| `variant` | `gsVariant` | `Solid` | Aparência: `Solid` ou `Outline`. |
| `buttonId` | `string` | — | Define `id` no elemento raiz. |
| `buttonHtmlType` | `'button' \| 'submit' \| 'reset'` | `'button'` | Tipo do `<button>` quando `buttonType=Default`. |
| `formId` | `string` | — | Id de formulário para *submit* externo (atributo HTML `form`). |
| `emitOnClickWhenSubmit` | `boolean` | `false` | Evita duplicidade de eventos quando `buttonHtmlType='submit'` (use o `ngSubmit` do form). |
| `disabled` | `boolean` | `false` | Desabilita interação (bloqueia clique e teclado). |
| `color` / `textColor` / `hoverColor` / `activeColor` / `focusColor` | `string` | — | Override de cores via inputs. |
| `transitionProperties` | `string \| string[]` | — | Longhand: `transition-property`. |
| `transitionDuration` | `number \| string` | — | Longhand: aceita `200` → `200ms` ou `'0.2s'`. |
| `transitionEase` | `string` | — | Longhand: `transition-timing-function`. |
| `transitionDelay` | `number \| string` | — | Longhand: aceita `150` → `150ms` ou `'0.15s'`. |
| `transition` | `string` | — | **Shorthand opcional**. Se definido, **sobrepõe os longhands**. |

### Outputs
| Evento | Tipo | Descrição |
| --- | --- | --- |
| `activated` | `void` | Emitido ao clicar no **Default** (`<button>`). |

### Enums exportados
```ts
export enum gsButtonTypeEnum { Default = 'button', Link = 'link' }
export enum gsTabTargetEnum  { NewTab = '_blank', SameTab = '_self' }
export enum gsVariant        { Solid = 'solid',  Outline = 'outline' }
```

---

## 🎨 Theming rápido (CSS Custom Properties)
```css
gs-buttons {
  --gs-btn-bg: #2563eb;
  --gs-btn-fg: #ffffff;
  --gs-btn-hover-bg: color-mix(in srgb, #2563eb, black 10%);
  --gs-btn-active-bg: color-mix(in srgb, #2563eb, black 20%);
  --gs-btn-focus: #fff;
  --gs-btn-transition-props: color, background-color, border-color, box-shadow;
  --gs-btn-transition-dur: .15s;
  --gs-btn-transition-ease: ease-in-out;
  --gs-btn-transition-delay: 0s;
  /* shorthand opcional */
  /* --gs-btn-transition: background-color .25s ease, box-shadow .25s ease; */
}
```

Também é possível configurar via **inputs** (`color`, `textColor`, etc.) em tempo de execução.

---

## ♿ Acessibilidade
- `aria-disabled`, `tabindex="-1"` e bloqueio de navegação para `<a>` desabilitado.
- `:focus-visible` com *focus ring* padrão.
- Use `text` como rótulo visível; para ícones sem texto, forneça `aria-label` no host (`<gs-buttons aria-label="...">`).

---

## ✅ Requisitos
- Angular **20**
- Roteamento configurado para `routerLink` (se for usar modo **Link**).
- `bootstrap-icons` disponível globalmente (classe base `bi`).

---

## Exemplos de Uso
Acesse a seção dos exemplos de uso [clicando aqui](EXAMPLES.md).

---

## 📄 Licença
[MIT](LICENSE)
