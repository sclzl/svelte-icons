<script lang="ts">
  import { icons, IconBox, Aim, SvgIcon, Camera } from 'svelte3-icons';
  import svelteSvg from './svelte.svg?raw';

  const components = Object.keys(icons);

  const copyIcon = (name: string) => {
    navigator.clipboard.writeText(`<${name} />`).then(() => {
      alert(`ε€εΆζε: <${name} />`);
    }).catch((err) => {

    });
  }
</script>

<main>
  <div>
    <SvgIcon data={svelteSvg} size={20} />
    <IconBox color="red" size={30}><Aim /></IconBox>
  </div>
  {#each components as cpt}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="icon" on:click={()=> copyIcon(cpt)}>
      <div style="width: 26px;"><svelte:component this={icons[cpt]} /></div>
      <div>{cpt}</div>
    </div>
  {/each}
</main>

<style>
  .icon {
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #939393;
    font-size: 14px;
    width: 120px;
    height: 80px;
    border: 1px solid #cbcbcb;
    transition: background-color .3s, color .3s;
    cursor: pointer;
  }
  .icon:hover {
    background-color: #f2f2f2;
    color: #808080;
  }
</style>