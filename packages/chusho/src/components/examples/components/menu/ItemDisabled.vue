<template>
  <CMenu v-slot="{ open }">
    <CMenuBtn>
      <span>Disabled item</span>
      <CIcon
        id="caret"
        :scale="0.375"
        class="text-gray-600 ml-3 transition-transform"
        :class="{ 'transform rotate-180': open }"
      />
    </CMenuBtn>
    <CMenuList>
      <CMenuItem>Do laborum</CMenuItem>
      <CMenuItem disabled>Voluptate aute</CMenuItem>
      <CMenuItem>Consectetur et ex commodo </CMenuItem>
      <CMenuSeparator />
      <CMenuItem>Aliquip veniam</CMenuItem>
      <CMenuItem>Laboris do</CMenuItem>
    </CMenuList>
  </CMenu>
</template>
