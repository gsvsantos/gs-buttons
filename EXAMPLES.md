# Exemplos de Uso

### 1) Botão padrão (solid) emitindo `(activated)`

```html
<gs-buttons
  [buttonType]="buttonTypes.Default"
  text="Salvar"
  bootstrapIcon="bi-check2"
  (activated)="onSalvar()">
</gs-buttons>
```

### 2) Dentro de `<form>` como **submit** (sem evento duplicado)

```html
<form [formGroup]="fg" (ngSubmit)="salvar()">
  <gs-buttons
    [buttonType]="buttonTypes.Default"
    text="Enviar"
    buttonHtmlType="submit"
    [emitOnClickWhenSubmit]="false">
  </gs-buttons>
</form>
```

### 3) **Reset** do formulário

```html
<gs-buttons
  [buttonType]="buttonTypes.Default"
  text="Limpar"
  buttonHtmlType="reset">
</gs-buttons>
```

### 4) **Link interno** (rota Angular) com nova aba

```html
<gs-buttons
  [buttonType]="buttonTypes.Link"
  text="Usuários"
  [link]="['/admin','usuarios']"
  [target]="tabTarget.NewTab"
  bootstrapIcon="bi-people">
</gs-buttons>
```

> você já serializa `hrefValue`, então Ctrl/Cmd-click e `target="_blank"` funcionam.

### 5) **Link externo** (nova aba, seguro)

```html
<gs-buttons
  [buttonType]="buttonTypes.Link"
  text="Angular Docs"
  link="https://angular.dev/"
  [target]="tabTarget.NewTab"
  bootstrapIcon="bi-box-arrow-up-right">
</gs-buttons>
```

### 6) **Desabilitado** (botão e link)

```html
<gs-buttons
  [buttonType]="buttonTypes.Default"
  text="Processando..."
  [disabled]="true">
</gs-buttons>

<gs-buttons
  [buttonType]="buttonTypes.Link"
  text="Indisponível"
  link="https://exemplo.com"
  [disabled]="true">
</gs-buttons>
```

### 7) Variante **Outline**

```html
<gs-buttons
  [buttonType]="buttonTypes.Default"
  [variant]="variantTypes.Outline"
  text="Cancelar"
  bootstrapIcon="bi-x">
</gs-buttons>
```

### 8) **Theming** por inputs de cor

```html
<gs-buttons
  [buttonType]="buttonTypes.Default"
  text="Primário"
  color="#2563eb"
  textColor="#fff"
  hoverColor="#1e40af"
  activeColor="#1d4ed8">
</gs-buttons>
```

### 9) Transições via **longhands** (default)

```html
<gs-buttons
  [buttonType]="buttonTypes.Default"
  text="Suave"
  [transitionProperties]="['background-color','box-shadow']"
  [transitionDuration]="200"
  [transitionEase]="'ease-in-out'">
</gs-buttons>
```

### 10) Sobrescrever com **shorthand**

```html
<gs-buttons
  [buttonType]="buttonTypes.Default"
  text="Shorthand"
  [transition]="'background-color .25s ease, box-shadow .25s ease'">
</gs-buttons>
```

### 11) **Submit externo** (botão fora do `<form>`)

```html
<form id="contatoForm" [formGroup]="fg" (ngSubmit)="enviarContato()"></form>

<gs-buttons
  [buttonType]="buttonTypes.Default"
  text="Enviar Contato"
  buttonHtmlType="submit"
  formId="contatoForm"
  [emitOnClickWhenSubmit]="false">
</gs-buttons>
```

