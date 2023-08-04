<template>
  <div cursor-default text-2xl>
    <div flex flex-col>
      <img border="2 black" mx-auto h-18 w-18 rounded-full shadow-black drop-shadow-xl src="/avatar-adventurer.svg">
      <p py-4 text-center>
        <span aria-hidden="true">H</span>
        <span aria-hidden="true">e</span>
        <span aria-hidden="true">l</span>
        <span aria-hidden="true">l</span>
        <span aria-hidden="true">o</span>
        <span>&nbsp;</span>
        <span aria-hidden="true">a</span>
        <span aria-hidden="true">n</span>
        <span aria-hidden="true">d</span>
        <span>&nbsp;</span>
        <span aria-hidden="true">W</span>
        <span aria-hidden="true">e</span>
        <span aria-hidden="true">l</span>
        <span aria-hidden="true">c</span>
        <span aria-hidden="true">o</span>
        <span aria-hidden="true">m</span>
        <span aria-hidden="true">e</span>
        <span>👏</span>
        <span class="sr-only">Hello and Welcome 👏</span>
        <span>&nbsp;</span>
        <span aria-hidden="true">I'm</span>
        <span>&nbsp;</span>
        <span aria-hidden="true" text-purple5><b>Z</b></span>
        <span aria-hidden="true" text-purple5><b>e</b></span>
        <span aria-hidden="true" text-purple5><b>k</b></span>
        <span aria-hidden="true" text-purple5><b>e</b></span>.
        <span class="sr-only whitespace-nowrap">
          I&apos;m <span className="font-bold">Zeke</span>.
        </span>
      </p>
    </div>
  </div>
</template>

<style>
:root {
  --bump-seed: 2;
}
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

[aria-hidden] {
  display: inline-block;
  transition: scale .2s;
  scale: 1 calc(1 + var(--bump, 0));
}

[aria-hidden]:hover {
  --bump: var(--bump-seed);
}

[aria-hidden]:has(+ [aria-hidden]:hover),
[aria-hidden]:hover + [aria-hidden] {
  --bump: calc(sin(30deg) * var(--bump-seed));
}

[aria-hidden]:has(+ [aria-hidden] + [aria-hidden]:hover),
[aria-hidden]:hover + [aria-hidden] + [aria-hidden] {
  --bump: calc(sin(20deg) * var(--bump-seed));
}

[aria-hidden]:has(+ [aria-hidden] + [aria-hidden] + [aria-hidden]:hover),
[aria-hidden]:hover + [aria-hidden] + [aria-hidden] + [aria-hidden] {
  --bump: calc(sin(10deg) * var(--bump-seed));
}
</style>
