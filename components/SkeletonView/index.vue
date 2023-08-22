<script setup name="SkeletonView" lang="ts">
type ViewStatus =
  | 'loading'
  | 'error'
  | 'success'
  | 'empty'

interface SkeletonProps<T = any> {
  status: ViewStatus
  result: T
  placeholderResult: T
  emptyMsg?: string
  errorMsg?: string
  isEmpty?: (result: T) => boolean
}

const props = withDefaults(defineProps<SkeletonProps>(), {
  status: 'loading',
  emptyMsg: 'empty data',
  errorMsg: 'unknown error',
})

const emits = defineEmits(['retry'])

function retryClick() {
  emits('retry')
}

const viewStatus = computed<ViewStatus | undefined>(() => {
  const status = props.status
  if (status === 'success') {
    let _isEmpty = false
    const result = props.result
    if (props.isEmpty) {
      _isEmpty = props.isEmpty(props.result)
    }
    else {
      if (Array.isArray(result))
        _isEmpty = result.length === 0

      else if (!result)
        _isEmpty = true

      else
        _isEmpty = false
    }

    if (_isEmpty)
      return 'empty'

    return 'success'
  }
  return status
})

const placeholderData = computed(() => {
  if (props.result)
    return props.result

  return props.placeholderResult
})
</script>

<template>
  <div v-if="viewStatus === 'empty'" key="empty" class="empty-view flex-col">
    <span>{{ emptyMsg }}</span>
    <button btn mt4 max-w-160px @click="retryClick">
      Retry
    </button>
  </div>
  <div v-else-if="viewStatus === 'error'" key="error" class="empty-view flex-col">
    <span>{{ errorMsg }}</span>
    <button btn mt4 max-w-160px @click="retryClick">
      Retry
    </button>
  </div>
  <div
    v-else
    key="loadingOrContent"
    :class="[
      placeholderData && viewStatus === 'loading'
        ? 'skeleton-view-empty-view'
        : 'skeleton-view-default-view',
    ]"
  >
    <div
      v-if="!placeholderData && viewStatus === 'loading'"
      class="loading-center"
    >
      <i carbon:fade text-40px text-blue />
    </div>
    <slot
      v-else
      :result="placeholderData"
      :status="viewStatus"
      :success="viewStatus === 'success'"
      :mask="viewStatus === 'loading' ? 'skeleton-mask' : ''"
    />
  </div>
</template>

<style>
.empty-view {
  padding-top: 50px;
  padding-bottom: 50px;
  align-items: center;
}
.empty-img {
  width: 310px;
  height: 218px;
}
.trip-text {
  font-size: 20px;
  color: #999;
}
.loading-center {
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.skeleton-view-default-view span,
.skeleton-view-default-view a,
.skeleton-view-default-view img,
.skeleton-view-default-view td,
.skeleton-view-default-view button {
  transition-duration: 0.7s;
  transition-timing-function: ease;
  transition-property: background, width;
}
.skeleton-view-empty-view {
  position: relative;
  pointer-events: none;
}

.skeleton-view-empty-view::before {
  content: " ";
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: linear-gradient(
    110deg,
    rgba(255, 255, 255, 0.1) 40%,
    rgba(180, 199, 255, 0.3) 50%,
    rgba(255, 255, 255, 0.1) 60%
  );
  background-size: 200% 100%;
  background-position-x: 180%;
  animation: loading 1s ease-in-out infinite;
  z-index: 1;
}
@keyframes loading {
  to {
    background-position-x: -20%;
  }
}
.skeleton-view-empty-view .skeleton-mask {
  position: relative;
}
.skeleton-view-empty-view .skeleton-mask::before {
  content: " ";
  background-color: #f5f5f5;
  position: absolute;
  width: 100%;
  height: 100%;
  border: 1px solid #f5f5f5;
  top: -1px;
  left: -1px;
  z-index: 1;
}

.skeleton-view-empty-view button,
.skeleton-view-empty-view span,
.skeleton-view-empty-view input,
.skeleton-view-empty-view td,
.skeleton-view-empty-view a {
  color: rgba(0, 0, 0, 0) !important;
  border: none;
  background: #f5f5f5 !important;
}
/* [src=""],img:not([src])*/
.skeleton-view-empty-view img {
  content: url(./no_url.png);
  border-radius: 2px;
  background: #f5f5f5 !important;
}
</style>
