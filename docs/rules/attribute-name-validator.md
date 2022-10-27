---
pageClass: rule-details
sidebarDepth: 0
title: vue/attribute-name-validator
description: Disable some invalid attribute name of custom component by regex pattern, e.g. `/\\w+/-id`, `/id/`, not letter, or other abuseful names.
---
# vue/attribute-name-validator

> Disable some invalid attribute name of custom component by regex pattern, e.g. `/\\w+/-id`, `/id/`, not letter, or other abuseful names.

- :exclamation: <badge text="This rule has not been released yet." vertical="middle" type="error"> ***This rule has not been released yet.*** </badge>

## :book: Rule Details

This rule use regex pattern to test the attribute name of custom component.

Some useful pattern:

  - allow all letters and numbers: `/^([a-zA-Z_$][a-zA-Z\d_$]*)$/`
  - disable attribute `ref`: `/[^(ref)]/`

<eslint-code-block :rules="{'vue/attribute-name-validator': [/id/]}">

```vue
<template>
  <CustomComponent jd="957"/>
</template>
```

</eslint-code-block>
