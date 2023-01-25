<script lang="ts" setup>
import { useDark } from '@vueuse/core';
const isDark = useDark()

defineProps({
    title: {
        required: true,
    },
    description: {
        required: true,
    },
})
</script>

<template>
    <div class="alert">
        <div class="icon">
            <el-icon><CircleCloseFilled /></el-icon>
        </div>
        <div class="content">
            <div class="title">
                {{ title }}
            </div>
            <div class="description">
                {{ description }}
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
div.alert {
    display: flex;
    color: var(--alert-text-color);
    border-radius: var(--round-radius);
    align-items: center;
    padding: 8px 8px 8px 8px;
    min-height: 40px;
    background-color: var(--color-danger);
    column-gap: 4px;
    
    div.icon {
        font-size: 20px;
        line-height: 20px;
        height: 20px;
        margin: 8px;
    }
    
    div.content {
        div.title {
            height: 20px;
            line-height: 20px;
            font-weight: bold;
        }
    }
}
</style>