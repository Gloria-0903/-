import { useIntersectionObserver } from '@vueuse/core'

export const lazyPlugin = {
  install (app:any) {
    app.directive('img-lazy', {
      mounted (el:any, binding:any) {
        //console.log(el, binding.value)
        const { stop } = useIntersectionObserver(
          el,
          ([{ isIntersecting }]) => {
            console.log(isIntersecting)
            if (isIntersecting) {
              el.src = binding.value
              stop()
            }
          },
        )
      }
    })
  }
}