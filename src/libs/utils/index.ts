export const noop = () => {
  //
}

export const getRootElement = () => {
  return document.getElementById('root')
}

export const getPopupContainer = (triggerNode?: HTMLElement) => {
  return (
    (triggerNode?.closest('.ant-modal-content') as HTMLElement) || (getRootElement() as HTMLElement)
  )
}
