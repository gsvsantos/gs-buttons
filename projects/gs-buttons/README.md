# gs-buttons — Botão reutilizável para Angular 20

Componente **standalone** de botão com dois modos e duas variantes visuais:

- **Default**: renderiza um `<button>` que emite evento no clique.
- **Link**: link **interno** (`routerLink`) ou **externo** (`href`), nas variantes **Solid** (cheio) ou **Outline** (contorno). Para externos com `_blank`, aplica `rel="noopener noreferrer"` automaticamente.

> **Atenção (v2.0.0):** houve **renomeação de Inputs/Enums e classes CSS** (veja seção _[migração](#migra%C3%A7%C3%A3o-a-partir-da-v1)_).

---

## Tabela de conteúdos

- [Instalação](#instala%C3%A7%C3%A3o)
- [Requisitos](#requisitos)
- [Começo rápido](come%C3%A7o-r%C3%A1pido)
- [Exemplos de uso](exemplos-de-uso)
- [API de referência](api-de-refer%C3%AAncia)
    - [Selector](selector)
    - [Inputs](inputs)
    - [Outputs](outputs)
    - [Enums exportados](enums-exportados)
- [Comportamento](comportamento)
- [Acessibilidade](acessibilidade)
- [Migração a partir da v1](migra%C3%A7%C3%A3o-a-partir-da-v1)
- [Changelog & Contribuição](changelog--contribui%C3%A7%C3%A3o)
- [Licença](licen%C3%A7a)
    

---

## Instalação

```bash
npm i gs-buttons bootstrap-icons
```

Inclua **Bootstrap Icons** no projeto (escolha uma):

- **angular.json** (recomendado)
```json
{
  "projects": {
    "app": {
      "architect": {
        "build": {
          "options": {
            "styles": [
              "node_modules/bootstrap-icons/font/bootstrap-icons.css",
              "src/styles.css"
            ]
          }
        }
      }
    }
  }
}
```

- **styles.css**
```css
@import 'bootstrap-icons/font/bootstrap-icons.css';
```

- **styles.scss**
```scss
@import 'bootstrap-icons/font/bootstrap-icons.css';
```

---

## Requisitos

- Angular **20** (componentes standalone).
- Projeto com **roteamento** configurado (para usar `Link` interno via `routerLink`).
- `bootstrap-icons` disponível globalmente (classe base `bi`).

---

## Começo rápido

```ts
// exemplo.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GsButtons, gsButtonTypeEnum, gsTabTargetEnum, gsVariant } from 'gs-buttons';

@Component({
  selector: 'app-exemplo',
  standalone: true,
  imports: [CommonModule, GsButtons],
  templateUrl: './exemplo.component.html'
})
export class ExemploComponent {
  // Expor os enums para o template:
  public buttonTypes = gsButtonTypeEnum;
  public tabTarget = gsTabTargetEnum;
  public variants = gsVariant;

  public onSaveClicked(): void {
    // sua lógica aqui
  }
}
```

---

## Exemplos de uso

### 1) Botão padrão (emite evento no clique)

```html
<gs-buttons
  [buttonType]="buttonTypes.Default"
  text="Salvar"
  bootstrapIcon="bi-floppy2"
  (activated)="onSaveClicked()">
</gs-buttons>
```

### 2) Link interno (`routerLink`)

```html
<gs-buttons
  [buttonType]="buttonTypes.Link"
  text="Voltar para Clientes"
  bootstrapIcon="bi-arrow-left"
  link="/clientes">
</gs-buttons>
```

### 2b) Link interno com **RouterLink commands** (`string[]`)

```html
<gs-buttons
  [buttonType]="buttonTypes.Link"
  text="Filmes populares"
  bootstrapIcon="bi-stars"
  [link]="['/movie', 'popular']">
</gs-buttons>
```

### 3) Link externo (abre em nova guia com `rel="noopener noreferrer"`)

```html
<gs-buttons
  [buttonType]="buttonTypes.Link"
  text="Documentação Angular"
  bootstrapIcon="bi-box-arrow-up-right"
  link="https://angular.dev/"
  [target]="tabTarget.NewTab">
</gs-buttons>
```

### 4) Variante visual `Outline`

```html
<gs-buttons
  [buttonType]="buttonTypes.Link"
  text="Ver detalhes"
  bootstrapIcon="bi-eye"
  link="/detalhes"
  [variant]="variants.Outline">
</gs-buttons>
```

### 5) Estado desabilitado (para `<button>` e `<a>`)

```html
<gs-buttons
  [buttonType]="buttonTypes.Link"
  text="Ação indisponível"
  bootstrapIcon="bi-slash-circle"
  link="/restrito"
  [disabled]="true">
</gs-buttons>
```

---

## API de referência

### Selector

- `<gs-buttons>`

### Inputs

| Propriedade     | Tipo                            | Obrigatório                       | Descrição                                                                                                                                                                                                                                                                                          |
| --------------- | ------------------------------- | --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `buttonType`    | `gsButtonTypeEnum`              | **Sim**                           | Define o **modo** do componente: `Default` (renderiza `<button>` e emite evento) ou `Link` (renderiza `<a>`/`routerLink`). _(Não é o atributo HTML `type`.)_                                                                                                                                       |
| `text`          | `string`                        | **Sim**                           | Rótulo exibido ao lado do ícone.                                                                                                                                                                                                                                                                   |
| `bootstrapIcon` | `string`                        | Não                               | Classe do Bootstrap Icons (ex.: `'bi-plus'`, `'bi-floppy2'`). A classe base `bi` é aplicada pelo componente. Se omitido, o ícone não é renderizado.                                                                                                                                                |
| `link`          | `string \| string[] \| UrlTree` | **Sim, quando `buttonType=Link`** | **Interno:** quando for `string[]` (RouterLink commands) ou `UrlTree`, usa `routerLink`. **Interno (string):** caminhos sem protocolo (ex.: `'/clientes'`) também viram `routerLink`. **Externo (string):** valores iniciando com `http://`, `https://`, `mailto:`, `tel:` (ou `//`) viram `href`. |
| `target`        | `gsTabTargetEnum`               | Não _(padrão: `_self`)_           | `SameTab` → `_self` (padrão); `NewTab` → `_blank`. Com `_blank` **e** link externo, adiciona `rel="noopener noreferrer"`.                                                                                                                                                                          |
| `variant`       | `gsVariant`                     | Não _(padrão: `Solid`)_           | Aparência: `Solid` (cheio) ou `Outline` (contorno).                                                                                                                                                                                                                                                |
| `buttonId`      | `string`                        | Não                               | Define o atributo `id` do elemento raiz (`<button>` ou `<a>`). Útil para testes e acessibilidade.                                                                                                                                                                                                  |
| `disabled`      | `boolean`                       | Não _(padrão: `false`)_           | Desabilita a interação: `<button>` recebe `disabled`; `<a>` recebe `aria-disabled="true"`, `tabindex="-1"` e bloqueio de navegação no clique.                                                                                                                                                      |

> Observação: arrays (`['/movie', 'popular']`) e `UrlTree` **sempre** são tratados como navegação interna via `routerLink`. Para externo, use **string** com protocolo.

### Outputs

|Evento|Tipo|Quando é emitido|
|---|---|---|
|`activated`|`EventEmitter<void>`|**Apenas** quando `buttonType = Default` (clique no `<button>`).|
|`modalState`|`EventEmitter<void>`|_Alias legado_ do `activated` (mantido para compatibilidade).|

### Enums exportados

```ts
export enum gsButtonTypeEnum { Default = 'button', Link = 'link' }
export enum gsTabTargetEnum { NewTab = '_blank', SameTab = '_self' }
export enum gsVariant { Solid = 'solid', Outline = 'outline' }
```

---

## Comportamento

- `Link` **externo** ocorre **apenas** quando `link` é **string** com protocolo: `http://`, `https://`, `mailto:`, `tel:` (ou `//`). Renderiza como `href` e, com `_blank`, aplica `rel="noopener noreferrer"`.
- `Link` **interno** ocorre quando `link` é:
    - `any[]` (RouterLink commands), ou
    - `UrlTree`, ou
    - **string sem protocolo** (ex.: `'/clientes'`).  
        Nesses casos, o componente usa `routerLink`.
- Com `target="_blank"` **e** link externo, o atributo `rel="noopener noreferrer"` é aplicado automaticamente.
- Com `disabled = true`:
    - `<button>`: recebe `disabled` e **não** emite evento.
    - `<a>`: recebe `aria-disabled="true"`, `tabindex="-1"` e tem a navegação **bloqueada** via `click.preventDefault()`.

---

## Acessibilidade

- `text` funciona como rótulo visível do botão/link.
- Navegação por teclado: `<button>` suporte nativo a `Enter`/`Space` e `<a>` suporte nativo a `Enter`.
- Focus ring visível em `:focus-visible`; elementos desabilitados não exibem outline.

---

## Migração a partir da v1

A **v2.0.0** renomeou propriedades/Enums e classes CSS:

- **Inputs**: `tipo → buttonType`, `texto → text`, `iconeBootstrap → bootstrapIcon`, `idBotao → buttonId`, `desabilitado → disabled`.
- **Enums**: `gsTiposBotaoEnum → gsButtonTypeEnum`, `gsTiposGuiaEnum → gsTabTargetEnum` (valores equivalentes), `gsVariant` permanece igual.
- **CSS**: `.botao`/`.botao-outline` → `.button`/`.button-outline`.
- **Output**: use `(activated)`; `(modalState)` permanece como **alias** para compatibilidade.

> Se precisar permanecer em 1.x, mantenha a versão anterior. Na 2.x, ajuste chamadas e imports conforme acima.

---

## Changelog & Contribuição

- Acompanhe **Releases** no GitHub para notas de versão e mudanças.
- Issues e PRs são bem-vindos.

---

## Licença

Distribuído sob **MIT**. Veja o arquivo **LICENSE** no repositório.