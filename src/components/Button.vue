<script lang="ts" setup>
</script>

<template>
    <div class="button-container">
        <slot/>
    </div>
</template>

<style lang="scss" scoped>
    div.button-container {
        $paddingTop: 8px;
        $height: 40px;

        cursor: pointer;
        user-select: none;
        color: var(--color-white-soft);
        font-size: 16px;
        font-weight: 600;
        height: $height;
        line-height: $height - 2*$paddingTop;
        padding: $paddingTop 16px $paddingTop 16px;
        border-radius: 8px;
        background-color: var(--color-interaction);
        transition: background-color 0.15s;

        &:hover {
            background-color: var(--color-interaction-hover);
        }

        &:active {
            background-color: var(--color-interaction-active);
        }
    }
</style>