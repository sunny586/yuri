---
layoutClass: yuri-nav-layout
outline: [2, 3, 4]
---

<script setup>
import { NAV_DATA } from './data'
</script>

FE 导航

<my-nav-links v-for="{title, items} in NAV_DATA" :title="title" :items="items"/>

<br />

::: tip
本导航借鉴于[maomao](https://github.com/maomao1996) ，并在其基础上开发和改造。如有引用、借鉴的请保留版权声明。
:::
