# Svelte Icons

# Start

npm i svelte3-icons

yarn add svelte3-icons

基础用法
```javascript
<script lang="ts">
    import { Avatar } from 'svelte3-icons';
</script>

<div>
    <Avatar />
    <!-- SVG图标默认不携带任何属性,你可以在style中自行添加 -->
    <Avatar style="width: 16px; height: 16px;" />
</div>
```
配合IconBox使用
```javascript
<script lang="ts">
    import { IconBox, Avatar } from 'svelte3-icons';
</script>

<div>
    <IconBox color="red" size={20}><Avatar /></IconBox>
</div>
```
加载svg文件
```javascript
<script lang="ts">
    {/* 确保得到的是一个svg字符串，而不是路径 */}
    {/* <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="...."/></svg> */}
    import svelteSvg from './svelte.svg?raw';
    import { SvgIcon } from 'svelte3-icons';
</script>

<div>
    <SvgIcon data={svelteSvg} size={20} />
</div>
```