import type { UnwrapRef } from 'vue-demi'

type ApiFn<D, P extends any[]> = (...params: P) => Promise<D>

export type SkeletonStatus = 'loading' | 'success'

export interface UseAutoSkeletonViewProps<D, P extends any[]> {
  apiFn: ApiFn<D, P>
  placeholderResult?: D
  queryInMount?: boolean
  initQueryParams?: P
  transformDataFn?: (data: D) => Promise<D>
  updateParamsOnFetch?: boolean
  defaultStatus?: SkeletonStatus
  onSuccess?: (data: any) => void
  isEmpty?: (data: D) => boolean
}

export type AutoSkeletonViewResult<D, P extends any[]> = UnwrapRef<{
  execute: ApiFn<D, P>
  result: D | null
  retry: () => Promise<D>
  loading: boolean
  status: SkeletonStatus | 'error'
  getField: (key: string) => any
  bindProps: {
    result: D | null
    status: SkeletonStatus | 'error'
    errorMsg: string
    placeholderResult?: D
    isEmpty?: (data: D) => boolean
  }
  bindEvents: {
    retry: () => Promise<D>
  }
}>

export function useAutoSkeletonView<D, P extends any[] = any[]>(
  props: UseAutoSkeletonViewProps<D, P>,
): AutoSkeletonViewResult<D, P> {
  const {
    apiFn,
    defaultStatus = 'loading',
    placeholderResult,
    isEmpty,
    initQueryParams = [],
    transformDataFn,
    onSuccess,
    updateParamsOnFetch = true,
    queryInMount = true,
  } = props

  const status = ref<SkeletonStatus | 'error'>(defaultStatus)

  const result = ref<D | null>(null)

  const placeholder = ref<D | undefined>(placeholderResult)

  const errorMsg = ref('')

  const lastFetchParams = ref<any[]>(initQueryParams)
  // TODO: type UnwrapRef<P>
  // const lastFetchParams = ref<P>(initQueryParams as P)

  const executeApiFn: ApiFn<D, P> = (...params: P) => {
    if (updateParamsOnFetch)
      lastFetchParams.value = params

    status.value = 'loading'

    return apiFn(...params)
      .then((res) => {
        let data: any = res
        if (transformDataFn)
          data = transformDataFn(res)

        placeholder.value = data
        result.value = data
        status.value = 'success'
        onSuccess && onSuccess(data)
        return res
      })
      .catch((e) => {
        console.error('--useAutoSkeletonView--', e)
        status.value = 'error'
        errorMsg.value = e.message
        throw e
      })
  }

  function retry() {
    return executeApiFn(...(lastFetchParams.value as P))
  }

  onMounted(() => {
    if (queryInMount && defaultStatus === 'loading')
      executeApiFn(...(initQueryParams as P))
  })

  const loading = computed(() => {
    return status.value === 'loading'
  })

  function getField(key: string) {
    if (status.value !== 'success')
      return ''

    if (result.value)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment, @typescript-eslint/prefer-ts-expect-error
      // @ts-ignore
      return result.value[key]

    return ''
  }

  return reactive({
    execute: executeApiFn,
    result,
    retry,
    loading,
    status,
    getField,
    bindProps: {
      result,
      status,
      errorMsg,
      placeholderResult: placeholder,
      isEmpty,
    },
    bindEvents: {
      retry,
    },
  })
}
