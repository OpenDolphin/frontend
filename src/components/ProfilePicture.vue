<script setup lang="ts">
defineProps({
    fit: {
        type: String,
        default: 'contain',
    },

    size: {
        type: Number,
        default: 100,
    },

    shape: {
        type: String,
        required: true,
        validator(value: string){
            return ['square', 'circle'].includes(value);
        }
    },

    src: {
        type: String,
        required: true,
    }
})

</script>

<template>
    <div class="profile-picture">
        <img 
            class="avatar" 
            :src="src"
            :class="['objectfit-' + fit, 'shape-' + shape]"
            :style="{
                width: size + 'px', 
                height: size + 'px',
                borderRadius: shape == 'circle' ? size + 'px' : '5px'   
            }"    
        />
    </div>
</template>

<style scoped lang="scss">
div.profile-picture {
    display: flex;
}
img.avatar {
    &.objectfit-contain {
        object-fit: contain;
    }
    &.objectfit-fill {
        object-fit: fill;
    }

    &.objectfit-cover {
        object-fit: cover;
    }

    &.shape-circle {
        border-radius: 100px 100px 100px 100px;
    }
}
</style>