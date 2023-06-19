import { Spin } from 'antd'

type Props = {
  width?: string
  height?: string
}

export const Loader = ({ width, height }: Props) => {
  return (
    <div style={{ width, height }}>
      <Spin />
    </div>
  )
}
